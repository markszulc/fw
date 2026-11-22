import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Forrester header — template-slotted rebuild of the approved prototype chrome.
 * /nav document: section 1 = brand (logo link), section 2 = the nav list (nested lists:
 * top item = trigger text, a "Column …" item level = mega-menu column, plain-text items =
 * group labels, italic links = secondary items), section 3 = tools (search link to the
 * search endpoint, Log In, Talk To Sales).
 * Behaviour (stardust/chrome/header-contract.json): hover mega menus >= 1200px, drawer below
 * with per-item expanders, search field that opens on focus, 90 -> 60px once scrolled past 100px.
 * @ew-exempt Mega-menu column labels ("Column 1/2") are structural markers, hidden as on source.
 */

const SCROLL_THRESHOLD = 100;
const SITE_HOSTS = ['www.forrester.com', 'forrester.com'];

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** strips Experience Workspace instrumentation from a presentational clone (EW4) */
function stripInstrumentation(root) {
  const attrs = ['data-prose-index', 'data-image-index', 'data-block-index'];
  [root, ...root.querySelectorAll('*')].forEach((node) => {
    attrs.forEach((a) => node.removeAttribute(a));
  });
  return root;
}

function isExternal(href) {
  if (!href || href.startsWith('#')) return false;
  try {
    const url = new URL(href, window.location.href);
    if (url.hostname === window.location.hostname) return false;
    return !SITE_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Normalises one authored list item: unwraps the pipeline's <p> and the italic marker,
 * and moves a plain-text label into an <a href="#"> (the source's non-navigating trigger).
 */
function normalizeItem(li) {
  [...li.children].forEach((child) => {
    if (child.tagName === 'P') child.replaceWith(...child.childNodes);
  });
  let secondary = false;
  li.querySelectorAll(':scope > em, :scope > strong').forEach((mark) => {
    if (mark.tagName === 'EM') secondary = true;
    mark.replaceWith(...mark.childNodes);
  });
  const sub = li.querySelector(':scope > ul');
  let link = li.querySelector(':scope > a');
  if (!link) {
    link = el('a', '', { href: '#' });
    const label = [...li.childNodes].filter((n) => n !== sub);
    link.append(...label);
    li.prepend(link);
  }
  return { link, sub, secondary };
}

function hasPlainChild(ul) {
  return [...ul.children].some((li) => !li.classList.contains('mega-item-secondary'));
}

function decorateList(ul, listClass) {
  ul.className = listClass;
  const items = [...ul.children];
  items.forEach((li, i) => {
    const { link, sub, secondary } = normalizeItem(li);
    li.className = 'mega-item';
    if (link.getAttribute('href') === '#') li.classList.add('mega-item-label');
    if (secondary) li.classList.add('mega-item-secondary');
    if (isExternal(link.getAttribute('href'))) li.classList.add('mega-item-ext');
    if (sub) {
      li.classList.add('has-children');
      decorateList(sub, 'mega-list');
    }
    const prevSub = i > 0 ? items[i - 1].querySelector(':scope > ul') : null;
    if (prevSub && hasPlainChild(prevSub)) li.classList.add('mega-item-pad-top');
  });
}

/** a mega-menu column marker: an item whose own label (nested lists excluded) reads "Column …" */
function isColumn(li) {
  const label = [...li.childNodes].filter((n) => n.nodeName !== 'UL')
    .map((n) => n.textContent).join('');
  return /^\s*column\b/i.test(label);
}

function decorateMenu(ul) {
  ul.className = 'site-nav-menu';
  [...ul.children].forEach((li) => {
    const { link, sub } = normalizeItem(li);
    li.className = 'site-nav-item';
    link.className = 'site-nav-trigger';
    if (!sub) return;
    li.classList.add('has-children');
    const cols = [...sub.children];
    const twoCol = cols.length > 0 && cols.every(isColumn);
    if (twoCol) {
      li.classList.add('site-nav-item-two-col');
      sub.className = 'mega mega-two-col';
      cols.forEach((col, i) => {
        const parts = normalizeItem(col);
        col.className = i > 0 ? 'mega-col mega-col-border' : 'mega-col';
        parts.link.className = 'mega-col-label';
        if (parts.sub) decorateList(parts.sub, 'mega-list');
      });
    } else {
      li.classList.add('site-nav-item-one-col');
      decorateList(sub, 'mega mega-one-col');
    }
  });
  return ul;
}

function buildSearch(link, id) {
  const form = el('form', 'header-search', { action: link.href });
  const label = el('label', 'sr-only', { for: id });
  label.append(...link.childNodes);
  const input = el('input', 'header-search-input', { id, type: 'search', name: 'q' });
  const clear = el('span', 'header-search-clear');
  form.append(label, input, clear);
  return form;
}

function wireSearch(form) {
  const input = form.querySelector('.header-search-input');
  input.addEventListener('focus', () => form.classList.add('is-open'));
  input.addEventListener('blur', () => form.classList.remove('is-open'));
  form.querySelector('.header-search-clear').addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
  });
}

function buildDrawerMenu(menu) {
  const drawerMenu = stripInstrumentation(menu.cloneNode(true));
  drawerMenu.className = 'drawer-menu';
  drawerMenu.querySelectorAll('li.has-children').forEach((li) => {
    const link = li.querySelector(':scope > a');
    const sub = li.querySelector(':scope > ul');
    const toggle = el('span', 'nav-expand', { 'aria-hidden': 'true' });
    link.after(toggle);
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = li.classList.toggle('is-open');
      if (sub) sub.style.display = open ? 'block' : 'none';
    });
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        toggle.click();
      });
    }
  });
  return drawerMenu;
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const sections = [...fragment.querySelectorAll(':scope > .section')];
  const [brandSection, navSection, toolsSection] = sections;

  // brand
  const brand = el('div', 'site-header-brand');
  const brandLink = brandSection?.querySelector('a');
  if (brandLink) {
    brandLink.className = '';
    const logo = brandLink.querySelector('img');
    if (logo) {
      logo.className = 'site-header-logo';
      if (!logo.alt && logo.dataset.iconName) {
        logo.alt = logo.dataset.iconName.split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      logo.width = 180;
      logo.height = 30;
      logo.loading = 'eager';
    }
    brand.append(brandLink);
  }

  // desktop nav
  const nav = el('nav', 'site-nav', { 'aria-label': 'Main' });
  const menuList = navSection?.querySelector('ul');
  const menu = menuList ? decorateMenu(menuList) : el('ul', 'site-nav-menu');
  nav.append(menu);

  const right = el('div', 'site-nav-right');
  const toolLinks = toolsSection ? [...toolsSection.querySelectorAll('a')] : [];
  let searchLink;
  let loginLink;
  let ctaLink;
  toolLinks.forEach((a) => {
    const wrapper = a.closest('p');
    if (wrapper) wrapper.className = '';
    a.className = '';
    if (/search/i.test(a.getAttribute('href'))) searchLink = a;
    else if (!loginLink) loginLink = a;
    else if (!ctaLink) ctaLink = a;
  });
  // unwrap emphasis around tool links (author may format the CTA)
  toolLinks.forEach((a) => {
    const mark = a.closest('strong, em');
    if (mark && toolsSection.contains(mark)) mark.replaceWith(...mark.childNodes);
  });

  let desktopSearch;
  if (searchLink) {
    desktopSearch = buildSearch(searchLink, 'header-search-desktop');
    right.append(desktopSearch);
  }
  if (loginLink) {
    loginLink.className = 'site-nav-login';
    right.append(loginLink);
  }
  if (ctaLink) {
    ctaLink.className = 'site-nav-button';
    right.append(ctaLink);
  }
  nav.append(right);

  // mobile: checkbox-driven drawer, as the source
  const mobile = el('div', 'header-mobile');
  const checkbox = el('input', 'header-mobile-checkbox', { id: 'mobile-menu', type: 'checkbox' });
  const trigger = el('label', 'header-mobile-trigger', { for: 'mobile-menu' });
  const triggerText = el('span', 'sr-only');
  triggerText.textContent = 'Show Menu';
  const burger = el('span', 'hamburger');
  burger.append(el('span'));
  trigger.append(triggerText, burger);

  const drawer = el('nav', 'drawer', { 'aria-label': 'Mobile' });
  const drawerTop = el('div', 'drawer-top');
  if (loginLink) drawerTop.append(stripInstrumentation(loginLink.cloneNode(true)));
  let mobileSearch;
  if (desktopSearch) {
    mobileSearch = stripInstrumentation(desktopSearch.cloneNode(true));
    mobileSearch.querySelector('label').setAttribute('for', 'header-search-mobile');
    mobileSearch.querySelector('input').id = 'header-search-mobile';
    drawerTop.append(mobileSearch);
  }
  drawer.append(drawerTop, buildDrawerMenu(menu));
  if (ctaLink) {
    const drawerCta = el('div', 'drawer-cta');
    drawerCta.append(stripInstrumentation(ctaLink.cloneNode(true)));
    drawer.append(drawerCta);
  }
  mobile.append(checkbox, trigger, drawer);

  [desktopSearch, mobileSearch].forEach((form) => {
    if (form) wireSearch(form);
  });

  const siteHeader = el('div', 'site-header', { id: 'masthead' });
  siteHeader.append(brand, nav, mobile);
  block.textContent = '';
  block.append(siteHeader);

  // scroll shrink: the header host gets .is-scrolled past 100px (source core.min.js)
  const host = block.closest('header') || block;
  const onScroll = () => {
    host.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
