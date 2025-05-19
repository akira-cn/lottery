<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <header class="py-4 px-6 bg-primary-100 dark:bg-primary-900 shadow-sm">
      <h1 class="text-2xl font-bold text-primary-600 dark:text-primary-400">抽奖系统</h1>
    </header>
    <main class="container mx-auto py-6 px-4">
      <LotteryPage />
    </main>
  </div>
</template>

<script setup>
import LotteryPage from './pages/LotteryPage.vue';
</script>

<style>
:root {
  --color-primary: 59, 130, 246; /* blue-500 */
  --color-secondary: 99, 102, 241; /* indigo-500 */
  --color-success: 16, 185, 129; /* emerald-500 */
  --color-warning: 245, 158, 11; /* amber-500 */
  --color-error: 239, 68, 68; /* red-500 */
  --color-background: 249, 250, 251; /* gray-50 */
  --color-surface: 255, 255, 255; /* white */
  --color-text: 31, 41, 55; /* gray-800 */
  
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  --font-body: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-heading: var(--font-body);
}

.dark {
  --color-background: 17, 24, 39; /* gray-900 */
  --color-surface: 31, 41, 55; /* gray-800 */
  --color-text: 243, 244, 246; /* gray-100 */
}

html, body {
  font-family: var(--font-body);
}

.bg-primary-100 {
  background-color: rgba(var(--color-primary), 0.1);
}

.bg-primary-900 {
  background-color: rgba(var(--color-primary), 0.9);
}

.text-primary-400 {
  color: rgba(var(--color-primary), 0.4);
}

.text-primary-600 {
  color: rgba(var(--color-primary), 0.6);
}
</style>