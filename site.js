const FOOD_FACTORY_WHATSAPP = '27719358686';

const menuSections = [
  {
    title: 'Breakfast (from 08:00 all day)',
    items: [
      { name: 'Downtime', note: 'Brioche bun, layered with eggs, fruit and hash brown', price: 'R69.00', popular: true },
      { name: 'Productive', note: 'Eggs, hash brown, 100g rump, onion, mushroom and chips', price: 'R108.00', popular: true },
      { name: 'Foundry Breakfast', note: '2 eggs, wors, mushroom, beef strips, toast, coffee', price: 'R90.00' },
      { name: 'Quality Control Eggs Bennie', note: 'Poached eggs, spinach and hollandaise', price: 'R78.00' },
      { name: 'Spanish Meaty Omelette', note: 'Bacon, sausage or pork sausage, onion and cheese', price: 'R95.00' },
    ],
  },
  {
    title: 'Factory Patties',
    items: [
      { name: 'Classic Burger', note: 'Lettuce, tomato and onion', price: 'R85.00' },
      { name: 'Cheese Burger', price: 'R95.00', popular: true },
      { name: 'Mushroom Burger', price: 'R95.00' },
      { name: 'Piggy Burger', note: 'Bacon option available', price: 'R110.00', popular: true },
      { name: 'Factory Burger', note: 'With mozzarella cheese and bacon', price: 'R120.00', popular: true },
    ],
  },
  {
    title: 'Curries @ the Factory',
    items: [
      { name: 'Seafood Curry', note: 'Prawns, calamari, mussels in Indian spices', price: 'R198.00', popular: true },
      { name: 'Butter Chicken Curry', note: 'Grilled chicken fillet in creamy butter sauce', price: 'R135.00' },
      { name: 'Beef Curry', note: 'Slow-cooked with own Factory curry', price: 'R155.00' },
      { name: 'Lamb Curry', note: 'Tender lamb pieces in authentic masala', price: 'R175.00' },
    ],
  },
  {
    title: 'We Mean Business Grill',
    items: [
      { name: 'Flame Grilled Rump 200g', price: 'R120.00' },
      { name: 'Rump Espetada 300g', price: 'R195.00' },
      { name: 'Succulent Spare Ribs 600g', price: 'R224.00', popular: true },
      { name: 'Well Matured T-Bone', note: 'With garlic and black pepper', price: 'R190.00' },
      { name: 'Factory Carnivore Platter for 2', note: 'Succulent ribs, rump, boerewors', price: 'R386.00', popular: true },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Dark Chocolate Brownie', price: 'R55.00', popular: true },
      { name: 'Malva Pudding', price: 'R55.00' },
      { name: 'Chocolate Sundae', price: 'R55.00' },
      { name: 'Slice of Cake of the Day', price: 'R55.00' },
      { name: 'Peppermint Crisp Tart', price: 'R50.00', popular: true },
    ],
  },
];

const featured = [
  { section: 'Breakfast', name: 'Productive', price: 'R108.00', popular: true },
  { section: 'Factory Patties', name: 'Factory Burger', price: 'R120.00', popular: true },
  { section: 'Curries @ the Factory', name: 'Seafood Curry', price: 'R198.00', popular: true },
  { section: 'We Mean Business Grill', name: 'Factory Carnivore Platter for 2', price: 'R386.00', popular: true },
  { section: 'Desserts', name: 'Peppermint Crisp Tart', price: 'R50.00', popular: true },
];

const previewList = document.getElementById('preview-list');
const modal = document.getElementById('menu-modal-backdrop');
const openBtn = document.getElementById('see-more');
const closeBtn = document.getElementById('menu-close');
const tabs = document.getElementById('menu-tabs');
const search = document.getElementById('menu-search');
const modalGrid = document.getElementById('menu-modal-grid');
const cartList = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');
const cartIndicator = document.getElementById('cart-indicator');
const proceedOrderBtn = document.getElementById('proceed-order');

const cart = {};

function toKey(sectionTitle, itemName) {
  return `${sectionTitle}::${itemName}`;
}

function parsePrice(priceText) {
  const match = String(priceText).match(/[0-9]+(?:\.[0-9]+)?/);
  return match ? Number(match[0]) : 0;
}

function money(value) {
  return `R${value.toFixed(2)}`;
}

function previewRow(item, sectionTitle) {
  return `<li><div><p class="item-name">${item.name}${item.popular ? '<span class="badge-popular">Most Popular</span>' : ''}</p><p class="item-note">${sectionTitle}</p></div><span class="item-price">${item.price}</span></li>`;
}

function renderPreview() {
  previewList.innerHTML = featured.map((f) => previewRow(f, f.section)).join('');
}

function filteredSections(active, term) {
  const q = term.trim().toLowerCase();
  const scoped = active === 'ALL' ? menuSections : menuSections.filter((s) => s.title === active);
  return scoped
    .map((section) => ({
      ...section,
      items: q
        ? section.items.filter((item) => `${item.name} ${item.note || ''} ${section.title}`.toLowerCase().includes(q))
        : section.items,
    }))
    .filter((section) => section.items.length > 0);
}

function qtyFor(sectionTitle, itemName) {
  const key = toKey(sectionTitle, itemName);
  return cart[key]?.qty || 0;
}

