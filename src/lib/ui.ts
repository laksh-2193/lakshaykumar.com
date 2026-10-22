// All site behaviour in one small module (no animation library).
// Everything is progressive: with JS off or reduced motion on, content is
// fully visible and static.

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

export function initUI() {
  reveal();
  header();
  clock();
  statement();
  followChip();
  kinetic();
}

/* Fade blocks in once as they enter. */
function reveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || reduce()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* Header tucks away on the way down, returns on the way up. */
function header() {
  const h = document.querySelector<HTMLElement>('[data-hdr]');
  if (!h) return;
  let last = scrollY;
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const d = y - last;
      if (y > 240 && d > 8) h.classList.add('is-hidden');
      else if (d < -8 || y < 120) h.classList.remove('is-hidden');
      last = y;
      ticking = false;
    });
  }, { passive: true });
  h.addEventListener('focusin', () => h.classList.remove('is-hidden'));
}

/* Live Bangalore time. */
function clock() {
  const els = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (!els.length) return;
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => els.forEach((e) => { e.textContent = f.format(new Date()); });
  tick();
  setInterval(tick, 15000);
}

/* Words lift from faint to full ink as the paragraph scrolls through. */
function statement() {
  const els = document.querySelectorAll<HTMLElement>('[data-statement]');
  if (!els.length) return;
  if (reduce()) { els.forEach((el) => el.style.setProperty('--p', '1')); return; }
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      const start = vh * 0.85;
      const end = vh * 0.3;
      el.style.setProperty('--p', clamp((start - r.top) / (start - end + r.height * 0.55)).toFixed(3));
    });
  };
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();
}

/* A small chip that trails the pointer over index rows and shows the result. */
function followChip() {
  const lists = document.querySelectorAll<HTMLElement>('[data-chip]');
  if (!lists.length || !finePointer() || reduce()) return;
  const chip = document.createElement('div');
  chip.className = 'follow';
  chip.setAttribute('aria-hidden', 'true');
  document.body.append(chip);

  let tx = 0, ty = 0, x = 0, y = 0, on = false, raf = 0;
  const loop = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    chip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    raf = on || Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4 ? requestAnimationFrame(loop) : 0;
  };
  const off = () => { on = false; chip.classList.remove('is-on'); };

  lists.forEach((list) => {
    list.addEventListener('pointermove', (e) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>('[data-result]');
      if (!row) return off();
      if (chip.textContent !== row.dataset.result) chip.textContent = row.dataset.result ?? '';
      tx = e.clientX + 20;
      ty = e.clientY + 20;
      if (!on) { x = tx; y = ty; }
      on = true;
      chip.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    });
    list.addEventListener('pointerleave', off);
  });
}

/* Kinetic hero: each letter of the name swells (weight + width) as the pointer
   approaches. Touch devices get the same wave driven by scroll instead. */
function kinetic() {
  const root = document.querySelector<HTMLElement>('[data-kinetic]');
  if (!root || reduce()) return;
  const chars = [...root.querySelectorAll<HTMLElement>('.ch')];
  if (!chars.length) return;

  const W0 = 800, W1 = 900, X0 = 100, X1 = 118;
  const s = chars.map((el) => ({ el, w: W0, x: X0, cx: 0, cy: 0 }));
  const hero = (root.closest('[data-hero]') as HTMLElement) ?? root;
  const fine = finePointer();
  let px = -1e4, py = -1e4, raf = 0, last = 0, R = 300;

  const measure = () => {
    R = Math.max(180, root.getBoundingClientRect().width * 0.2);
    s.forEach((c) => {
      const r = c.el.getBoundingClientRect();
      c.cx = r.left + r.width / 2;
      c.cy = r.top + r.height / 2;
    });
  };
  const paint = (c: (typeof s)[number], w: number, x: number) => {
    c.w = w; c.x = x;
    c.el.style.setProperty('--w', w.toFixed(1));
    c.el.style.setProperty('--x', x.toFixed(1));
  };

  const frame = (now: number) => {
    const k = 1 - Math.pow(1 - 0.16, Math.min(3, (now - (last || now)) / 16.7));
    last = now;
    let moving = false;
    for (const c of s) {
      const dx = px - c.cx, dy = (py - c.cy) * 0.7;
      const f = Math.exp(-((dx * dx + dy * dy) / (R * R)));
      const tw = W0 + (W1 - W0) * f, tx = X0 + (X1 - X0) * f;
      const nw = c.w + (tw - c.w) * k, nx = c.x + (tx - c.x) * k;
      if (Math.abs(tw - nw) > 0.25 || Math.abs(tx - nx) > 0.06) moving = true;
      paint(c, nw, nx);
    }
    raf = moving ? requestAnimationFrame(frame) : 0;
    if (!moving) last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const start = () => {
    measure();
    if (fine) {
      hero.addEventListener('pointermove', (e) => {
        px = e.clientX; py = e.clientY;
        kick();
      });
      hero.addEventListener('pointerleave', () => { px = py = -1e4; kick(); });
      addEventListener('scroll', () => { measure(); }, { passive: true });
    } else {
      let ticking = false;
      const sweep = () => {
        ticking = false;
        const p = clamp(scrollY / (hero.offsetHeight * 0.85));
        const centre = p * 1.5 - 0.25;
        s.forEach((c, i) => {
          const phase = i / (s.length - 1);
          const f = Math.exp(-(((phase - centre) / 0.22) ** 2));
          paint(c, W0 + (W1 - W0) * f, X0 + (X1 - X0) * f);
        });
      };
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
    }
    addEventListener('resize', measure);
  };

  // Wait for the entrance animation and the font before measuring letter centres.
  const ready = (document.fonts?.ready ?? Promise.resolve()) as Promise<unknown>;
  ready.then(() => setTimeout(start, 1700));
}
