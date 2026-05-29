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

// Countdown — target: 29 May 2025 midnight local time
(function () {
  const TARGET = new Date('2025-05-29T00:00:00');

  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-minutes');
  const secsEl  = document.getElementById('cd-seconds');
  const timerEl = document.getElementById('countdown-timer');
  const dateEl  = document.querySelector('.countdown-date');
  const titleEl = document.querySelector('.countdown-title');
  const subEl   = document.querySelector('.countdown-sub');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = TARGET - Date.now();

    if (diff <= 0) {
      timerEl.innerHTML = '<span class="countdown-live">&#9889; THE GATE IS LIVE</span>';
      if (titleEl) titleEl.textContent = 'The Gate Is Open';
      if (subEl)   subEl.textContent   = 'The challenge has begun. Good luck.';
      if (dateEl)  dateEl.textContent  = '29th May 2025';
      return;
    }

    const totalSecs = Math.floor(diff / 1000);
    const hours     = Math.floor(totalSecs / 3600);
    const minutes   = Math.floor((totalSecs % 3600) / 60);
    const seconds   = totalSecs % 60;

    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(minutes);
    secsEl.textContent  = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