function renderModalSections() {
  const active = tabs.querySelector('.is-active')?.dataset.value || 'ALL';
  const sections = filteredSections(active, search.value || '');
  if (!sections.length) {
    modalGrid.innerHTML = '<article class="menu-card menu-empty"><h4>No menu items found</h4><p class="item-note">Try another category or search term.</p></article>';
    return;
  }

  modalGrid.innerHTML = sections
    .map(
      (section) => `
      <article class="menu-card">
        <h4>${section.title}</h4>
        <ul>
          ${section.items
            .map((item) => {
              const key = toKey(section.title, item.name);
              const qty = qtyFor(section.title, item.name);
              const popularBadge = item.popular ? '<span class="badge-popular">Most Popular</span>' : '';
              const note = item.note ? `<p class="item-note">${item.note}</p>` : '';
              return `
                <li>
                  <div>
                    <p class="item-name">${item.name}${popularBadge}</p>
                    ${note}
                    <div class="menu-item-controls" data-key="${key}">
                      <button class="qty-btn" data-action="decrease">-</button>
                      <span class="qty-value">${qty}</span>
                      <button class="qty-btn" data-action="increase">+</button>
                    </div>
                  </div>
                  <span class="item-price">${item.price}</span>
                </li>
              `;
            })
            .join('')}
        </ul>
      </article>
    `
    )
    .join('');
}

function cartEntries() {
  return Object.entries(cart).filter(([, value]) => value.qty > 0);
}

function renderCart() {
  const entries = cartEntries();
  if (!entries.length) {
    cartList.innerHTML = '<li><p class="item-note">No items selected yet.</p></li>';
    cartTotalEl.textContent = 'R0.00';
    cartIndicator.textContent = 'Cart (0)';
    return;
  }

  let totalQty = 0;
  let totalPrice = 0;
  cartList.innerHTML = entries
    .map(([key, value]) => {
      const lineTotal = value.unitPrice * value.qty;
      totalQty += value.qty;
      totalPrice += lineTotal;
      return `
        <li>
          <div class="cart-item-top">
            <strong>${value.name}</strong>
            <button class="cart-remove" data-remove-key="${key}">remove</button>
          </div>
          <p class="item-note">${value.section}</p>
          <p class="item-note">${value.qty} x ${money(value.unitPrice)} = ${money(lineTotal)}</p>
        </li>
      `;
    })
    .join('');

  cartTotalEl.textContent = money(totalPrice);
  cartIndicator.textContent = `Cart (${totalQty})`;
}

function changeQty(key, delta) {
  const [section, name] = key.split('::');
  const sectionObj = menuSections.find((s) => s.title === section);
  const item = sectionObj?.items.find((i) => i.name === name);
  if (!item) {
    return;
  }

  const current = cart[key]?.qty || 0;
  const next = current + delta;
  if (next <= 0) {
    delete cart[key];
  } else {
    cart[key] = {
      section,
      name,
      unitPrice: parsePrice(item.price),
      qty: next,
    };
  }

  renderModalSections();
  renderCart();
}

function buildTabs() {
  const values = ['ALL', ...menuSections.map((s) => s.title)];
  tabs.innerHTML = values
    .map((value, idx) => `<button class="menu-tab ${idx === 0 ? 'is-active' : ''}" data-value="${value}">${value === 'ALL' ? 'All' : value}</button>`)
    .join('');
}

function resetModalView() {
  search.value = '';
  tabs.querySelectorAll('.menu-tab').forEach((tab) => tab.classList.remove('is-active'));
  tabs.querySelector('.menu-tab')?.classList.add('is-active');
}

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetModalView();
  renderModalSections();
  renderCart();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function buildOrderMessage() {
  const entries = cartEntries();
  if (!entries.length) {
    return '';
  }

  const lines = ['Hello Food Factory Silverlakes, I want to order:'];
  let total = 0;
  entries.forEach(([, value], idx) => {
    const lineTotal = value.unitPrice * value.qty;
    total += lineTotal;
    lines.push(`${idx + 1}. ${value.name} (${value.section}) - ${value.qty} x ${money(value.unitPrice)} = ${money(lineTotal)}`);
  });
  lines.push(`Total: ${money(total)}`);
  lines.push('Please confirm availability and collection/delivery options.');
  return lines.join('\n');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

tabs.addEventListener('click', (event) => {
  const button = event.target.closest('.menu-tab');
  if (!button) {
    return;
  }
  tabs.querySelectorAll('.menu-tab').forEach((tab) => tab.classList.remove('is-active'));
  button.classList.add('is-active');
  renderModalSections();
});

search.addEventListener('input', renderModalSections);

modalGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.qty-btn');
  if (!button) {
    return;
  }
  const controls = button.closest('.menu-item-controls');
  if (!controls) {
    return;
  }
  const key = controls.dataset.key;
  const action = button.dataset.action;
  changeQty(key, action === 'increase' ? 1 : -1);
});

cartList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-key]');
  if (!button) {
    return;
  }
  const key = button.dataset.removeKey;
  delete cart[key];
  renderModalSections();
  renderCart();
});

proceedOrderBtn.addEventListener('click', () => {
  const message = buildOrderMessage();
  if (!message) {
    alert('Add at least one item to cart before ordering.');
    return;
  }
  const link = `https://wa.me/${FOOD_FACTORY_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(link, '_blank');
});

renderPreview();
buildTabs();
renderModalSections();
renderCart();
