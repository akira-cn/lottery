# 📐 Project Rules for Vue Frontend Application

## 🚀 技术栈说明

* **框架**：Vue 3 + Composition API
* **构建工具**：Vite
* **样式系统**：UnoCSS（或 Tailwind CSS）
* **组件化**：基于自定义 Design System 的语义组件
* **网络请求**：Trae（统一封装 API 调用）
* **包管理器**：pnpm
* **图标系统**：unplugin-icons + Iconify

---

## 🧱 项目结构规范

```
src/
├── assets/             # 静态资源
├── components/         # 公共组件
├── layouts/            # 页面布局组件
├── pages/              # 页面组件（建议配合路由）
├── services/           # Trae 封装的 API 请求
├── styles/             # UnoCSS / Tailwind 自定义配置和变量
├── utils/              # 工具函数模块
├── App.vue             # 根组件
├── main.ts             # 应用入口
```

### 结构最佳实践

* 组件按功能职责分类，避免单一目录下组件过多
* 复杂页面应拆分为多个子组件，提高可维护性
* 共享逻辑抽取为组合式函数（Composables），放置于`utils/composables/`目录
* 页面组件应专注于数据聚合和子组件协调，避免过多业务逻辑

---

## 🎨 设计系统规范

* 使用 CSS Variables 定义配色、边距、圆角等 token：

  * `--color-primary`、`--radius-sm`、`--font-body`
* 配合 UnoCSS 使用原子类生成一致 UI 风格
* 必须支持亮暗主题切换（使用 `dark: 'class'` 模式）
* 所有样式通过变量或原子类调用，不允许硬编码颜色值

### 样式最佳实践

* **暗色模式**：所有组件必须添加`dark:`前缀的样式类，特别是背景色和文本颜色
* **响应式设计**：使用`sm:`, `md:`, `lg:`等前缀时保持断点一致性，避免布局在特定尺寸下出现问题
* **CSS变量**：在`:root`和`.dark`选择器中都定义对应的变量，确保主题切换正常
* **性能优化**：避免过度使用自定义类，优先使用UnoCSS原子类
* **移动优先**：采用移动优先的设计理念，先实现移动端样式，再通过媒体查询添加大屏幕样式

---

## 🧩 组件设计原则

* 使用 PascalCase 命名组件（如：`UserCard.vue`）
* 每个组件必须暴露 props 与 slots，支持复用
* 组件必须包含 HTML 注释说明：

```vue
<!--
  Component: UserCard
  Description: 显示用户头像、昵称、状态信息的卡片组件
  Usage: <UserCard :user="data" />
  Props:
    - user: Object - 用户数据对象，包含avatar、name、status字段
  Slots:
    - actions: 自定义操作按钮区域
  Events:
    - @click: 点击卡片时触发
-->
```

* 所有组件都必须支持暗色模式适配
* 不允许在组件内写死 UI 尺寸，应通过变量或 props 控制

### 组件最佳实践

* **状态管理**：组件内部状态使用`ref`和`reactive`，注意在模板中正确解包`.value`
* **计算属性**：合理使用`computed`缓存计算结果，避免在模板中直接调用方法
* **组件通信**：使用`props`和`emit`进行父子组件通信，避免直接修改props
* **性能优化**：
  * 大列表渲染使用虚拟滚动
  * 频繁DOM更新使用`requestAnimationFrame`
  * 使用`v-once`渲染静态内容
  * 合理使用`v-show`和`v-if`
* **组件封装**：保持组件的单一职责，复杂组件拆分为多个子组件

---

## 📡 Trae 接口封装要求

* 所有 API 调用封装在 `src/services/` 下
* 每个模块一个文件，例如 `auth.ts`, `user.ts`
* Trae 实例应统一配置拦截器、baseURL、错误处理
* 页面调用接口仅通过封装方法，不直接调用 Trae

### API封装最佳实践

* 使用TypeScript定义请求和响应类型
* 实现统一的错误处理机制
* 添加请求/响应拦截器处理通用逻辑（如token刷新）
* 支持请求取消功能
* 实现请求重试机制处理网络波动

---

## 🔍 命名与风格规范

