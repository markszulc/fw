/**
 * newsletter — the source's Eloqua newsletter band (page-block--eloqua_form). Decode tier:
 * template-slotted. Cell 1 = heading + copy; cell 2 = form spec (email label, email
 * placeholder, country label, country list, opt-in text, submit text); cell 3 = confirmation.
 * The form posts nowhere until the owner wires the Eloqua endpoint (dynamics row).
 * @ew-exempt The placeholder, the country list and the submit text become form attributes /
 * options (an input cannot host editable text).
 */

let uid = 0;

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function labelled(p, prefix) {
  uid += 1;
  const id = `${prefix}-${uid}`;
  p.id = `${id}-label`;
  const slot = el('div', 'form-label');
  slot.append(p);
  return { slot, id };
}

export default function decorate(block) {
  if (block.querySelector(':scope > .newsletter-wrap')) return; // re-entrant (EW9)
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const [intro, spec, confirm] = cells;

  const row = el('div', 'l-row');
  const body = el('div', 'newsletter-body l-col l-col-md-6');
  if (intro) {
    const content = el('div', 'newsletter-content');
    [...intro.children].forEach((node) => {
      if (/^H[1-6]$/.test(node.tagName)) body.append(node);
      else content.append(node);
    });
    body.append(content);
  }
  row.append(body);

  if (spec) {
    const ps = [...spec.querySelectorAll(':scope > p')];
    const list = spec.querySelector(':scope > ul');
    const [emailLabel, placeholder, countryLabel, optinText, submitText] = ps;
    const form = el('form', 'form', { novalidate: '' });

    const r1 = el('div', 'form-row form-row-stack');
    const email = labelled(emailLabel, 'nl-email');
    const input = el('input', 'form-input', {
      id: email.id, type: 'email', name: 'email', 'aria-labelledby': emailLabel.id,
    });
    if (placeholder) {
      input.placeholder = placeholder.textContent.trim();
      placeholder.remove();
    }
    r1.append(email.slot, input);

    const r2 = el('div', 'form-row');
    const item = el('div', 'form-item');
    const country = labelled(countryLabel, 'nl-country');
    const select = el('select', 'form-input form-input-select', {
      id: country.id, name: 'country', 'aria-labelledby': countryLabel.id,
    });
    select.append(new Option('Country', ''));
    if (list) {
      [...list.children].forEach((li) => select.append(new Option(li.textContent.trim())));
      list.remove();
    }
    item.append(country.slot, select);
    r2.append(item);

    const r3 = el('div', 'form-row form-row-checkbox');
    uid += 1;
    const box = el('input', 'form-checkbox', {
      id: `nl-optin-${uid}`, type: 'checkbox', name: 'optin',
    });
    const boxLabel = el('label', 'form-label', { for: box.id });
    if (optinText) boxLabel.append(optinText);
    r3.append(box, boxLabel);

    const r4 = el('div', 'form-row form-row-submit');
    const submit = el('input', 'form-submit', { type: 'submit' });
    if (submitText) {
      submit.value = submitText.textContent.trim();
      submitText.remove();
    }
    r4.append(submit);
    form.append(r1, r2, r3, r4);
    form.addEventListener('submit', (e) => e.preventDefault());

    const formCol = el('div', 'newsletter-form l-col l-col-md-6');
    formCol.append(form);
    row.append(formCol);
  }

  if (confirm) {
    const done = el('div', 'newsletter-confirm l-col l-col-md-6');
    done.append(...confirm.children);
    row.append(done);
  }

  const wrap = el('div', 'newsletter-wrap l-container');
  wrap.append(row);
  block.replaceChildren(wrap);
}
