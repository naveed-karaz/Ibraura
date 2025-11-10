// Client-side product search & render (no backend)
const productContainer = document.getElementById('productContainer');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
let PRODUCTS = [];

async function loadProducts(){
  try {
    const res = await fetch('./assets/data/products.json');
    PRODUCTS = await res.json();
    renderProducts(PRODUCTS);
  } catch (err) {
    console.error('Failed to load products', err);
    productContainer.innerHTML = '<p style="color:#b91c1c">Error loading products.</p>';
  }
}

function renderProducts(list){
  productContainer.innerHTML = '';
  if(!list || list.length === 0){
    noResults.style.display = 'block';
    return;
  } else {
    noResults.style.display = 'none';
  }
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <div>${p.description || ''}</div>
      <div class="controls">
        <div class="price">$${p.price}</div>
        ${p.stock === 0 ? '<div class="badge out">Out of stock</div>' : '<div class="badge">'+p.stock+' in stock</div>'}
      </div>
    `;
    productContainer.appendChild(card);
  });
}

function doSearch(){
  const q = searchInput.value.trim().toLowerCase();
  if(!q) { renderProducts(PRODUCTS); return; }
  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q)
  );
  renderProducts(filtered);
}

searchInput.addEventListener('input', doSearch);
window.addEventListener('load', loadProducts);
