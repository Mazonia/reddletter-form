// Matrix rain canvas
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|#@!$%^&*';
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5, 0, 8, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#ff4466' : '#6a0010';
      ctx.font = '13px "Share Tech Mono", monospace';
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();

// Countdown — reveals flag form when it hits zero
(function () {
  // Target: 30 May 2026 10:00 AM WAT (UTC+1) = 09:00 UTC
  const TARGET = new Date('2026-05-30T09:00:00Z');

  const hoursEl    = document.getElementById('cd-hours');
  const minsEl     = document.getElementById('cd-minutes');
  const secsEl     = document.getElementById('cd-seconds');
  const timerEl    = document.getElementById('countdown-timer');
  const dateEl     = document.querySelector('.countdown-date');
  const titleEl    = document.querySelector('.countdown-title');
  const subEl      = document.querySelector('.countdown-sub');
  const badgeEl    = document.querySelector('.closed-badge');
  const flagForm   = document.getElementById('flag-form-section');
  const cdSection  = document.getElementById('countdown-section');

  function pad(n) { return String(n).padStart(2, '0'); }

  let gateOpened = false;

  function openGate() {
    if (gateOpened) return;
    gateOpened = true;

    // Swap badge
    if (badgeEl) {
      badgeEl.textContent = '⚡ CHALLENGE LIVE';
      badgeEl.style.color = '#4dff8a';
      badgeEl.style.borderColor = '#4dff8a';
      badgeEl.style.background = 'rgba(77,255,138,0.1)';
      badgeEl.style.textShadow = '0 0 8px #4dff8a';
    }

    timerEl.innerHTML = '<span class="countdown-live">&#9889; THE GATE IS LIVE</span>';
    if (titleEl) titleEl.textContent = 'The Gate Is Open';
    if (subEl)   subEl.textContent   = 'Submit your flags below.';
    if (dateEl)  dateEl.textContent  = '30th May 2026 — 10:00 AM';

    // Reveal flag form with a slight delay for dramatic effect
    setTimeout(() => {
      if (flagForm) {
        flagForm.classList.remove('hidden');
        flagForm.style.animation = 'fadeUp 0.6s ease both';
        flagForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 600);
  }

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) { openGate(); return; }

    const totalSecs = Math.floor(diff / 1000);
    hoursEl.textContent = pad(Math.floor(totalSecs / 3600));
    minsEl.textContent  = pad(Math.floor((totalSecs % 3600) / 60));
    secsEl.textContent  = pad(totalSecs % 60);
  }

  tick();
  setInterval(tick, 1000);
})();

// Flag form submission
(function () {
  const form        = document.getElementById('flag-form');
  const formSection = document.getElementById('flag-form-section');
  const successCard = document.getElementById('flag-success-card');
  const btn         = form.querySelector('.submit-btn');
  const btnText     = btn.querySelector('.btn-text');
  const msgEl       = document.getElementById('flag-form-msg');

  const fields = {
    'flag-name':  { el: document.getElementById('flag-name'),  err: document.getElementById('flag-name-error') },
    'flag-email': { el: document.getElementById('flag-email'), err: document.getElementById('flag-email-error') },
    'flag1':      { el: document.getElementById('flag1'),      err: document.getElementById('flag1-error') },
    'flag-root':  { el: document.getElementById('flag-root'),  err: document.getElementById('flag-root-error') },
  };

  function validate() {
    let ok = true;

    const nameBad = !fields['flag-name'].el.value.trim();
    fields['flag-name'].el.classList.toggle('error', nameBad);
    fields['flag-name'].err.classList.toggle('hidden', !nameBad);
    if (nameBad) ok = false;

    const email = fields['flag-email'].el;
    const emailBad = !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    email.classList.toggle('error', emailBad);
    fields['flag-email'].err.classList.toggle('hidden', !emailBad);
    if (emailBad) ok = false;

    const flag1Bad = !fields['flag1'].el.value.trim();
    fields['flag1'].el.classList.toggle('error', flag1Bad);
    fields['flag1'].err.classList.toggle('hidden', !flag1Bad);
    if (flag1Bad) ok = false;

    const rootBad = !fields['flag-root'].el.value.trim();
    fields['flag-root'].el.classList.toggle('error', rootBad);
    fields['flag-root'].err.classList.toggle('hidden', !rootBad);
    if (rootBad) ok = false;

    return ok;
  }

  form.addEventListener('submit', (e) => {
    msgEl.className = 'form-msg hidden';
    if (!validate()) { e.preventDefault(); return; }

    btn.disabled = true;
    btnText.textContent = 'SUBMITTING...';

    const iframe = document.querySelector('iframe[name="hidden-iframe"]');
    let fired = false;
    function onDone() {
      if (fired) return; fired = true;
      formSection.classList.add('hidden');
      successCard.classList.remove('hidden');
      successCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    iframe.addEventListener('load', onDone, { once: true });
    setTimeout(onDone, 4000);
  });

  Object.values(fields).forEach(({ el }) => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
})();
