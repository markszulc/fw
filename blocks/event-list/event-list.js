/**
 * event-list — the source's event calendar (page-block--event_calendar). Decode tier:
 * reconstructive: each row is one event, classified by content (heading with link = title +
 * card href, paragraph with a strong date = date badge, other paragraph = location line).
 * The card is the link (EW6): the href is read and the inner anchor unwrapped. Rows split
 * into two lists (first half / second half) as on the source.
 */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/** wraps the "date, " prefix of the location line in <time> (hidden at >= 768px) */
function splitLocation(p) {
  const text = [...p.childNodes]
    .find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.includes(', '));
  if (!text) return;
  const cut = text.textContent.lastIndexOf(', ') + 2;
  const rest = text.splitText(cut);
  const time = el('time');
  p.insertBefore(time, rest);
  time.append(text);
}

export default function decorate(block) {
  if (block.querySelector(':scope > .event-cal')) return; // re-entrant (EW9)
  const rows = [...block.children];
  const cards = rows.map((row) => {
    const card = el('a', 'event-cal-event');
    const body = el('div', 'event-cal-body');
    const date = el('time', 'event-cal-date');
    card.append(body);
    [...row.querySelectorAll(':scope > div > *')].forEach((node) => {
      const link = node.querySelector('a');
      if (/^H[1-6]$/.test(node.tagName)) {
        if (link) {
          card.href = link.href;
          link.replaceWith(...link.childNodes);
        }
        body.prepend(node);
      } else if (node.querySelector('strong')) {
        date.append(node);
      } else {
        splitLocation(node);
        body.append(node);
      }
    });
    if (date.children.length) card.append(date);
    return card;
  });
  const cal = el('div', 'event-cal l-container');
  const half = Math.ceil(cards.length / 2);
  [cards.slice(0, half), cards.slice(half)].forEach((group) => {
    if (!group.length) return;
    const list = el('div', 'event-cal-list');
    list.append(...group);
    cal.append(list);
  });
  block.replaceChildren(cal);
}
