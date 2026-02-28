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
    <tr><td style="padding:10px 0;border-bottom:1px solid #262626;background-color:#121212;" bgcolor="#121212">
      <span style="font-size:11px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;background-color:transparent;">${label}</span><br>
      <span style="font-size:15px;color:#E0E0E0;background-color:transparent;-webkit-text-size-adjust:100%;">${value}</span>
    </td></tr>`;
  return `
<!DOCTYPE html>
<html lang="en" style="color-scheme:dark;">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>New Booking</title>
<style type="text/css">
@media (max-width:480px){
  .pad-outer{padding:12px 8px !important;}
  .pad-inner{padding:20px 16px !important;}
  .pad-header{padding:20px 16px !important;}
  .pad-footer{padding:16px !important;}
  .title-font{font-size:18px !important;}
}
body{-webkit-text-size-adjust:100%;}
.badge-nowrap{white-space:nowrap !important;}
</style>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A !important;color:#E0E0E0 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;" bgcolor="#0A0A0A">
<div style="background-color:#0A0A0A !important;min-height:100vh;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A !important;padding:24px 12px;" bgcolor="#0A0A0A" class="pad-outer">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:520px;background-color:#121212 !important;border-radius:4px;overflow:hidden;border:1px solid #262626;" cellpadding="0" cellspacing="0" bgcolor="#121212">
<tr><td style="padding:24px 24px;border-bottom:2px solid #D21F3C;background-color:#121212 !important;" bgcolor="#121212" class="pad-header">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="background-color:transparent;"><h1 style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF !important;background-color:transparent;line-height:1.3;" class="title-font">LUKE'S <span style="color:#D21F3C !important;">MOBILE DETAILING</span></h1>
<p style="margin:6px 0 0 0;font-size:13px;color:#9E9E9E !important;background-color:transparent;">Your new booking</p></td>
<td align="right" valign="top" style="background-color:transparent;white-space:nowrap;"><span style="display:inline-block;background-color:#D21F3C !important;color:#FFFFFF !important;font-size:11px;font-weight:600;text-transform:uppercase;padding:6px 12px;border-radius:2px;white-space:nowrap;" class="badge-nowrap">New Booking</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:24px 24px;background-color:#121212 !important;" bgcolor="#121212" class="pad-inner">
<p style="margin:0 0 16px 0;font-size:15px;color:#E0E0E0 !important;background-color:transparent;">Hey Luke, here's your latest booking.</p>
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
${params.serviceNotes?.trim() ? `<div style="margin-top:20px;padding:16px;background-color:#171717 !important;border:1px solid #262626;border-radius:2px;" bgcolor="#171717">
<p style="margin:0 0 8px 0;font-size:12px;color:#9E9E9E !important;background-color:transparent;text-transform:uppercase;">Special instructions</p>
<p style="margin:0;font-size:15px;color:#E0E0E0 !important;background-color:transparent;line-height:1.5;white-space:pre-wrap;">${escapeHtml(params.serviceNotes.trim())}</p></div>` : ''}
</td></tr>
<tr><td style="padding:16px 24px;background-color:#0A0A0A !important;border-top:1px solid #262626;" bgcolor="#0A0A0A" class="pad-footer">
<p style="margin:0;font-size:13px;color:#757575 !important;background-color:transparent;text-align:center;"><a href="https://lukesmobiledetailingllc.com" style="color:#D21F3C !important;text-decoration:none;">lukesmobiledetailingllc.com</a></p>
</td></tr>
</table></td></tr></table>
</div>
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
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Bookings <bookings@lukesmobiledetailingllc.com>";
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
