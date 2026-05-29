const { Resend } = require('resend');

const resend = new Resend('re_Fw419LQA_EBb21SrTQiAN2oVyZaUJXH8n');

// Paste all respondent emails here — one per line inside the array
const emails = [
  "pauljorgin222@gmail.com",
  "twumasiisabella78813@gmail.com",
  "princekoomson03@gmail.com",
  "Klausevoyage@gmail.com",
  "Benjaminasareagyapong2006@gmail.com",
  "Yeboahaffuljonathan@gmail.com",
  "nyarkohaa00@gmail.com",
  "nrichardn96@gmail.com",
  "jhabtee@gmail.com",
  "philipduncanglavee@gmail.com",
  "gkpodo369@gmail.com",
  "ahlaamwumpini@gmail.com",
  "tokoryhayford@gmail.com",
  "mrkonde10@gmail.com",
  "richardkumah714@gmail.com",
  "anonymousmsf4@gmail.com",
  "ajongbahj@gmail.com",
  "quayelemuel50@gmail.com",
  "heyonyx@proton.me",
  "Yeboahaffuljonathan@gmail.com",
  "baidooprinceaikins@gmail.com",
  "baidooprinceaikins@gmail.com",
  "info@geekbyte.tech",
  "sibdou.issifu@geekbyte.tech",
  "khidmazonia@gmail.com"
];

const FROM = 'RedLetter Gate <info@geekbyte.tech>'; // change to your verified domain later
const SUBJECT = 'Red Letter Gate — The Gate Opens Tomorrow at 10AM';
const BODY_HTML = `
<div style="background:#050508;color:#e8e0e0;font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 32px;border:1px solid rgba(224,16,32,0.3);border-radius:12px;">
  <h1 style="font-size:2rem;color:#ff1a2e;letter-spacing:0.1em;margin-bottom:4px;">RED<span style="color:#f0eaea">LETTER</span></h1>
  <h2 style="font-size:1.4rem;color:#f0eaea;letter-spacing:0.1em;margin-top:0;">GATE</h2>
  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:20px 0;" />

  <p style="font-size:1rem;line-height:1.7;">Hello,</p>

  <p style="font-size:1rem;line-height:1.7;">
    The <strong style="color:#ff1a2e">Red Letter Gate</strong> CTF challenge goes live
    <strong>tomorrow, 30th May 2026 at 10:00 AM</strong>.
  </p>

  <p style="font-size:1rem;line-height:1.7;">
    Make sure you're ready. The quietest services often conceal the deadliest flaws.
  </p>

  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:28px 0;" />

  <p style="font-size:0.9rem;color:#8a7a7a;">Join our community if you haven't already:</p>

  <table style="margin:12px 0;">
    <tr>
      <td style="padding:6px 0;">
        <a href="https://chat.whatsapp.com/JvIY40FQ3JvF4fVC98jDYG"
           style="background:#25D366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:bold;font-size:0.85rem;">
          Join WhatsApp Group
        </a>
      </td>
      <td style="padding:6px 0 6px 12px;">
        <a href="https://discord.gg/Zgm2YYXDE"
           style="background:#5865F2;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:bold;font-size:0.85rem;">
          Join Discord Server
        </a>
      </td>
    </tr>
  </table>

  <p style="font-size:1rem;line-height:1.7;margin-top:28px;">
    Good luck — First Blood awaits. 🏆
  </p>

  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:28px 0;" />
  <p style="font-size:0.75rem;color:#8a7a7a;margin:0;">
    — ssshadesCTF &times; Geek Byte
  </p>
</div>
`;

async function sendAll() {
  if (emails.length === 0) {
    console.log('No emails in the list. Add them to the emails array in this file.');
    return;
  }

  console.log(`Sending to ${emails.length} recipients...\n`);
  let sent = 0, failed = 0;

  for (const email of emails) {
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: SUBJECT,
        html: BODY_HTML,
      });
      console.log(`✓  ${email}`);
      sent++;
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗  ${email} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Sent: ${sent}  Failed: ${failed}`);
}

sendAll();
