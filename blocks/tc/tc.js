/**
 * tc — the source's two-column module (page-block--two_columns / two_col_stacked), one band.
 * Decode tier: reconstructive. Each authored row is a grid row, each cell a column; a cell is
 * classified by its content (image-only, quote, text). Variants: gray, light (first row = the
 * background image), eyebrow (first row = the section tab heading), tight, narrow, lead,
 * divider, center, tp-double. Authored nodes are moved into wrappers, never rebuilt.
 */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function isImageOnly(cell) {
  const kids = [...cell.children];
  return kids.length > 0 && kids.every((k) => (k.matches('picture, img')
    || k.querySelector('picture, img')) && !k.textContent.trim());
}

function isQuote(cell) {
  const ps = cell.querySelectorAll(':scope > p');
  if (ps.length !== 2) return false;
  return /^\s*[—–-]/.test(ps[1].textContent);
}

function isCta(node) {
  if (node.tagName !== 'P') return false;
  const links = node.querySelectorAll('a');
  return links.length === 1 && node.textContent.trim() === links[0].textContent.trim();
}

/** moves a cell's authored children into the module's slots */
function fillColumn(col, cell, { lead, full }) {
  let body = null;
  let ctas = null;
  [...cell.children].forEach((child) => {
    // a column heading (h3, or the full-row h2) heads the column; other h2s are body prose
    if (/^H[1-6]$/.test(child.tagName) && (full || child.tagName !== 'H2')) {
      col.append(child);
      body = null;
    } else if (isCta(child)) {
      if (!ctas) {
        ctas = el('div', 'cta-group');
        const row = el('div', 'cta-group-row');
        ctas.append(row);
        col.append(ctas);
      }
      const wrap = child.classList.contains('button-wrapper') ? 'cta-button' : 'cta-tertiary-wrap';
      const slot = el('div', wrap);
      slot.append(child);
      ctas.firstElementChild.append(slot);
    } else {
      if (!body) {
        body = el('div', lead ? 'tc-body tc-body-lead' : 'tc-body');
        col.append(body);
      }
      body.append(child);
    }
  });
}

function buildQuote(col, cell) {
  const [text, cite] = cell.querySelectorAll(':scope > p');
  const quote = el('blockquote', 'quote');
  const bodySlot = el('div', 'quote-body');
  const citeSlot = el('div', 'quote-cite');
  bodySlot.append(text);
  citeSlot.append(cite);
  quote.append(bodySlot, citeSlot);
  col.append(quote);
}

/** source .js-scroll-fx: .in-view while the box meets the viewport (scroll + resize) */
function observeScrollFx(node) {
  const check = () => {
    const r = node.getBoundingClientRect();
    node.classList.toggle('in-view', r.bottom >= 0 && r.top <= window.innerHeight);
  };
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  requestAnimationFrame(check);
}

export default function decorate(block) {
  if (block.querySelector(':scope > .l-container')) return; // re-entrant (EW9)
  const has = (c) => block.classList.contains(c);
  let rows = [...block.children];

  const front = [];
  if (has('light') && rows.length && isImageOnly(rows[0].firstElementChild || rows[0])) {
    const bg = el('div', 'tc-bg');
    bg.append(...rows[0].firstElementChild.children);
    front.push(bg);
    rows[0].remove();
    rows = rows.slice(1);
  }
  if (has('eyebrow') && rows.length) {
    const heading = rows[0].querySelector('h1, h2, h3, h4');
    if (heading) {
      const tab = el('div', 'eyebrow-tab');
      const label = el('span');
      label.append(...heading.childNodes);
      heading.append(label);
      tab.append(heading);
      front.push(tab);
      rows[0].remove();
      rows = rows.slice(1);
    }
  }

  const container = el('div', 'l-container');
  const align = has('center') ? 'l-row-center' : 'l-row-start';
  rows.forEach((row, ri) => {
    const cells = [...row.children];
    const gridRow = el('div', `l-row ${align}`);
    if (ri === 0) gridRow.classList.add('tc-row-first');
    if (ri === rows.length - 1) gridRow.classList.add('tc-row-last');
    const divider = has('divider') && cells.length === 2;
    if (divider) gridRow.classList.add('l-row-divider');

    cells.forEach((cell, ci) => {
      const col = el('div', `tc-col tc-col-${ci + 1} l-col`);
      if (isImageOnly(cell)) {
        col.classList.add('tc-image', 'l-col-md-6', 'l-order-first', 'js-scroll-fx');
        col.append(...cell.children);
        col.querySelectorAll('img').forEach((img) => { img.loading = 'lazy'; });
        observeScrollFx(col);
      } else if (isQuote(cell)) {
        col.classList.add(cells.length === 3 ? 'l-col-md-4' : 'l-col-md-6');
        buildQuote(col, cell);
      } else if (cells.length === 1) {
        col.classList.add('tc-full', 'l-col-md-12');
        const fw = el('div', 'tc-fwrow l-row');
        if (ri === 0 && has('tight')) fw.classList.add('tc-fwrow-mb0');
        const inner = el('div', `l-col ${has('narrow') ? 'l-col-md-9' : 'l-col-md-11'}`);
        fillColumn(inner, cell, { lead: has('lead'), full: true });
        fw.append(inner);
        col.append(fw);
      } else {
        let width = cells.length === 3 ? 'l-col-md-4' : 'l-col-md-6';
        if (divider) width = ci === 0 ? 'l-col-md-8' : 'l-col-md-4';
        col.classList.add(width);
        fillColumn(col, cell, { lead: has('lead') || (divider && ci === 1) });
      }
      gridRow.append(col);
    });
    container.append(gridRow);
  });

  block.replaceChildren(...front, container);
}
