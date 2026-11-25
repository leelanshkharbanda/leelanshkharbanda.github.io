(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var requestDraw = function () {};

  /* Theme: explicit choice wins, otherwise follow the OS hint. */
  var stored = null;
  try { stored = window.localStorage.getItem('signal-lab-theme'); } catch (e) { stored = null; }
  var prefersLight = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  var theme = (stored === 'light' || stored === 'dark') ? stored : (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', theme);

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    var toggleLabel = toggle.querySelector('.toggle-label');
    function syncToggle() {
      var toLight = theme !== 'light';
      toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      toggle.setAttribute('aria-label', 'Switch to ' + (toLight ? 'light' : 'dark') + ' theme');
      if (toggleLabel) { toggleLabel.textContent = toLight ? 'Light' : 'Dark'; }
    }
    syncToggle();
    toggle.addEventListener('click', function () {
      theme = theme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      try { window.localStorage.setItem('signal-lab-theme', theme); } catch (e) {}
      syncToggle();
      if (typeof requestDraw === 'function') { requestDraw(); }
    });
  }

  /* Segmented datasheet readers: all panels visible until JS enhances them. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]'), function (reader) {
    var tabs = Array.prototype.slice.call(reader.querySelectorAll('[role="tab"]'));
    if (!tabs.length) { return; }

    function activate(target, moveFocus) {
      tabs.forEach(function (tab) {
        var selected = tab === target;
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) { panel.hidden = !selected; }
      });
      if (moveFocus) { target.focus(); }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { activate(tab, false); });
      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { next = tabs[(index + 1) % tabs.length]; }
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { next = tabs[(index - 1 + tabs.length) % tabs.length]; }
        else if (event.key === 'Home') { next = tabs[0]; }
        else if (event.key === 'End') { next = tabs[tabs.length - 1]; }
        if (next) { event.preventDefault(); activate(next, true); }
      });
    });
    activate(tabs[0], false);
  });

  /* QPSK / AWGN constellation. One interactive control, deterministic seed,
     DPR-capped backing store, redraws only when visible and on user input. */
  var canvas = document.getElementById('constellation');
  var wrap = document.getElementById('constellation-wrap');
  var slider = document.getElementById('snr');
  var valueOut = document.getElementById('snr-value');
  var help = document.getElementById('snr-help');

  if (canvas && wrap && slider && canvas.getContext && valueOut && help) {
    var ctx = canvas.getContext('2d');
    var width = 0;
    var height = 0;
    var visible = true;
    var frame = 0;
    var seed = 20261125;

    function rngFactory(a) {
      return function () {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function gaussian(rng) {
      var u = Math.max(rng(), 1e-9);
      var v = rng();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    function erfc(x) {
      var z = Math.abs(x);
      var t = 1 / (1 + 0.5 * z);
      var coeff = [-1.26551223, 1.00002368, 0.37409196, 0.09678418, -0.18628806,
                   0.27886807, -1.13520398, 1.48851587, -0.82215223, 0.17087277];
      var p = coeff[0];
      for (var i = 1; i < coeff.length; i++) { p += coeff[i] * Math.pow(t, i); }
      var result = t * Math.exp(-z * z + p);
      return x >= 0 ? result : 2 - result;
    }

    function estimatedBer(snrDb) {
      var ebN0 = Math.pow(10, snrDb / 10) / 2; /* QPSK: 2 bits per symbol */
      return 0.5 * erfc(Math.sqrt(ebN0));
    }

    function fmtBer(ber) {
      if (ber < 1e-9) { return '< 1e-9'; }
      if (ber < 0.001) { return ber.toExponential(1); }
      return ber.toFixed(3);
    }

    function token(name, fallback) {
      var value = getComputedStyle(root).getPropertyValue(name).trim();
      return value || fallback;
    }

    function draw() {
      if (!ctx || !width || !height) { return; }
      var grid = token('--chart-grid', '#22314A');
      var axis = token('--chart-axis', '#7F93AF');
      var ideal = token('--chart-ideal', '#C6F24E');
      var noise = token('--chart-noise', 'rgba(198,242,78,0.32)');
      var snrDb = Number(slider.value);
      var esN0 = Math.pow(10, snrDb / 10);
      var sigma = Math.sqrt(1 / (2 * esN0));
      var cx = width / 2;
      var cy = height / 2;
      var radius = Math.min(width, height) * 0.34;
      var k = radius / Math.SQRT2;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      for (var g = 1; g < 4; g++) {
        var gx = Math.round(width * g / 4) + 0.5;
        var gy = Math.round(height * g / 4) + 0.5;
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
      }

      ctx.strokeStyle = axis;
      ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(cx, 8); ctx.lineTo(cx, height - 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, cy); ctx.lineTo(width - 8, cy); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      var rng = rngFactory(seed);
      var sigmaPx = sigma * radius;
      ctx.fillStyle = noise;
      for (var i = 0; i < 96; i++) {
        var sx = (i & 1) ? 1 : -1;
        var sy = (i & 2) ? 1 : -1;
        var px = cx + sx * k + gaussian(rng) * sigmaPx;
        var py = cy - sy * k + gaussian(rng) * sigmaPx;
        ctx.fillRect(px - 1.2, py - 1.2, 2.4, 2.4);
      }

      ctx.strokeStyle = ideal;
      ctx.lineWidth = 1.4;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
        var x = cx + q[0] * k;
        var y = cy - q[1] * k;
        ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke();
      });
      ctx.lineWidth = 1;
    }

    function sizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
      wrap.classList.add('painted');
    }

    requestDraw = function () {
      if (!visible || document.hidden || frame) { return; }
      frame = window.requestAnimationFrame(function () { frame = 0; draw(); });
    };

    function update() {
      var snrDb = Number(slider.value);
      valueOut.textContent = snrDb + ' dB';
      var ber = estimatedBer(snrDb);
      help.textContent = 'Estimated BER ' + fmtBer(ber) + ' at ' + snrDb + ' dB SNR — simulated QPSK over AWGN, not a measured link.';
      requestDraw();
    }

    slider.addEventListener('input', update);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && frame) { window.cancelAnimationFrame(frame); frame = 0; }
      if (!document.hidden) { requestDraw(); }
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) { requestDraw(); }
      }, { threshold: 0, rootMargin: '80px' });
      observer.observe(wrap);
    }

    var resizePending = false;
    window.addEventListener('resize', function () {
      if (resizePending) { return; }
      resizePending = true;
      window.requestAnimationFrame(function () { resizePending = false; sizeCanvas(); });
    }, { passive: true });

    update();
    sizeCanvas();
  }
})();
