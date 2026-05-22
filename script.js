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
  const form      = document.getElementById('reg-form');
  const formSec   = document.getElementById('form-section');
  const successSec = document.getElementById('success-card');
  const msg       = document.getElementById('form-msg');
  const btn       = form.querySelector('.submit-btn');
  const btnText   = btn.querySelector('.btn-text');
  const whatsapp  = document.getElementById('whatsapp');

  // Numeric-only enforcement on WhatsApp field
  whatsapp.addEventListener('input', () => {
    whatsapp.value = whatsapp.value.replace(/\D/g, '');
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

  function showMsg(text, type) {
    msg.textContent = text;
    msg.className = 'form-msg ' + type;
  }

  function validate() {
    let ok = true;

    form.querySelectorAll('input[required]:not([type="checkbox"]):not([type="radio"])').forEach(el => {
      el.classList.remove('error');
      if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    });

    const email = form.querySelector('#email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error'); ok = false;
    }

    if (whatsapp.value && !/^\d+$/.test(whatsapp.value)) {
      whatsapp.classList.add('error'); ok = false;
    }

    form.querySelectorAll('select[required]').forEach(el => {
      el.classList.remove('error');
      if (!el.value) { el.classList.add('error'); ok = false; }
    });

    const radioName = form.querySelector('input[type="radio"]')?.name;
    if (radioName && !form.querySelector(`input[name="${radioName}"]:checked`)) {
      form.querySelectorAll(`input[name="${radioName}"]`).forEach(r => r.classList.add('error'));
      ok = false;
    }

    const agree = form.querySelector('#agree');
    if (!agree.checked) { agree.classList.add('error'); ok = false; }

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
      showMsg('Please fill in all required fields correctly.', 'error-msg');
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
