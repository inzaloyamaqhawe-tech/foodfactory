const menuSections = [
  {
    title: 'Breakfast (from 08:00 all day)',
    items: [
      { name: 'Downtime', note: 'Brioche bun, layered with eggs, fruit and hash brown', price: 'R69.00' },
      { name: 'Productive', note: 'Eggs, hash brown, 100g rump, onion, mushroom and chips', price: 'R108.00' },
      { name: 'Foundry Breakfast', note: '2 eggs, wors, mushroom, beef strips, toast, coffee', price: 'R90.00' },
      { name: 'Quality Control Eggs Bennie', note: 'Poached eggs, spinach and hollandaise', price: 'R78.00' },
      { name: 'Spanish Meaty Omelette', note: 'Bacon, sausage or pork sausage, onion and cheese', price: 'R95.00' }
    ]
  },
  {
    title: 'Factory Patties',
    items: [
      { name: 'Classic Burger', note: 'Lettuce, tomato and onion', price: 'R85.00' },
      { name: 'Cheese Burger', price: 'R95.00' },
      { name: 'Mushroom Burger', price: 'R95.00' },
      { name: 'Piggy Burger', note: 'Bacon option available', price: 'R110.00' },
      { name: 'Factory Burger', note: 'With mozzarella cheese and bacon', price: 'R120.00' }
    ]
  },
  {
    title: 'Curries @ the Factory',
    items: [
      { name: 'Seafood Curry', note: 'Prawns, calamari, mussels in Indian spices', price: 'R198.00' },
      { name: 'Butter Chicken Curry', note: 'Grilled chicken fillet in creamy butter sauce', price: 'R135.00' },
      { name: 'Beef Curry', note: 'Slow-cooked with own Factory curry', price: 'R155.00' },
      { name: 'Lamb Curry', note: 'Tender lamb pieces in authentic masala', price: 'R175.00' }
    ]
  },
  {
    title: 'We Mean Business Grill',
    items: [
      { name: 'Flame Grilled Rump 200g', price: 'R120.00' },
      { name: 'Rump Espetada 300g', price: 'R195.00' },
      { name: 'Succulent Spare Ribs 600g', price: 'R224.00' },
      { name: 'Well Matured T-Bone', note: 'With garlic and black pepper', price: 'R190.00' },
      { name: 'Factory Carnivore Platter for 2', note: 'Succulent ribs, rump, boerewors', price: 'R386.00' }
    ]
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Dark Chocolate Brownie', price: 'R55.00' },
      { name: 'Malva Pudding', price: 'R55.00' },
      { name: 'Chocolate Sundae', price: 'R55.00' },
      { name: 'Slice of Cake of the Day', price: 'R55.00' },
      { name: 'Peppermint Crisp Tart', price: 'R50.00' }
    ]
  }
];

const featured = [
  { section: 'Breakfast', name: 'Productive', price: 'R108.00' },
  { section: 'Factory Patties', name: 'Factory Burger', price: 'R120.00' },
  { section: 'Curries @ the Factory', name: 'Seafood Curry', price: 'R198.00' },
  { section: 'We Mean Business Grill', name: 'Factory Carnivore Platter for 2', price: 'R386.00' },
  { section: 'Desserts', name: 'Peppermint Crisp Tart', price: 'R50.00' }
];

const previewList = document.getElementById('preview-list');
const modal = document.getElementById('menu-modal-backdrop');
const openBtn = document.getElementById('see-more');
const closeBtn = document.getElementById('menu-close');
const tabs = document.getElementById('menu-tabs');
const search = document.getElementById('menu-search');
const modalGrid = document.getElementById('menu-modal-grid');

function itemRow(item, sectionTitle) {
  const note = item.note ? `<p class="item-note">${item.note}</p>` : '';
  return `<li><div><p class="item-name">${item.name}</p>${sectionTitle ? `<p class="item-note">${sectionTitle}</p>` : note}</div><span class="item-price">${item.price}</span></li>`;
}

function renderPreview() {
  previewList.innerHTML = featured.map((f) => itemRow({ name: f.name, price: f.price }, f.section)).join('');
}

function filteredSections(active, term) {
  const q = term.trim().toLowerCase();
  let sections = active === 'ALL' ? menuSections : menuSections.filter((s) => s.title === active);
  return sections.map((s) => ({
    ...s,
    items: q ? s.items.filter((i) => `${i.name} ${i.note || ''} ${s.title}`.toLowerCase().includes(q)) : s.items
  })).filter((s) => s.items.length > 0);
}

function renderModalSections() {
  const active = tabs.querySelector('.is-active')?.dataset.value || 'ALL';
  const sections = filteredSections(active, search.value || '');
  if (!sections.length) {
    modalGrid.innerHTML = '<article class="menu-card menu-empty"><h4>No menu items found</h4><p class="item-note">Try another category or search term.</p></article>';
    return;
  }
  modalGrid.innerHTML = sections.map((section) => `
    <article class="menu-card">
      <h4>${section.title}</h4>
      <ul>${section.items.map((item) => itemRow(item, '')).join('')}</ul>
    </article>
  `).join('');
}

function buildTabs() {
  const values = ['ALL', ...menuSections.map((s) => s.title)];
  tabs.innerHTML = values.map((v, i) => `<button class="menu-tab ${i === 0 ? 'is-active' : ''}" data-value="${v}">${v === 'ALL' ? 'All' : v}</button>`).join('');
  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab');
    if (!btn) return;
    tabs.querySelectorAll('.menu-tab').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderModalSections();
  });
}

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  search.value = '';
  tabs.querySelectorAll('.menu-tab').forEach((b) => b.classList.remove('is-active'));
  tabs.querySelector('.menu-tab')?.classList.add('is-active');
  renderModalSections();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
search.addEventListener('input', renderModalSections);

renderPreview();
buildTabs();
renderModalSections();
