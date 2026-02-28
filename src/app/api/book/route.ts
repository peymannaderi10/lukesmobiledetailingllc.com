import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { square, SERVICE_MAP } from '@/lib/square';
import {
  calculateQuote,
  SERVICES,
  VEHICLES,
  CONDITIONS,
  ADDONS,
} from '@/lib/pricing';
import type { ServiceKey, VehicleKey, ConditionKey, AddonKey } from '@/lib/pricing';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function buildBookingEmailHtml(params: {
  startAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  carInfo: string;
  carColor: string;
  serviceName: string;
  vehicleName: string;
  conditionName: string;
  addonsLabel: string;
  totalPrice: number;
  durationHours: string;
  serviceAddress: string;
  serviceNotes: string;
}) {
  const startTime = new Date(params.startAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  });
  const row = (label: string, value: string) => `
    <tr><td style="padding:12px 0;border-bottom:1px solid #262626;">
      <span style="font-size:12px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;">${label}</span><br>
      <span style="font-size:14px;color:#E0E0E0;">${value}</span>
    </td></tr>`;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lexend:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:520px;background-color:#121212;border-radius:2px;overflow:hidden;border:1px solid #262626;">
<tr><td style="padding:28px 32px;border-bottom:2px solid #D21F3C;">
<table role="presentation" width="100%"><tr>
<td><h1 style="margin:0;font-family:'Lexend',Arial,sans-serif;font-size:22px;font-weight:700;color:#FFFFFF;">LUKE'S <span style="color:#D21F3C;">MOBILE DETAILING</span></h1>
<p style="margin:8px 0 0 0;font-size:13px;color:#9E9E9E;">Your new booking</p></td>
<td align="right"><span style="display:inline-block;background-color:#D21F3C;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;padding:6px 12px;border-radius:2px;">New Booking</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:28px 32px;">
<p style="margin:0 0 20px 0;font-size:15px;color:#E0E0E0;">Hey Luke, here's your latest booking.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${row('Date & Time', escapeHtml(startTime))}
${row('Customer', escapeHtml(`${params.firstName} ${params.lastName}`))}
${row('Email', escapeHtml(params.email))}
${row('Phone', escapeHtml(params.phone))}
${row('Vehicle', escapeHtml(`${params.carInfo} (${params.carColor})`))}
${row('Service', escapeHtml(params.serviceName))}
${row('Vehicle size', escapeHtml(params.vehicleName))}
${row('Condition', escapeHtml(params.conditionName))}
${row('Add-ons', escapeHtml(params.addonsLabel))}
${row('Quoted total', `$${params.totalPrice}`)}
${row('Est. duration', `${params.durationHours} hrs`)}
${row('Service address', escapeHtml(params.serviceAddress || 'Not provided'))}
</table>
${params.serviceNotes?.trim() ? `<div style="margin-top:24px;padding:16px;background-color:#171717;border:1px solid #262626;border-radius:2px;">
<p style="margin:0 0 8px 0;font-size:12px;color:#9E9E9E;text-transform:uppercase;">Special instructions</p>
<p style="margin:0;font-size:14px;color:#E0E0E0;line-height:1.6;white-space:pre-wrap;">${escapeHtml(params.serviceNotes.trim())}</p></div>` : ''}
</td></tr>
<tr><td style="padding:20px 32px;background-color:#0A0A0A;border-top:1px solid #262626;">
<p style="margin:0;font-size:12px;color:#757575;text-align:center;"><a href="https://lukesmobiledetailingllc.com" style="color:#D21F3C;text-decoration:none;">lukesmobiledetailingllc.com</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`.trim();
}

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

    // Notify Luke via email (fire-and-forget, don't fail the response)
    const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Bookings <no-reply@lukesmobiledetailingllc.com>";
    if (notifyEmail && process.env.RESEND_API_KEY) {
      try {
        const addonsLabel = selectedAddons.length ? selectedAddons.map((a) => a.label).join(', ') : 'None';
        const html = buildBookingEmailHtml({
          startAt,
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          email: email ?? '',
          phone: phone ?? '',
          carInfo: carInfo ?? '',
          carColor: carColor ?? '',
          serviceName: service.name,
          vehicleName: vehicle.name,
          conditionName: condition.name,
          addonsLabel,
          totalPrice: quote.totalPrice,
          durationHours: String(quote.durationHours),
          serviceAddress: serviceAddress ?? '',
          serviceNotes: serviceNotes ?? '',
        });
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmail,
          subject: "You have a new booking",
          html,
        });
      } catch (emailErr) {
        console.error('Booking email failed:', emailErr);
      }
    }

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
