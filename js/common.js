/* ============================================
   Blend Lumina - Common JavaScript
   ============================================ */

// ---- Cart State ----
const Cart = {
  items: JSON.parse(localStorage.getItem('bl_cart') || '[]'),
  save() { localStorage.setItem('bl_cart', JSON.stringify(this.items)); },
  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) { existing.qty += (product.qty || 1); }
    else { this.items.push({ ...product, qty: product.qty || 1 }); }
    this.save();
    this.updateBadge();
    showToast('✓ 已加入购物车');
  },
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.updateBadge();
  },
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const c = this.count();
      badge.textContent = c;
      badge.style.display = c > 0 ? 'flex' : 'none';
    }
  }
};

// ---- Favorites ----
const Favorites = {
  ids: JSON.parse(localStorage.getItem('bl_favs') || '[]'),
  toggle(id) {
    if (this.ids.includes(id)) {
      this.ids = this.ids.filter(i => i !== id);
      showToast('已取消收藏');
    } else {
      this.ids.push(id);
      showToast('❤ 已加入收藏');
    }
    localStorage.setItem('bl_favs', JSON.stringify(this.ids));
    return this.ids.includes(id);
  },
  has(id) { return this.ids.includes(id); }
};

// ---- Toast ----
function showToast(msg, duration = 2200) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ---- Heart Buttons ----
function initHeartButtons() {
  document.querySelectorAll('.heart-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (Favorites.has(id)) btn.classList.add('active');
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const active = Favorites.toggle(id);
      btn.classList.toggle('active', active);
      btn.querySelector('i').className = active ? 'fas fa-heart' : 'far fa-heart';
    });
  });
}

// ---- Active Nav ----
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-inner a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path === href || (path === 'index.html' && href === 'index.html') || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

// ---- Filter Accordions ----
function initFilterAccordions() {
  document.querySelectorAll('.filter-group-title').forEach(title => {
    title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      const isOpen = title.classList.contains('open');
      title.classList.toggle('open', !isOpen);
      if (content) { content.style.display = isOpen ? 'none' : 'flex'; }
    });
    // Default open
    title.classList.add('open');
  });
}

// ---- Product Tab Switcher ----
function initProductTabs() {
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.product-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById('tab-' + tab);
      if (content) content.classList.add('active');
    });
  });
}

// ---- Quantity Stepper ----
function initQtyStepper() {
  document.querySelectorAll('.qty-stepper').forEach(stepper => {
    const input = stepper.querySelector('input');
    stepper.querySelector('.qty-minus')?.addEventListener('click', () => {
      if (input.value > 1) input.value = parseInt(input.value) - 1;
    });
    stepper.querySelector('.qty-plus')?.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });
  });
}

// ---- Image Gallery ----
function initGallery() {
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImg = document.querySelector('.product-main-img img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg && thumb.querySelector('img')) {
        mainImg.src = thumb.querySelector('img').src;
      }
    });
  });
}

// ---- Sub Tabs (category filter) ----
function initSubTabs() {
  document.querySelectorAll('.sub-tabs a, .sub-tabs button').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.sub-tabs a, .sub-tabs button').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ---- Cart Badge Init ----
function initCartBadge() {
  Cart.updateBadge();
}

// ---- Newsletter ----
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        showToast('✓ 订阅成功，感谢您的关注！');
        input.value = '';
      }
    });
  });
}

// ---- Add to Cart (product detail page) ----
function initProductDetail() {
  const addBtn = document.getElementById('btn-add-cart');
  const buyBtn = document.getElementById('btn-buy-now');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(document.querySelector('.qty-stepper input')?.value || 1);
      Cart.add({ id: window.PRODUCT?.id, title: window.PRODUCT?.title, price: window.PRODUCT?.price, qty });
    });
  }
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const qty = parseInt(document.querySelector('.qty-stepper input')?.value || 1);
      Cart.add({ id: window.PRODUCT?.id, title: window.PRODUCT?.title, price: window.PRODUCT?.price, qty });
      window.location.href = 'cart.html';
    });
  }
  const favBtn = document.getElementById('btn-fav');
  if (favBtn && window.PRODUCT) {
    const isFav = Favorites.has(window.PRODUCT.id);
    if (isFav) { favBtn.classList.add('active'); favBtn.querySelector('i').className = 'fas fa-heart'; }
    favBtn.addEventListener('click', () => {
      const active = Favorites.toggle(window.PRODUCT.id);
      favBtn.classList.toggle('active', active);
      favBtn.querySelector('i').className = active ? 'fas fa-heart' : 'far fa-heart';
    });
  }
}

