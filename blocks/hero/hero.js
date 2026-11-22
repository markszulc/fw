/**
 * hero — breadcrumb strip + banner (source core-banner). Decode tier: template-slotted.
 * Roles: paragraphs before the h1 = breadcrumb; the picture = banner media; h1 = title;
 * copy paragraphs; link-only paragraphs = CTAs. Authored nodes are moved, never rebuilt.
 */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .hero-content')) return; // re-entrant (EW9)
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  const h1 = block.querySelector('h1');
  const crumbs = el('div', 'breadcrumbs');
  const crumbsInner = el('div', 'l-container');
  crumbs.append(crumbsInner);
  const media = el('div', 'hero-media');
  const mediaInner = el('div', 'hero-img');
  media.append(mediaInner);
  const content = el('div', 'hero-content');
  const container = el('div', 'l-container');
  const inner = el('div', 'hero-inner');
  container.append(inner);
  content.append(container);
  const copy = el('div', 'hero-copy');
  const ctas = el('div', 'cta-group');
  const ctaRow = el('div', 'cta-group-row');
  ctas.append(ctaRow);

  let beforeTitle = true;
  nodes.forEach((node) => {
    const pic = node.matches('picture') ? node : node.querySelector('picture');
    if (pic && !node.textContent.trim()) {
      const img = pic.querySelector('img');
      if (img) {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      }
      mediaInner.append(pic);
      if (node !== pic) node.remove();
    } else if (node === h1) {
      inner.append(h1);
      beforeTitle = false;
    } else if (beforeTitle) {
      crumbsInner.append(node);
    } else if (node.classList.contains('button-wrapper')) {
      ctaRow.append(node);
    } else {
      copy.append(node);
    }
  });
  if (copy.children.length) inner.append(copy);
  if (ctaRow.children.length) inner.append(ctas);
  block.replaceChildren(crumbs, media, content);
}