* 文件名、组件名、变量名统一使用英文，语义清晰
* 组件 props 命名采用 camelCase 风格
* 文件夹命名采用 kebab-case
* 页面路由名与文件名一一对应

### 代码风格最佳实践

* 使用ESLint和Prettier保持代码风格一致
* 组件方法按生命周期和功能分组
* 提取复杂逻辑为独立函数，保持组件代码简洁
* 使用TypeScript类型定义提高代码可维护性
* 添加必要的代码注释，特别是复杂逻辑和算法

---

## 🧪 开发与构建

```bash
pnpm install     # 安装依赖
pnpm dev         # 本地开发
pnpm build       # 构建生产环境代码
pnpm test        # 运行测试
pnpm lint        # 代码风格检查
```

### 开发最佳实践

* 使用Git Flow工作流管理代码
* 提交前运行lint和测试确保代码质量
* 定期更新依赖包，关注安全漏洞
* 使用环境变量区分开发和生产配置
* 实现自动化测试提高代码质量和可维护性

---

## 🚀 性能优化指南

* **代码分割**：使用动态导入拆分大型组件和路由
* **资源优化**：压缩图片，使用适当格式（WebP, SVG）
* **懒加载**：路由和大型组件使用懒加载
* **缓存策略**：合理使用浏览器缓存和本地存储
* **渲染优化**：
  * 避免不必要的组件重渲染
  * 使用`v-memo`优化列表渲染
  * 大数据列表使用虚拟滚动
  * 使用Web Workers处理复杂计算

---

## 🤖 AI 协作建议 Prompt

```text
请帮我生成一个基于 UnoCSS 风格、支持 title 和 content 的卡片组件。
请给我一个使用 Trae 调用 API 的用户登录模块，带统一的错误处理。
请写一个页面组件，布局为两列，左侧是菜单，右侧是内容区。
```

---

## 📚 Memory Bank 使用规则

项目同步维护 `memory_bank/` 文件夹，它是开发过程中的结构记忆库，用于追踪页面、组件、设计系统与开发阶段。

```
memory_bank/
├── globalContext.md     # 项目背景与目标用户
├── activeContext.md     # 当前开发重点
├── techContext.md       # 技术配置与依赖
├── systemContext.md     # 设计系统设定（颜色/排版）
├── progress.md          # 开发进度与任务追踪
├── attention.md         # 注意事项与坑点记录
├── pageContext.md       # 页面级信息与结构描述
├── componentContext.md  # 组件定义与复用记录
```

* 每新增页面，请同步更新 `pageContext.md`
* 每新增组件，请同步更新 `componentContext.md`
* 所有设计 token、颜色、排版变更应同步记录到 `systemContext.md`
* 任何开发中遇到的坑、hack、workaround，记录至 `attention.md`

### Memory Bank最佳实践

* 定期更新memory_bank文件，保持信息同步
* 在代码评审前检查memory_bank更新情况
* 使用memory_bank作为新成员入职培训资料
* 将常见问题和解决方案添加到attention.md，避免重复踩坑
* 在迭代计划中包含memory_bank的维护任务

---

## 🔧 常见问题与解决方案

### 批量数据处理

* 导入前过滤空行和重复数据
* 添加数据预览和确认步骤
* 使用Web Workers处理大量数据

### 性能优化

* 限制动画中显示的元素数量
* 使用CSS动画代替JavaScript动画
* 考虑使用Canvas绘制复杂动画

### 移动端适配

* 使用响应式网格布局，在小屏幕上调整列数
* 为移动端优化交互方式和操作区域大小
* 调整字体大小和间距以提升可读性

### 浏览器兼容性

* 主要支持现代浏览器（Chrome, Firefox, Safari, Edge）
* 不支持IE11及以下版本
* 移动端浏览器支持iOS Safari和Android Chrome

---

## 📎 补充说明

* 每次添加新页面或新组件时，需同步更新 memory\_bank 中相应的 `pageContext` 或 `componentContext`
* 项目成员必须遵循本规则执行代码提交与评审
* 定期进行代码重构，减少技术债务
* 保持依赖包的更新，关注安全漏洞修复
* 实现自动化测试提高代码质量和可维护性
