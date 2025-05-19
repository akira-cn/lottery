# 技术配置与依赖

## 核心技术栈

- **前端框架**：Vue 3.3.4 (使用Composition API)
- **构建工具**：Vite 4.4.0
- **CSS框架**：UnoCSS 0.53.1
- **语言**：TypeScript 5.0.2
- **包管理器**：pnpm

## 项目配置

### Vite配置

项目使用Vite作为构建工具，配置文件位于`vite.config.ts`，主要配置了：

- Vue插件
- UnoCSS插件
- 开发服务器设置

### UnoCSS配置

使用UnoCSS作为原子化CSS框架，配置文件位于`uno.config.ts`，包含：

- 预设配置
- 自定义规则
- 主题变量

## 依赖详情

### 生产依赖

- **vue**: ^3.3.4 - 核心框架

### 开发依赖

- **@vitejs/plugin-vue**: ^4.2.3 - Vue插件
- **typescript**: ^5.0.2 - TypeScript支持
- **unocss**: ^0.53.1 - 原子化CSS框架
- **vite**: ^4.4.0 - 构建工具
- **vue-tsc**: ^1.8.3 - Vue TypeScript支持
- **@iconify-json/carbon**: ^1.2.8 - Carbon图标集

## 项目结构

```
src/
├── assets/             # 静态资源
├── components/         # 公共组件
│   ├── LotteryDisplay.vue      # 抽奖展示组件
│   ├── LotterySettings.vue     # 抽奖设置组件
│   ├── ParticipantManager.vue  # 参与者管理组件
│   └── WinnersList.vue         # 中奖名单组件
├── pages/              # 页面组件
│   └── LotteryPage.vue         # 抽奖主页面
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 技术实现细节

### 状态管理

当前使用Vue的响应式API（ref, computed）进行状态管理，主要状态包括：

- 参与者列表
- 抽奖设置
- 抽奖状态
- 中奖结果

### 样式系统

使用UnoCSS提供的原子类，结合CSS变量实现主题定制：

- 定义在`:root`和`.dark`选择器中的CSS变量
- 使用原子类（如`bg-white`, `dark:bg-gray-800`）实现响应式和暗色模式

### 图标系统

使用`@iconify-json/carbon`提供的Carbon图标集，通过UnoCSS的图标预设使用：

- 图标使用格式：`i-carbon-[icon-name]`

### 响应式设计

使用UnoCSS的响应式前缀实现不同屏幕尺寸的适配：

- `sm:`, `md:`, `lg:` 等响应式前缀
- 使用`grid`和`flex`布局实现响应式界面