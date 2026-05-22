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

// Form handling — posts to Google Forms via hidden iframe
(function () {
  const form = document.getElementById('reg-form');
  const msg = document.getElementById('form-msg');
  const btn = form.querySelector('.submit-btn');
  const btnText = btn.querySelector('.btn-text');

  function showMsg(text, type) {
    msg.textContent = text;
    msg.className = 'form-msg ' + type;
  }

  function validate() {
    let ok = true;

    // Required text/email/tel inputs
    form.querySelectorAll('input[required]:not([type="checkbox"]):not([type="radio"])').forEach(el => {
      el.classList.remove('error');
      if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    });

    // Email format
    const email = form.querySelector('#email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error'); ok = false;
    }

    // Required selects
    form.querySelectorAll('select[required]').forEach(el => {
      el.classList.remove('error');
      if (!el.value) { el.classList.add('error'); ok = false; }
    });

    // Radio group — check at least one selected
    const radioName = form.querySelector('input[type="radio"]')?.name;
    if (radioName) {
      const checked = form.querySelector(`input[name="${radioName}"]:checked`);
      if (!checked) {
        form.querySelectorAll(`input[name="${radioName}"]`).forEach(r => r.classList.add('error'));
        ok = false;
      }
    }

    // Checkbox
    const agree = form.querySelector('#agree');
    if (!agree.checked) { agree.classList.add('error'); ok = false; }

    return ok;
  }

  form.addEventListener('submit', (e) => {
    msg.className = 'form-msg hidden';

    if (!validate()) {
      e.preventDefault();
      showMsg('Please fill in all required fields.', 'error-msg');
      return;
    }

    // Valid — let the form submit natively to the hidden iframe
    btn.disabled = true;
    btnText.textContent = 'SUBMITTING...';

    // Google Forms doesn't send a success response we can read (CORS),
    // so we show success after a short delay once the iframe loads
    const iframe = document.querySelector('iframe[name="hidden-iframe"]');
    iframe.addEventListener('load', onSuccess, { once: true });

    // Fallback in case load event doesn't fire
    setTimeout(onSuccess, 4000);
  });

  function onSuccess() {
    btnText.textContent = 'REGISTERED ✓';
    showMsg('Registration successful! You will receive a confirmation email. See you on 29th May. 🏆', 'success');
    form.reset();
  }

  // Clear error styling on user input
  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
    el.addEventListener('change', () => el.classList.remove('error'));
  });
})();
