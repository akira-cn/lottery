# 设计系统设定

## 颜色系统

### 基础颜色变量

```css
:root {
  --color-primary: 59, 130, 246; /* blue-500 */
  --color-secondary: 99, 102, 241; /* indigo-500 */
  --color-success: 16, 185, 129; /* emerald-500 */
  --color-warning: 245, 158, 11; /* amber-500 */
  --color-error: 239, 68, 68; /* red-500 */
  --color-background: 249, 250, 251; /* gray-50 */
  --color-surface: 255, 255, 255; /* white */
  --color-text: 31, 41, 55; /* gray-800 */
}

.dark {
  --color-background: 17, 24, 39; /* gray-900 */
  --color-surface: 31, 41, 55; /* gray-800 */
  --color-text: 243, 244, 246; /* gray-100 */
}
```

### 颜色使用规范

- **主色调**：使用`--color-primary`作为应用的主要品牌色，用于按钮、链接和强调元素
- **辅助色**：使用`--color-secondary`作为辅助色，用于次要按钮和装饰元素
- **功能色**：
  - `--color-success`：表示成功状态和积极操作
  - `--color-warning`：表示警告和需要注意的信息
  - `--color-error`：表示错误和危险操作
- **中性色**：
  - `--color-background`：页面背景色
  - `--color-surface`：卡片和容器背景色
  - `--color-text`：文本颜色

### 颜色透明度变体

使用rgba函数和CSS变量创建不同透明度的颜色变体：

```css
.bg-primary-100 {
  background-color: rgba(var(--color-primary), 0.1);
}

.text-primary-600 {
  color: rgba(var(--color-primary), 0.6);
}
```

## 排版系统

### 字体

```css
:root {
  --font-body: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-heading: var(--font-body);
}
```

### 字体大小

使用UnoCSS提供的工具类：

- `text-xs`: 0.75rem
- `text-sm`: 0.875rem
- `text-base`: 1rem (默认)
- `text-lg`: 1.125rem
- `text-xl`: 1.25rem
- `text-2xl`: 1.5rem
- `text-3xl`: 1.875rem

### 字重

- `font-normal`: 400
- `font-medium`: 500
- `font-semibold`: 600
- `font-bold`: 700

## 间距系统

使用UnoCSS提供的工具类：

- `p-1`, `m-1`: 0.25rem (4px)
- `p-2`, `m-2`: 0.5rem (8px)
- `p-3`, `m-3`: 0.75rem (12px)
- `p-4`, `m-4`: 1rem (16px)
- `p-5`, `m-5`: 1.25rem (20px)
- `p-6`, `m-6`: 1.5rem (24px)

## 圆角系统

```css
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}
```

使用UnoCSS工具类：

- `rounded-sm`: var(--radius-sm)
- `rounded`: var(--radius-md)
- `rounded-lg`: var(--radius-lg)
- `rounded-xl`: var(--radius-xl)
- `rounded-full`: 9999px (圆形)

## 阴影系统

使用UnoCSS提供的工具类：

- `shadow-sm`: 小阴影
- `shadow`: 中等阴影
- `shadow-md`: 中大阴影
- `shadow-lg`: 大阴影

## 响应式断点

使用UnoCSS提供的响应式前缀：

- `sm:`: 640px及以上
- `md:`: 768px及以上
- `lg:`: 1024px及以上
- `xl:`: 1280px及以上
- `2xl:`: 1536px及以上

## 组件样式规范

### 按钮

- 主要按钮：`bg-primary-500 hover:bg-primary-600 text-white rounded-lg`
- 次要按钮：`bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200`

### 卡片

- 基础卡片：`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4`

### 输入框

- 基础输入框：`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500`

### 标签

- 基础标签：`px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200`