const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const FRAME_COUNT = 160;
const set = matchMedia('(max-width: 767px) and (orientation: portrait)').matches ? 'm' : 'd';
const frameSrc = (i) => `frames/pfingstrose/${set}/${String(i + 1).padStart(3, '0')}.webp`;

const chapters = [
  { from: 0.08, to: 0.24, dark: true, topic: 'Rasen', title: 'Alles beginnt im Boden.',
    text: 'Bevor oben etwas wächst, muss unten alles stimmen: lockere Erde, Licht und die richtige Startdüngung.' },
  { from: 0.30, to: 0.48, topic: 'Baum', title: 'Richtig pflanzen.',
    text: 'Standort, Abstand, Pflanzzeit: Wer beim Pflanzen sorgfältig ist, spart sich später viel Arbeit.' },
  { from: 0.54, to: 0.72, topic: 'Pflanzenschutz', title: 'Gesund halten.',
    text: 'Genau hinsehen statt vorschnell spritzen. Schädlinge und Krankheiten früh erkennen und gezielt handeln.' },
  { from: 0.80, to: 0.97, topic: 'Saison', title: 'Im Rhythmus der Jahreszeiten.',
    text: 'Jeder Monat stellt andere Fragen. Wir begleiten Ihren Garten vom ersten Austrieb bis zur Winterruhe.' },
];

$('.chapters').innerHTML = chapters.map((c, i) => `
  <article class="chapter${c.dark ? ' dark' : ''}${i % 2 ? ' right' : ''}" aria-hidden="true">
    <span class="num">KAPITEL 0${i + 1}</span>
    <h2>${c.title}</h2>
    <p>${c.text}</p>
    <a href="#ratgeber" data-topic="${c.topic}" tabindex="-1">Ratgeber zum Thema ${c.topic}</a>
  </article>`).join('');
$('.rail').innerHTML = chapters.map((c, i) =>
  `<li><button data-chapter="${i}" aria-label="Kapitel ${i + 1}: ${c.title}">0${i + 1}</button></li>`).join('');

/* --- Mobiles Menue --- */
const burger = $('.burger');
const mobileMenu = $('#mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) burger.click(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileMenu.hidden) burger.click(); });

/* --- Bildsequenz: grob nach fein laden, immer das naechste geladene Bild zeichnen --- */
const canvas = $('.film-canvas');
const ctx = canvas.getContext('2d');
const poster = $('.film-poster');
poster.src = frameSrc(0);
const frames = new Array(FRAME_COUNT);
let current = 0;

const order = [];
for (const step of [24, 12, 6, 3, 1]) {
  for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i);
}
if (!order.includes(FRAME_COUNT - 1)) order.splice(1, 0, FRAME_COUNT - 1);

let next = 0;
function loadMore() {
  if (next >= order.length) return;
  const i = order[next++];
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    frames[i] = img;
    if (Math.abs(i - current) < 4) draw(current);
    loadMore();
  };
  img.onerror = loadMore;
  img.src = frameSrc(i);
}
for (let k = 0; k < 6; k++) loadMore();

function nearestLoaded(i) {
  for (let d = 0; d < FRAME_COUNT; d++) {
    if (frames[i - d]) return frames[i - d];
    if (frames[i + d]) return frames[i + d];
  }
  return null;
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvas.clientWidth * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);
  draw(current);
}

function draw(i) {
  const img = nearestLoaded(i);
  if (!img) return;
  const cw = canvas.width, ch = canvas.height;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  poster.classList.add('hidden');
}

addEventListener('resize', resize);
resize();

/* --- Scroll-Steuerung --- */
const film = $('.film');
const sticky = $('.film-sticky');
const clamp01 = (v) => Math.min(1, Math.max(0, v));
let activeChapter = -1;

function update(progress) {
  sticky.style.setProperty('--intro', clamp01(1 - progress / 0.06));
  sticky.style.setProperty('--shade', 1 - 0.6 * clamp01((progress - 0.22) / 0.12));
  sticky.style.setProperty('--fade', clamp01((progress - 0.9) / 0.1));

  const idx = chapters.findIndex((c) => progress >= c.from && progress <= c.to);
  if (idx !== activeChapter) {
    activeChapter = idx;
    $$('.chapter').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      el.setAttribute('aria-hidden', i !== idx);
      el.querySelector('a').tabIndex = i === idx ? 0 : -1;
    });
    $$('.rail button').forEach((b, i) => {
      if (i === idx) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }
}

