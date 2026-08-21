import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      eventTime,
      eventLocation,
      guests,
      orderTypes,
      meats,
      sides,
      message,
      // legacy field name, kept so older payloads still work
      date: legacyDate,
    } = body;

    const date = eventDate || legacyDate;
    const list = (v) => (Array.isArray(v) && v.length ? v.join(', ') : '');
    const orderSummary = list(orderTypes);
    const meatSummary  = list(meats);
    const sideSummary  = list(sides);

    // Basic validation
    if (!name || !phone || !eventType || !date) {
      return Response.json(
        { error: 'Missing required fields: name, phone, event type, and date are required.' },
        { status: 400 }
      );
    }

    const row = (label, value, gold = false) => value
      ? `<tr>
           <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#C9A011;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:35%;">${label}</td>
           <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:${gold ? '#E8BF30' : '#ffffff'};font-size:15px;${gold ? 'font-weight:700;' : ''}">${value}</td>
         </tr>`
      : '';

    // ── Email to The Que Guy ──────────────────────────────────────────────
    const ownerMail = {
      from: `"The Que Guy Website" <${process.env.GMAIL_USER}>`,
      to: 'thequeguyllc@gmail.com',
      replyTo: email || undefined,
      subject: `★ New Booking Request — ${eventType} · ${date}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#120028;color:#ffffff;border:1px solid #5B0DB5;">

          <!-- Header -->
          <div style="background:#5B0DB5;padding:24px 32px;text-align:center;">
            <p style="margin:0;color:#C9A011;font-size:13px;letter-spacing:4px;text-transform:uppercase;">★ New Booking Request ★</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:2px;">THE QUE GUY LLC</h1>
          </div>

          <!-- Body -->
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#C9A011;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:35%;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#ffffff;font-size:15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#C9A011;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#ffffff;font-size:15px;"><a href="tel:${phone}" style="color:#E8BF30;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#C9A011;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(91,13,181,0.3);color:#ffffff;font-size:15px;">${email ? `<a href="mailto:${email}" style="color:#E8BF30;">${email}</a>` : '<span style="color:rgba(255,255,255,0.4)">Not provided</span>'}</td>
              </tr>
              ${row('Event Type', eventType)}
              ${row('Event Date', date, true)}
              ${row('Event Time', eventTime)}
              ${row('Location', eventLocation)}
              ${row('Guest Count', guests || 'Not specified')}
              ${row('Order Type', orderSummary, true)}
              ${row('Meats', meatSummary)}
              ${row('Sides', sideSummary)}
              ${message ? `
              <tr>
                <td colspan="2" style="padding:16px 0 0;">
                  <p style="margin:0 0 8px;color:#C9A011;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Quantities / Special Requests</p>
                  <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.6;background:rgba(91,13,181,0.2);padding:12px;border-left:3px solid #C9A011;">${message}</p>
                </td>
              </tr>` : ''}
            </table>
          </div>

          <!-- Footer -->
          <div style="background:rgba(0,0,0,0.4);padding:16px 32px;text-align:center;border-top:1px solid rgba(91,13,181,0.3);">
            <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">This request was submitted via thequeguyllc.com · Reply directly to respond to the customer.</p>
          </div>
        </div>
      `,
    };

    // ── Confirmation email to customer (only if they gave an email) ───────
    const confirmMail = email
      ? {
          from: `"The Que Guy LLC" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `We got your request, ${name.split(' ')[0]}! ★ The Que Guy LLC`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#120028;color:#ffffff;border:1px solid #5B0DB5;">

              <!-- Header -->
              <div style="background:#5B0DB5;padding:24px 32px;text-align:center;">
                <p style="margin:0;color:#C9A011;font-size:13px;letter-spacing:4px;text-transform:uppercase;">Eastern Carolina Style BBQ</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:2px;">THE QUE GUY LLC</h1>
              </div>

              <!-- Body -->
              <div style="padding:32px;">
                <h2 style="color:#C9A011;font-size:22px;margin:0 0 12px;">We got it, ${name.split(' ')[0]}! 🔥</h2>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin:0 0 20px;">
                  Thanks for reaching out to The Que Guy LLC! We&rsquo;ve received your booking request for a <strong style="color:#E8BF30;">${eventType}</strong> on <strong style="color:#E8BF30;">${date}</strong> and will get back to you within 24 hours to confirm your date and talk details.
                </p>

                <div style="background:rgba(201,160,17,0.1);border:1px solid rgba(201,160,17,0.3);padding:16px 20px;margin-bottom:24px;">
                  <p style="margin:0;color:#C9A011;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Your Request Summary</p>
                  <p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">📅 Date: <strong style="color:#fff;">${date}</strong></p>
                  <p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">🎉 Event: <strong style="color:#fff;">${eventType}</strong></p>
                  ${eventTime ? `<p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">🕐 Time: <strong style="color:#fff;">${eventTime}</strong></p>` : ''}
                  ${guests ? `<p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">👥 Guests: <strong style="color:#fff;">${guests}</strong></p>` : ''}
                  ${orderSummary ? `<p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">🍖 Order: <strong style="color:#fff;">${orderSummary}</strong></p>` : ''}
                  ${meatSummary ? `<p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">🔥 Meats: <strong style="color:#fff;">${meatSummary}</strong></p>` : ''}
                  ${sideSummary ? `<p style="margin:4px 0;color:rgba(255,255,255,0.7);font-size:14px;">🥗 Sides: <strong style="color:#fff;">${sideSummary}</strong></p>` : ''}
                </div>

                <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 8px;">
                  Need to talk sooner? Call or text us directly:
                </p>
                <a href="tel:6149710711" style="display:inline-block;background:#C9A011;color:#120028;font-size:20px;font-weight:700;padding:12px 28px;text-decoration:none;letter-spacing:2px;">
                  614-971-0711
                </a>

                <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:24px;">
                  Low &amp; Slow. Real Smoke. Real Flavor.<br>
                  <em>Bringing the Smoke. Bringing the Flavor. Bringing the Carolina to You!</em>
                </p>
              </div>

              <!-- Footer -->
              <div style="background:rgba(0,0,0,0.4);padding:16px 32px;text-align:center;border-top:1px solid rgba(91,13,181,0.3);">
                <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:11px;">The Que Guy LLC · Columbus, OH</p>
                <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">
                  <a href="mailto:thequeguyllc@gmail.com" style="color:#C9A011;">thequeguyllc@gmail.com</a> &nbsp;·&nbsp;
                  <a href="https://instagram.com/thequeguyllc" style="color:#C9A011;">@thequeguyllc</a>
                </p>
              </div>
            </div>
          `,
        }
      : null;

    // Send both emails
    await transporter.sendMail(ownerMail);
    if (confirmMail) await transporter.sendMail(confirmMail);

    return Response.json({ success: true });
  } catch (err) {
    console.error('[/api/book] Email error:', err);
    return Response.json(
      { error: 'Failed to send email. Please try calling us at 614-971-0711.' },
      { status: 500 }
    );
  }
}
