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

// Form handling
(function () {
  const form       = document.getElementById('reg-form');
  const formSec    = document.getElementById('form-section');
  const successSec = document.getElementById('success-card');
  const btn        = form.querySelector('.submit-btn');
  const btnText    = btn.querySelector('.btn-text');
  const whatsapp   = document.getElementById('whatsapp');

  const fieldErrors = {
    'full-name':   { el: null, msg: null },
    'hacker-name': { el: null, msg: null },
    'email':       { el: null, msg: null },
    'whatsapp':    { el: null, msg: null },
    'experience':  { el: null, msg: null },
  };
  Object.keys(fieldErrors).forEach(id => {
    fieldErrors[id].el  = document.getElementById(id);
    fieldErrors[id].msg = document.getElementById(id + '-error');
  });
  const studentError = document.getElementById('student-error');
  const agreeError   = document.getElementById('agree-error');

  function showError(id, show) {
    const f = fieldErrors[id];
    f.el.classList.toggle('error', show);
    f.msg.classList.toggle('hidden', !show);
  }

  // Numeric-only enforcement on WhatsApp field
  whatsapp.addEventListener('input', () => {
    whatsapp.value = whatsapp.value.replace(/\D/g, '');
    whatsappError.classList.add('hidden');
  });
  whatsapp.addEventListener('keydown', (e) => {
    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter','Home','End'];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
  });
  whatsapp.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = e.clipboardData ? e.clipboardData.getData('text') : '';
    whatsapp.value = pasted.replace(/\D/g, '');
  });

  function validate() {
    let ok = true;

    // Full name
    const emptyName = !fieldErrors['full-name'].el.value.trim();
    showError('full-name', emptyName);
    if (emptyName) ok = false;

    // Hacker name
    const emptyHandle = !fieldErrors['hacker-name'].el.value.trim();
    showError('hacker-name', emptyHandle);
    if (emptyHandle) ok = false;

    // Email
    const emailEl = fieldErrors['email'].el;
    const emailBad = !emailEl.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value);
    showError('email', emailBad);
    if (emailBad) ok = false;

    // WhatsApp
    const waBad = !whatsapp.value.trim() || !/^\d+$/.test(whatsapp.value) || whatsapp.value.length < 10;
    showError('whatsapp', waBad);
    if (waBad) ok = false;

    // Experience
    const expEmpty = !fieldErrors['experience'].el.value;
    showError('experience', expEmpty);
    if (expEmpty) ok = false;

    // Student radio
    const radioName = form.querySelector('input[type="radio"]')?.name;
    const noRadio = radioName && !form.querySelector(`input[name="${radioName}"]:checked`);
    form.querySelectorAll(`input[name="${radioName}"]`).forEach(r => r.classList.toggle('error', !!noRadio));
    studentError.classList.toggle('hidden', !noRadio);
    if (noRadio) ok = false;

    // Agree checkbox
    const agree = form.querySelector('#agree');
    const noAgree = !agree.checked;
    agree.classList.toggle('error', noAgree);
    agreeError.classList.toggle('hidden', !noAgree);
    if (noAgree) ok = false;

    return ok;
  }

  function showSuccess() {
    formSec.classList.add('hidden');
    successSec.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  form.addEventListener('submit', (e) => {
    msg.className = 'form-msg hidden';

    if (!validate()) {
      e.preventDefault();
      return;
    }

    btn.disabled = true;
    btnText.textContent = 'SUBMITTING...';

    const iframe = document.querySelector('iframe[name="hidden-iframe"]');
    let fired = false;

    function onDone() {
      if (fired) return;
      fired = true;
      showSuccess();
    }

    iframe.addEventListener('load', onDone, { once: true });
    setTimeout(onDone, 4000);
  });

  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
    el.addEventListener('change', () => el.classList.remove('error'));
  });
})();