const state = { f: 0 };
function boot() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(state, {
      f: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: film, start: 'top top', end: 'bottom bottom', scrub: 0.5,
        onUpdate: (self) => update(self.progress),
      },
      onUpdate: () => {
        const i = Math.round(state.f);
        if (i !== current) { current = i; draw(i); }
      },
    });
    update(tween.scrollTrigger.progress);
  } else {
    const onScroll = () => {
      const r = film.getBoundingClientRect();
      const p = clamp01(-r.top / (r.height - innerHeight));
      current = Math.round(p * (FRAME_COUNT - 1));
      draw(current);
      update(p);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
if (document.readyState === 'complete') boot(); else addEventListener('load', boot);

$$('.rail button').forEach((b) => b.addEventListener('click', () => {
  const c = chapters[Number(b.dataset.chapter)];
  const mid = (c.from + c.to) / 2;
  scrollTo({ top: film.offsetTop + (film.offsetHeight - innerHeight) * mid, behavior: 'smooth' });
}));

/* --- Ratgeber-Bibliothek --- */
let posts = [];
let activeTopic = 'Alle';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let filterRun = 0;

function filter(topic) {
  const next = posts.some((p) => p.category === topic) ? topic : 'Alle';
  const changed = next !== activeTopic;
  activeTopic = next;
  $$('.filters button').forEach((b) => b.setAttribute('aria-pressed', b.textContent === activeTopic));
  if (changed && window.gsap && !reduceMotion && $$('.article-card').length) animateFilter();
  else render();
}

// FLIP: alte Positionen merken, Wegfallende ausblenden, neu rendern, Bleibende vom alten Platz gleiten lassen.
function animateFilter() {
  const run = ++filterRun;
  const grid = $('.articles');
  const old = new Map($$('.article-card').map((el) => [el.dataset.slug, el.getBoundingClientRect()]));
  const keep = new Set(posts.filter((p) => activeTopic === 'Alle' || p.category === activeTopic).map((p) => p.slug));
  const leaving = $$('.article-card').filter((el) => !keep.has(el.dataset.slug));

  gsap.killTweensOf('.article-card');
  grid.classList.add('animating');
  gsap.delayedCall(1.2, () => { if (run === filterRun) grid.classList.remove('animating'); });
  grid.style.minHeight = grid.offsetHeight + 'px';
  gsap.to(leaving, {
    opacity: 0, scale: 0.96, duration: leaving.length ? 0.18 : 0, ease: 'power1.in',
    onComplete: () => {
      if (run !== filterRun) return;
      render();
      grid.style.minHeight = '';
      let n = 0;
      $$('.article-card').forEach((el) => {
        const before = old.get(el.dataset.slug);
        if (before) {
          const now = el.getBoundingClientRect();
          gsap.from(el, { x: before.left - now.left, y: before.top - now.top, duration: 0.5, ease: 'power3.out', clearProps: 'transform' });
        } else {
          gsap.from(el, { opacity: 0, y: 18, scale: 0.97, duration: 0.45, ease: 'power3.out', delay: 0.04 * n++, clearProps: 'opacity,transform' });
        }
      });
    },
  });
}

function render() {
  const list = posts.filter((p) => activeTopic === 'Alle' || p.category === activeTopic);
  $('.articles').innerHTML = list.map((p) => `
    <button class="article-card" data-slug="${esc(p.slug)}">
      <span class="meta"><span>${esc(p.category)}</span><span>${p.readingMinutes} Min. Lesezeit</span></span>
      <h3>${esc(p.h1)}</h3>
      <p>${esc(p.lead)}</p>
      <span class="read">Ratgeber lesen</span>
    </button>`).join('');
  $('.article-count').textContent = `${list.length} Ratgeber ${activeTopic === 'Alle' ? 'für Ihr Gartenjahr' : 'zum Thema ' + activeTopic}`;
  $$('[data-slug]').forEach((b) => b.addEventListener('click', () => openArticle(b.dataset.slug)));
}

const dialog = $('#reader');
let priorFocus;
function openArticle(slug) {
  const p = posts.find((x) => x.slug === slug);
  if (!p) return;
  priorFocus = document.activeElement;
  $('.reader-content').innerHTML = `
    <span class="eyebrow">${esc(p.category)} · ${p.readingMinutes} Minuten</span>
    <h2>${esc(p.h1)}</h2>
    <p>${esc(p.lead)}</p>
    <h3>Das Wichtigste auf einen Blick</h3>
    <ul>${p.summary.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    ${p.sections.map((s) => `
      <section>
        <h3>${esc(s.heading)}</h3>
        ${(s.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('')}
        ${s.list ? `<ul>${s.list.map((t) => `<li>${typeof t === 'string' ? esc(t) : `<strong>${esc(t.title)}</strong> ${esc(t.text)}`}</li>`).join('')}</ul>` : ''}
      </section>`).join('')}
    ${p.faq?.length ? `<h3>Häufige Fragen</h3>${p.faq.map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}` : ''}
    ${p.disclaimer ? `<p><small>${esc(p.disclaimer)}</small></p>` : ''}
    <a class="source-link" href="../ratgeber/${encodeURIComponent(p.slug)}">Ganzen Ratgeber öffnen</a>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('reading');
}
$('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.classList.remove('reading'); priorFocus?.focus(); });
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

$('.articles').insertAdjacentHTML('beforebegin', '<p class="article-count" aria-live="polite"></p>');
$$('[data-topic]').forEach((a) => a.addEventListener('click', () => filter(a.dataset.topic)));

fetch('assets/articles.json')
  .then((r) => { if (!r.ok) throw new Error('load'); return r.json(); })
  .then((data) => {
    posts = data;
    $('.filters').innerHTML = ['Alle', ...new Set(posts.map((p) => p.category))]
      .map((t) => `<button aria-pressed="${t === activeTopic}">${esc(t)}</button>`).join('');
    $$('.filters button').forEach((b) => b.addEventListener('click', () => filter(b.textContent)));
    filter(activeTopic);
  })
  .catch(() => {
    $('.articles').innerHTML = '<p>Die Ratgeber konnten nicht geladen werden. <a href="../ratgeber">Zur Ratgeber-Übersicht</a></p>';
  });
