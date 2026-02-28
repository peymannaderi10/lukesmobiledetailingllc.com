import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { WebhooksHelper } from "square";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const signature = req.headers.get("x-square-hmacsha256-signature");
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Bookings <no-reply@lukesmobiledetailingllc.com>";

  if (!signature || !signatureKey) {
    return NextResponse.json({ error: "Missing signature or config" }, { status: 401 });
  }

  const notificationUrl =
    process.env.NODE_ENV === "production"
      ? `https://${req.headers.get("host")}${req.nextUrl.pathname}`
      : req.url;

  const isValid = await WebhooksHelper.verifySignature({
    requestBody: bodyText,
    signatureHeader: signature,
    signatureKey,
    notificationUrl,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(bodyText) as {
    type?: string;
    data?: { object?: { booking?: Record<string, unknown> } };
  };

  if (body.type !== "booking.created") {
    return NextResponse.json({ received: true });
  }

  const booking = body.data?.object?.booking;
  if (!booking) {
    return NextResponse.json({ error: "Missing booking data" }, { status: 400 });
  }

  const startAt = booking.start_at as string | undefined;
  const customerId = booking.customer_id as string | undefined;
  const locationId = booking.location_id as string | undefined;
  const customerNote = (booking.customer_note as string) ?? "";
  const startTime = startAt
    ? new Date(startAt).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "America/Los_Angeles",
      })
    : "N/A";

  if (!notifyEmail) {
    console.warn("BOOKING_NOTIFY_EMAIL not set — skipping email");
    return NextResponse.json({ success: true });
  }

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lexend:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:520px;background-color:#121212;border-radius:2px;overflow:hidden;border:1px solid #262626;">
          <tr>
            <td style="padding:28px 32px;border-bottom:2px solid #D21F3C;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <h1 style="margin:0;font-family:'Lexend',Arial,sans-serif;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">
                      LUKE'S <span style="color:#D21F3C;">MOBILE DETAILING</span>
                    </h1>
                    <p style="margin:8px 0 0 0;font-size:13px;color:#9E9E9E;">Your new booking</p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:#D21F3C;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;padding:6px 12px;border-radius:2px;">New Booking</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 20px 0;font-size:15px;color:#E0E0E0;">Hey Luke, here's your latest booking.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #262626;">
                    <span style="font-size:12px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;">Date & Time</span><br>
                    <span style="font-size:16px;color:#FFFFFF;font-weight:600;">${escapeHtml(startTime)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #262626;">
                    <span style="font-size:12px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;">Customer ID</span><br>
                    <span style="font-size:14px;color:#E0E0E0;">${escapeHtml(customerId ?? "N/A")}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="font-size:12px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;">Location ID</span><br>
                    <span style="font-size:14px;color:#E0E0E0;">${escapeHtml(locationId ?? "N/A")}</span>
                  </td>
                </tr>
              </table>
              ${customerNote ? `
              <div style="margin-top:24px;padding:16px;background-color:#171717;border:1px solid #262626;border-radius:2px;">
                <p style="margin:0 0 8px 0;font-size:12px;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.05em;">Customer Note</p>
                <p style="margin:0;font-size:14px;color:#E0E0E0;line-height:1.6;white-space:pre-wrap;word-break:break-word;">${escapeHtml(customerNote)}</p>
              </div>
              ` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:#0A0A0A;border-top:1px solid #262626;">
              <p style="margin:0;font-size:12px;color:#757575;text-align:center;">
                <a href="https://lukesmobiledetailingllc.com" style="color:#D21F3C;text-decoration:none;">lukesmobiledetailingllc.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    subject: "You have a new booking",
    html,
  });

  return NextResponse.json({ success: true });
}
