# Blend Lumina 融光 - 中国艺术电商平台

## 项目简介

Blend Lumina（融光）是一个专注于中国当代与传统艺术的原创作品交易平台，汇聚青年艺术家、民间手作人、街头创作者与非遗传承人，让艺术回归生活。

---

## 已完成功能

### 页面列表（16个页面）

| 文件 | 页面名称 | 说明 |
|------|---------|------|
| `index.html` | 首页 | 水墨山水 Banner、四大分类卡片、8件精选作品、公益承诺条 |
| `youth.html` | 青年创作 | 当代艺术 Banner、8件作品、3位艺术家简介、故事专题 |
| `folk.html` | 民间手作 | 竹编 Banner、7大子分类标签、8件手作作品、匠人故事、品质保障 |
| `street.html` | 街头表达 | 城市艺术 Banner、分类图标、6件作品、编辑专题、申请入驻 CTA |
| `heritage.html` | 传统与非遗 | 非遗 Banner、4个子分类卡片、8件精选非遗作品 |
| `heritage-dyeing.html` | 染织与纤维 | 靛蓝布料 Banner、左侧筛选面板、6件染织作品 |
| `heritage-dyeing-tiedye.html` | 扎染 | 扎染 Banner、特色标识条、筛选、6件产品、匠人故事 |
| `product-detail.html` | 商品详情 | 4图画廊、购买面板、描述标签、相关推荐 |
| `shop.html` | 全部作品 | 综合 Banner、左侧筛选、分类芯片、9件作品 |
| `art-appreciation.html` | 艺术鉴赏 | 山水 Banner、4篇文章、侧边栏热文/标签/推荐 |
| `about.html` | 关于我们 | 全屏 Banner、使命、数字统计（计数动画）、价值观、团队、CTA |
| `login.html` | 登录 | 两栏布局（左侧山水插图/右侧表单）、LocalStorage 验证 |
| `register.html` | 注册 | 两栏布局、四个字段表单、注册后自动跳转 |
| `artist-apply.html` | 艺术家入驻 | 全屏 Banner、入驻优势、四步流程图、四步申请表单 |
| `cart.html` | 购物车 | Banner、购物车列表、数量调整、删除、订单摘要（含3%公益捐赠） |
| `user-center.html` | 个人中心 | 用户 Banner、侧边导航、订单/收藏/个人资料/地址四个模块 |

### 核心功能

- ✅ **全站统一导航**：通过 `js/layout.js` 注入 header 和 footer
- ✅ **购物车系统**：LocalStorage 持久化，支持增减数量、删除、清空
- ✅ **收藏系统**：LocalStorage 持久化，跨页面保持收藏状态
- ✅ **用户认证**：注册/登录/退出，用户数据存储于 LocalStorage
- ✅ **商品图片画廊**：缩略图切换主图
- ✅ **产品筛选**：价格、材质、颜色、工艺等多维筛选面板
- ✅ **面包屑导航**：全站页面层级清晰可见
- ✅ **计数动画**：关于我们页面数字滚动效果
- ✅ **艺术家申请**：四步骤分步表单
- ✅ **响应式设计**：适配桌面、平板、手机

### 图片资源

所有页面均使用真实配图（来自公开授权的图像搜索结果），覆盖：
- 🖼️ 中国水墨山水（首页 Banner）
- 🔵 靛蓝扎染布料（染织、扎染页面）
- 🎨 当代中国艺术作品（青年创作）
- 🧺 竹编手工艺品（民间手作）
- 🏙️ 城市街头壁画（街头表达）
- 🏺 传统非遗工艺品（非遗页面）
- 🪡 刺绣漆器瓷器（各类产品卡片）

---

## 页面跳转逻辑

```
首页 (index.html)
├── 青年创作 (youth.html) ──► 商品详情 (product-detail.html)
├── 民间手作 (folk.html) ──► 商品详情
├── 街头表达 (street.html) ──► 商品详情
├── 传统与非遗 (heritage.html)
│   └── 染织与纤维 (heritage-dyeing.html)
│       └── 扎染 (heritage-dyeing-tiedye.html) ──► 商品详情
├── 探索作品 (shop.html) ──► 商品详情
├── 艺术鉴赏 (art-appreciation.html)
├── 关于我们 (about.html)
├── 登录 (login.html) ◄──► 注册 (register.html)
├── 艺术家入驻 (artist-apply.html)
├── 购物车 (cart.html)
└── 个人中心 (user-center.html) ──► 艺术家入驻
```

---

## 数据存储

| 键名 | 说明 |
|------|------|
| `bl_cart` | 购物车数组（id, name, price, qty, img） |
| `bl_favs` | 收藏列表（id 数组） |
| `bl_users` | 注册用户数组 |
| `bl_current_user` | 当前登录用户对象 |

---

## 待优化事项

- [ ] 接入真实后端 API（当前仅使用 LocalStorage）
- [ ] 实现真实支付流程（目前点击"去结算"跳转个人中心）
- [ ] 添加搜索功能（全局关键词搜索）
- [ ] 实现分页加载更多作品
- [ ] 添加艺术家主页（个人作品集页面）
- [ ] 微信/支付宝登录集成

---

## 技术栈

- **HTML5** + **CSS3**（自定义设计系统）
- **原生 JavaScript**（无框架依赖）
- **Font Awesome 6** - 图标库
- **Google Fonts** - Noto Serif SC / Noto Sans SC
- **LocalStorage** - 客户端数据持久化
- **Intersection Observer API** - 滚动触发动画
