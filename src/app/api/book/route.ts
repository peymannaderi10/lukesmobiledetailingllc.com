import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { square, SERVICE_MAP } from '@/lib/square';
import {
  calculateQuote,
  SERVICES,
  VEHICLES,
  CONDITIONS,
  ADDONS,
} from '@/lib/pricing';
import type { ServiceKey, VehicleKey, ConditionKey, AddonKey } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return NextResponse.json({ error: 'Square API is not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone,
      serviceKey, vehicleKey, conditionKey, addonKeys,
      carInfo, carColor, startAt, serviceVariationVersion,
      teamMemberId, serviceAddress, serviceNotes,
    } = body;

    if (!serviceKey || !vehicleKey || !conditionKey || !startAt || !serviceVariationVersion || !teamMemberId) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    const quote = calculateQuote({
      serviceKey:   serviceKey as ServiceKey,
      vehicleKey:   vehicleKey as VehicleKey,
      conditionKey: conditionKey as ConditionKey,
      addonKeys:    (addonKeys ?? []) as AddonKey[],
    });

    // Find or create customer
    const searchResponse = await square.customers.search({
      query: {
        filter: {
          emailAddress: { exact: email },
        },
      },
    });

    let customerId: string;

    if (searchResponse.customers && searchResponse.customers.length > 0) {
      customerId = searchResponse.customers[0].id!;
    } else {
      const createResponse = await square.customers.create({
        idempotencyKey: `customer-${email}`,
        givenName:    firstName,
        familyName:   lastName,
        emailAddress: email,
        phoneNumber:  phone,
      });
      customerId = createResponse.customer!.id!;
    }

    // Build the structured note the detailer sees on-site
    const service   = SERVICES[serviceKey as ServiceKey];
    const vehicle   = VEHICLES[vehicleKey as VehicleKey];
    const condition = CONDITIONS[conditionKey as ConditionKey];
    const selectedAddons = ((addonKeys ?? []) as AddonKey[]).map(k => ADDONS[k]);

    const note = [
      `SERVICE: ${service.name}`,
      `VEHICLE: ${carInfo} (${carColor})`,
      `SIZE: ${vehicle.name}`,
      `CONDITION: ${condition.name}`,
      `ADD-ONS: ${selectedAddons.length ? selectedAddons.map(a => a.label).join(', ') : 'None'}`,
      `QUOTED PRICE: $${quote.totalPrice}`,
      `EST. DURATION: ${quote.durationHours} hrs`,
      `SERVICE ADDRESS: ${serviceAddress || 'Not provided'}`,
      ...(serviceNotes?.trim() ? [`SPECIAL INSTRUCTIONS: ${serviceNotes.trim()}`] : []),
    ].join('\n');

    const bookingResponse = await square.bookings.create({
      idempotencyKey: randomUUID(),
      booking: {
        startAt,
        locationId: process.env.SQUARE_LOCATION_ID,
        customerId,
        customerNote: note,
        appointmentSegments: [{
          teamMemberId,
          serviceVariationId:      SERVICE_MAP[serviceKey],
          serviceVariationVersion: BigInt(serviceVariationVersion),
          durationMinutes:         Math.round(quote.durationHours * 60),
        }],
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        id:      bookingResponse.booking!.id,
        startAt: bookingResponse.booking!.startAt,
        status:  bookingResponse.booking!.status,
      },
      quote,
    });
  } catch (err: unknown) {
    console.error('Booking creation error:', err);

    const squareErr = err as { errors?: { code?: string; detail?: string }[]; statusCode?: number };
    const detail = squareErr.errors?.[0]?.detail || 'Failed to create booking';
    const code   = squareErr.errors?.[0]?.code   || 'UNKNOWN';

    return NextResponse.json(
      { error: detail, code },
      { status: squareErr.statusCode || 500 },
    );
  }
}
