const { Resend } = require('resend');

const resend = new Resend('re_Fw419LQA_EBb21SrTQiAN2oVyZaUJXH8n');

const FROM    = 'RedLetter Gate <info@geekbyte.tech>';
const SUBJECT = 'Red Letter Gate — Your Machine IP';

// IP assignments
// Solo players get their own machine; grouped players share one machine
const assignments = [
  { ip: '52.55.39.205', emails: ['heyonyx@proton.me'] },
  { ip: '54.89.61.10',  emails: ['Benjaminasareagyapong2006@gmail.com'] },
  { ip: '54.88.23.28',  emails: ['pauljorgin222@gmail.com', 'twumasiisabella78813@gmail.com', 'princekoomson03@gmail.com', 'Klausevoyage@gmail.com'] },
  { ip: '52.91.75.166', emails: ['Yeboahaffuljonathan@gmail.com', 'nyarkohaa00@gmail.com', 'nrichardn96@gmail.com', 'jhabtee@gmail.com'] },
  { ip: '54.211.173.26',emails: ['philipduncanglavee@gmail.com', 'gkpodo369@gmail.com', 'ahlaamwumpini@gmail.com', 'tokoryhayford@gmail.com'] },
  { ip: '3.81.225.254', emails: ['mrkonde10@gmail.com', 'richardkumah714@gmail.com', 'anonymousmsf4@gmail.com'] },
  { ip: '54.196.41.107',emails: ['ajongbahj@gmail.com', 'quayelemuel50@gmail.com', 'baidooprinceaikins@gmail.com'] },
];

function buildEmail(ip, isSolo) {
  const sharedNote = isSolo
    ? `<p style="font-size:0.85rem;color:#8a7a7a;font-style:italic;">This machine is assigned to you exclusively.</p>`
    : `<p style="font-size:0.85rem;color:#8a7a7a;font-style:italic;">Note: You share this machine with other participants. First to root it wins First Blood.</p>`;

  return `
<div style="background:#050508;color:#e8e0e0;font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 32px;border:1px solid rgba(224,16,32,0.3);border-radius:12px;">
  <h1 style="font-size:2rem;color:#ff1a2e;letter-spacing:0.1em;margin-bottom:4px;">RED<span style="color:#f0eaea">LETTER</span></h1>
  <h2 style="font-size:1.4rem;color:#f0eaea;letter-spacing:0.1em;margin-top:0;">GATE</h2>
  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:20px 0;" />

  <p style="font-size:1rem;line-height:1.7;">The gate is open. Here is your assigned machine:</p>

  <div style="background:rgba(224,16,32,0.08);border:1px solid rgba(224,16,32,0.35);border-radius:8px;padding:20px 24px;margin:24px 0;text-align:center;">
    <p style="font-size:0.72rem;letter-spacing:0.2em;color:#8a7a7a;margin:0 0 8px;">YOUR MACHINE IP</p>
    <p style="font-family:'Courier New',monospace;font-size:2rem;font-weight:bold;color:#ff1a2e;margin:0;letter-spacing:0.1em;">${ip}</p>
  </div>

  ${sharedNote}

  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:24px 0;" />

  <p style="font-size:0.9rem;line-height:1.7;color:#8a7a7a;">
    Submit your flags at <a href="https://redletterctf.geekbyte.tech" style="color:#ff1a2e;">redletterctf.geekbyte.tech</a> once the challenge goes live at <strong style="color:#e8e0e0;">10:00 AM</strong>.
  </p>

  <p style="font-size:1rem;line-height:1.7;margin-top:16px;">
    Good luck — First Blood awaits. 🏆
  </p>

  <hr style="border:none;border-top:1px solid rgba(224,16,32,0.3);margin:28px 0;" />
  <p style="font-size:0.75rem;color:#8a7a7a;margin:0;">— ssshadesCTF &times; Geek Byte</p>
</div>`;
}

async function sendAll() {
  let sent = 0, failed = 0;
  const total = assignments.reduce((sum, a) => sum + a.emails.length, 0);
  console.log(`Sending IP assignments to ${total} participants...\n`);

  for (const { ip, emails } of assignments) {
    const isSolo = emails.length === 1;
    for (const email of emails) {
      try {
        await resend.emails.send({
          from:    FROM,
          to:      email,
          subject: SUBJECT,
          html:    buildEmail(ip, isSolo),
        });
        console.log(`✓  ${email}  →  ${ip}`);
        sent++;
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.error(`✗  ${email}  →  ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\nDone. Sent: ${sent}  Failed: ${failed}`);
}

sendAll();
