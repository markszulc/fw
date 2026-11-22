/**
 * carousel — the source's image carousel (slick model: infinite, one per view, 300ms ease,
 * variable width >= 768px). Decode tier: reconstructive — every row holding a picture is a
 * slide. Looping clones are presentational (EW4: instrumentation stripped).
 * @ew-exempt Arrow labels, dot labels and the counter are UI chrome, not authored text.
 */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function stripInstrumentation(root) {
  const attrs = ['data-prose-index', 'data-image-index', 'data-block-index'];
  [root, ...root.querySelectorAll('*')].forEach((n) => attrs.forEach((a) => n.removeAttribute(a)));
  return root;
}

function slide(picture, clone) {
  const s = el('div', clone ? 'carousel-slide carousel-slide-clone' : 'carousel-slide');
  const frame = el('div', 'carousel-frame');
  frame.append(picture);
  s.append(frame);
  if (clone) s.setAttribute('aria-hidden', 'true');
  return s;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .carousel-wrap')) return; // re-entrant (EW9)
  const pictures = [...block.querySelectorAll('picture')];
  if (!pictures.length) return;
  pictures.forEach((p) => p.querySelector('img')?.setAttribute('loading', 'eager'));
  const n = pictures.length;
  const cloneOf = (p) => stripInstrumentation(p.cloneNode(true));

  const track = el('div', 'carousel-track');
  const real = pictures.map((p, i) => {
    const s = slide(p, false);
    s.dataset.index = i;
    return s;
  });
  track.append(slide(cloneOf(pictures[n - 1]), true), ...real,
    ...pictures.map((p) => slide(cloneOf(p), true)));
  const list = el('div', 'carousel-list');
  list.append(track);

  const prev = el('span', 'carousel-arrow carousel-arrow-prev', 'Previous');
  const next = el('span', 'carousel-arrow carousel-arrow-next', 'Next');
  [prev, next].forEach((a) => {
    a.setAttribute('role', 'button');
    a.tabIndex = 0;
  });
  const dotsList = el('ul', 'carousel-dots');
  const dots = real.map((_, i) => {
    const li = el('li');
    const b = el('button', '', String(i + 1));
    b.type = 'button';
    b.setAttribute('aria-label', `${i + 1} of ${n}`);
    li.append(b);
    dotsList.append(li);
    return li;
  });
  const slider = el('div', 'carousel-slider');
  slider.append(prev, list, next, dotsList);
  const count = el('div', 'carousel-count');
  const pos = el('strong', '', '1');
  count.append(pos, '/', el('strong', '', String(n)));
  const wrap = el('div', 'carousel-wrap l-container');
  wrap.append(slider, count);
  block.replaceChildren(wrap);

  const slides = [...track.children];
  const first = 1;
  let current = 0;
  let busy = false;
  const variable = () => window.matchMedia('(width >= 768px)').matches;
  const place = (i, animate) => {
    track.style.transition = animate ? 'transform 300ms ease' : 'none';
    track.style.transform = `translate3d(${-slides[first + i].offsetLeft}px, 0, 0)`;
  };
  const size = () => {
    slides.forEach((s) => {
      s.style.width = variable() ? '' : `${list.clientWidth}px`;
    });
    place(current, false);
  };
  const mark = () => {
    real.forEach((s, k) => s.classList.toggle('slick-current', k === current));
    dots.forEach((d, k) => d.classList.toggle('slick-active', k === current));
    pos.textContent = String(current + 1);
  };
  const go = (target) => {
    if (busy || target === current) return;
    busy = true;
    place(target, true);
    setTimeout(() => {
      current = ((target % n) + n) % n;
      if (current !== target) place(current, false);
      mark();
      busy = false;
    }, 300);
  };
  next.addEventListener('click', () => go(current + 1));
  prev.addEventListener('click', () => go(current - 1));
  dots.forEach((d, k) => d.querySelector('button').addEventListener('click', () => go(k)));
  window.addEventListener('resize', size);
  mark();
  size();
  real[0].querySelector('img')?.addEventListener('load', size);
}
