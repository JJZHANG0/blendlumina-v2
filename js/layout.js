/* ============================================
   Blend Lumina - Layout Injection
   Injects shared header + footer into pages
   ============================================ */

const HEADER_HTML = `
<div class="utility-bar">
  <div class="inner">
    <a href="shop.html">作品选购</a>
    <span class="divider">|</span>
    <a href="artist-apply.html">申请入驻</a>
    <span class="divider">|</span>
    <a href="faq.html">需要帮助?</a>
    <span class="divider">|</span>
    <div class="lang-toggle">
      <a href="#" class="active">CN</a>
      <span>/</span>
      <a href="#">EN</a>
    </div>
  </div>
</div>
<header class="main-header">
  <div class="header-inner">
    <a href="index.html" class="logo">
      <div class="logo-stack">
        <img class="logo-image" src="assets/BL-LOGO.png" alt="Blend Lumina logo">
        <p class="logo-tagline">看见艺术，看见故事，看见价值</p>
      </div>
    </a>
    <div class="header-search">
      <i class="fas fa-search search-icon"></i>
      <input type="text" placeholder="搜索艺术家、作品、故事" id="header-search-input">
    </div>
    <div class="header-actions">
      <a href="login.html" class="icon-btn" id="header-user-btn" title="登录/注册">
        <i class="far fa-user"></i>
      </a>
      <a href="cart.html" class="icon-btn" style="position:relative;" title="购物车">
        <i class="fas fa-cart-shopping" style="font-size:18px;"></i>
        <span class="cart-badge" style="display:none;">0</span>
      </a>
    </div>
  </div>
</header>
<nav class="main-nav">
  <div class="nav-inner">
    <a href="index.html">首页</a>
    <a href="heritage.html">传统与非遗</a>
    <a href="youth.html">青年创作</a>
    <a href="folk.html">民间手作</a>
    <a href="art-appreciation.html">艺术鉴赏</a>
    <a href="about.html">关于我们</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<div class="giving-back">
  <div class="inner">
    <div class="gb-icon"><i class="fas fa-hand-holding-heart"></i></div>
    <div class="gb-label">公益承诺 <span>GIVING BACK</span></div>
    <div class="gb-text">
      项目收益部分将用于支持云南农村小学教育，让更多孩子的未来充满希望。<br>
      Project proceeds will support rural primary school education in Yunnan, giving more children a brighter future.
    </div>
    <a href="about.html#giving" class="gb-link">了解更多 <i class="fas fa-arrow-right"></i></a>
  </div>
</div>
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">
        <div class="logo-stack">
          <img class="logo-image logo-image-footer" src="assets/BL-LOGO.png" alt="Blend Lumina logo">
          <p class="logo-tagline logo-tagline-footer">看见艺术，看见故事，看见价值</p>
        </div>
      </div>
      <p class="brand-desc">© 2024 Blend Lumina, All Rights Reserved.</p>
    </div>
    <div class="footer-col">
      <h4>平台</h4>
      <ul>
        <li><a href="youth.html">青年创作</a></li>
        <li><a href="folk.html">民间手作</a></li>
        <li><a href="heritage.html">艺术来源</a></li>
        <li><a href="art-appreciation.html">艺术鉴赏</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>帮助</h4>
      <ul>
        <li><a href="shop.html">商城选购</a></li>
        <li><a href="product-detail.html">配送与售后</a></li>
        <li><a href="cart.html">服务条款</a></li>
        <li><a href="about.html">联系我们</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>关于</h4>
      <ul>
        <li><a href="about.html">关于我们</a></li>
        <li><a href="artist-apply.html">媒体报道</a></li>
        <li><a href="artist-apply.html">加入我们</a></li>
        <li><a href="about.html#giving">公益项目</a></li>
      </ul>
    </div>
    <div class="footer-newsletter compact">
      <h4>关注我们</h4>
      <div class="footer-social">
        <a href="#" title="微信"><i class="fab fa-weixin"></i></a>
        <a href="#" title="小红书"><i class="fas fa-book-open"></i></a>
        <a href="#" title="微博"><i class="fab fa-weibo"></i></a>
      </div>
      <p class="newsletter-title">订阅我们的资讯</p>
      <form class="newsletter-form" onsubmit="return false;">
        <input type="email" placeholder="输入邮箱，获得最新灵感">
        <button type="submit">订阅</button>
      </form>
    </div>
  </div>
</footer>
`;

function renderSharedLayout() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
}

function bindSharedLayoutEvents() {
  const searchInput = document.getElementById('header-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `shop.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  // Newsletter in footer
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        if (typeof showToast === 'function') showToast('✓ 订阅成功，感谢您的关注！');
        input.value = '';
      }
    });
  });
}

// Inject header & footer only after the page DOM exists.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderSharedLayout();
    bindSharedLayoutEvents();
  });
} else {
  renderSharedLayout();
  bindSharedLayoutEvents();
}