// ---- Cart Page ----
function renderCartPage() {
  const container = document.getElementById('cart-items-list');
  const emptyMsg = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary-area');
  if (!container) return;
  if (Cart.items.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';
  if (summaryEl) summaryEl.style.display = 'block';
  container.innerHTML = Cart.items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-info">
        <div class="cart-item-img"><div style="width:100%;height:100%;background:var(--beige-dark);display:flex;align-items:center;justify-content:center;font-size:32px;">${item.emoji || '🎨'}</div></div>
        <div>
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-sub">${item.artist || ''}</div>
        </div>
      </div>
      <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
      <div class="cart-item-qty">
        <div class="qty-stepper">
          <button class="qty-minus" onclick="cartUpdateQty('${item.id}',-1)">−</button>
          <input type="number" value="${item.qty}" min="1" onchange="cartSetQty('${item.id}',this.value)">
          <button class="qty-plus" onclick="cartUpdateQty('${item.id}',1)">+</button>
        </div>
      </div>
      <div class="cart-item-del"><button onclick="cartRemove('${item.id}')"><i class="fas fa-times"></i></button></div>
    </div>
  `).join('');
  updateCartSummary();
}

function cartUpdateQty(id, delta) {
  const item = Cart.items.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, item.qty + delta); Cart.save(); Cart.updateBadge(); renderCartPage(); }
}
function cartSetQty(id, val) {
  const item = Cart.items.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, parseInt(val) || 1); Cart.save(); Cart.updateBadge(); renderCartPage(); }
}
function cartRemove(id) {
  Cart.remove(id); renderCartPage(); showToast('已移除商品');
}
function updateCartSummary() {
  const subtotal = Cart.total();
  const shipping = subtotal > 0 ? 0 : 0;
  document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = '¥' + subtotal.toLocaleString());
  document.getElementById('cart-shipping') && (document.getElementById('cart-shipping').textContent = subtotal >= 299 ? '免运费' : '¥15');
  document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = '¥' + (subtotal + (subtotal >= 299 ? 0 : 15)).toLocaleString());
}

// ---- User Auth ----
const Auth = {
  user: JSON.parse(localStorage.getItem('bl_user') || 'null'),
  login(data) { this.user = data; localStorage.setItem('bl_user', JSON.stringify(data)); },
  logout() { this.user = null; localStorage.removeItem('bl_user'); },
  isLoggedIn() { return !!this.user; }
};

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    if (email && password) {
      Auth.login({ email, name: email.split('@')[0], avatar: '👤' });
      showToast('✓ 登录成功！');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }
  });
}

function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    if (name && email) {
      Auth.login({ email, name, avatar: '👤' });
      showToast('✓ 注册成功，欢迎加入！');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }
  });
}

function initApplyForm() {
  const form = document.getElementById('apply-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✓ 申请已提交，我们将在3个工作日内联系您！');
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  });
}

// ---- Update Header for Auth ----
function updateHeaderAuth() {
  const userBtn = document.getElementById('header-user-btn');
  if (!userBtn) return;
  if (Auth.isLoggedIn()) {
    userBtn.setAttribute('href', 'user-center.html');
    userBtn.setAttribute('title', Auth.user.name);
  } else {
    userBtn.setAttribute('href', 'login.html');
  }
}

// ---- Init All ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initCartBadge();
  initHeartButtons();
  initFilterAccordions();
  initProductTabs();
  initQtyStepper();
  initGallery();
  initSubTabs();
  initNewsletter();
  initProductDetail();
  initLoginForm();
  initRegisterForm();
  initApplyForm();
  updateHeaderAuth();
  renderCartPage();
});
