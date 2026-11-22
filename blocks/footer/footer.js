import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Forrester footer — template-slotted rebuild of the approved prototype footer.
 * /footer document: section 1 = logo, "Ask AI" line + AI prompt links (icon + label);
 * section 2 = footer menu list; section 3 = mobile CTA (italic link); section 4 = copyright
 * line, legal list (a plain-text item becomes the cookie-settings button), social list.
 * Authored nodes are moved into the slots, never rebuilt.
 */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function stripInstrumentation(root) {
  const attrs = ['data-prose-index', 'data-image-index', 'data-block-index'];
  [root, ...root.querySelectorAll('*')].forEach((node) => {
    attrs.forEach((a) => node.removeAttribute(a));
  });
  return root;
}

/** icon links: the label text moves into an sr-only span beside the icon */
function decorateIconLinks(ul) {
  ul.querySelectorAll('a').forEach((a) => {
    const icon = a.querySelector('.icon');
    const label = el('span', 'sr-only');
    label.append(...[...a.childNodes].filter((n) => n !== icon));
    a.prepend(label);
    if (icon) a.append(icon);
    // small icons: eager, so they are painted with the footer
    a.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
  });
}

function decorateLogo(logoP) {
  const img = logoP?.querySelector('img');
  if (!img) return null;
  if (!img.alt && img.dataset.iconName) {
    img.alt = img.dataset.iconName.split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  img.width = 257;
  img.height = 41;
  logoP.className = 'site-footer-logo';
  return logoP;
}

function row(...classes) {
  return el('div', ['l-row', ...classes].join(' '));
}

function col(...classes) {
  return el('div', ['l-col', ...classes].join(' '));
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const sections = [...fragment.querySelectorAll(':scope > .section')];
  const [introSection, menuSection, ctaSection, colophonSection] = sections;
  const footer = el('div', 'site-footer');

  // mobile logo + AI prompts
  const introParas = introSection ? [...introSection.querySelectorAll('p')] : [];
  const logoP = introParas.find((p) => p.querySelector('img'));
  const logo = decorateLogo(logoP);
  if (logo) {
    const mobileLogo = el('div', 'l-container site-footer-mobile-logo');
    const r = row('l-row-justify-center');
    const c = col('l-col-10');
    c.append(logo);
    r.append(c);
    mobileLogo.append(r);
    footer.append(mobileLogo);
  }
  const askP = introParas.find((p) => p !== logoP);
  const aiList = introSection?.querySelector('ul');
  if (askP || aiList) {
    const container = el('div', 'l-container');
    const r = row('l-row-justify-center', 'l-row-center');
    const c = col('l-col-12', 'ai-prompts');
    if (askP) c.append(askP);
    if (aiList) {
      aiList.className = 'social social-ai';
      decorateIconLinks(aiList);
      c.append(aiList);
    }
    r.append(c);
    container.append(r);
    footer.append(container);
  }

  // footer menu
  const menu = menuSection?.querySelector('ul');
  if (menu) {
    menu.className = 'footer-menu l-row';
    const container = el('div', 'l-container');
    container.append(menu);
    footer.append(container);
  }

  // mobile CTA
  const cta = ctaSection?.querySelector('a');
  if (cta) {
    const container = el('div', 'l-container site-footer-become-client');
    const mark = cta.closest('p');
    cta.className = 'cta cta-secondary cta-white';
    container.append(cta);
    if (mark) mark.remove();
    footer.append(container);
  }

  // colophon
  const colophon = el('div', 'l-container colophon');
  if (logo) {
    const logoRow = row('colophon-logo-row');
    const c = col('l-col-lg-3');
    c.append(stripInstrumentation(logo.cloneNode(true)));
    logoRow.append(c);
    colophon.append(logoRow);
  }
  const sub = row('colophon-subfooter');
  const copyright = colophonSection?.querySelector('p');
  if (copyright) {
    const c = col('l-col-12', 'colophon-copyright');
    c.append(copyright);
    sub.append(c);
  }
  const util = col('l-col-12', 'colophon-util');
  const lists = colophonSection ? [...colophonSection.querySelectorAll('ul')] : [];
  const social = lists.find((ul) => ul.querySelector('.icon'));
  const legal = lists.find((ul) => ul !== social);
  if (legal) {
    legal.className = 'colophon-links';
    legal.querySelectorAll(':scope > li').forEach((li) => {
      if (li.querySelector('a')) return;
      const button = el('button', 'colophon-cookie');
      button.type = 'button';
      const p = li.querySelector('p');
      button.append(...(p || li).childNodes);
      if (p) p.remove();
      li.append(button);
    });
    util.append(legal);
  }
  if (social) {
    social.className = 'social colophon-social';
    decorateIconLinks(social);
    util.append(social);
  }
  sub.append(util);
  colophon.append(sub);
  footer.append(colophon);

  block.textContent = '';
  block.append(footer);
}
