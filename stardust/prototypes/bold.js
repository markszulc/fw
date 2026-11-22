/* Minimal behaviour mirrored from the source's core.min.js:
   - header .is-scrolled when scrollTop > 100
   - header search open/clear state
   - mobile drawer sub-menu expand (.is-open toggle)
   - .js-scroll-fx gets .in-view while its box meets the viewport
   - image carousel: slick model (infinite, 1 per view, speed 300ms ease, variableWidth >= 768px) */
(() => {
  const header = document.querySelector('.js-site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 100);
    document.querySelectorAll('.js-scroll-fx').forEach((el) => {
      const r = el.getBoundingClientRect();
      el.classList.toggle('in-view', r.bottom >= 0 && r.top <= window.innerHeight);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  document.querySelectorAll('.js-header-search-input').forEach((input) => {
    const form = input.closest('.js-header-search');
    input.addEventListener('focus', () => form.classList.add('is-open'));
    input.addEventListener('blur', () => form.classList.remove('is-open'));
    const clear = form.querySelector('.js-header-search-clear');
    if (clear) clear.addEventListener('click', (e) => { e.preventDefault(); input.value = ''; });
  });

  document.querySelectorAll('.drawer-menu .nav-expand').forEach((toggle) => {
    const li = toggle.parentElement;
    const sub = toggle.nextElementSibling;
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = li.classList.toggle('is-open');
      if (sub) sub.style.display = open ? 'block' : 'none';
    });
    const link = li.querySelector(':scope > a[href="#"]');
    if (link) link.addEventListener('click', (e) => { e.preventDefault(); toggle.click(); });
  });

  document.querySelectorAll('.js-carousel').forEach((root) => {
    const list = root.querySelector('.carousel__list');
    const track = root.querySelector('.carousel__track');
    const slides = [...track.querySelectorAll('.carousel__slide')];
    const real = slides.filter((s) => s.dataset.index !== undefined);
    const n = real.length;
    const first = slides.indexOf(real[0]);
    const dots = [...root.querySelectorAll('.carousel__dots li')];
    const pos = root.querySelector('.js-carousel-position');
    let current = 0;
    let busy = false;
    const variable = () => window.matchMedia('(min-width: 768px)').matches;
    const offsetOf = (i) => -slides[first + i].offsetLeft;
    const place = (i, animate) => {
      track.style.transition = animate ? 'transform 300ms ease' : 'none';
      track.style.transform = `translate3d(${offsetOf(i)}px, 0, 0)`;
    };
    const size = () => {
      slides.forEach((s) => { s.style.width = variable() ? '' : `${list.clientWidth}px`; });
      place(current, false);
    };
    const mark = () => {
      real.forEach((s, k) => s.classList.toggle('slick-current', k === current));
      dots.forEach((d, k) => d.classList.toggle('slick-active', k === current));
      if (pos) pos.textContent = String(current + 1);
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
    root.querySelector('.carousel__arrow--next').addEventListener('click', () => go(current + 1));
    root.querySelector('.carousel__arrow--prev').addEventListener('click', () => go(current - 1));
    dots.forEach((d, k) => d.querySelector('button').addEventListener('click', () => go(k)));
    window.addEventListener('resize', size);
    size();
  });
})();
