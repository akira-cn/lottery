import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      primary: {
        50: 'rgba(var(--color-primary), 0.05)',
        100: 'rgba(var(--color-primary), 0.1)',
        200: 'rgba(var(--color-primary), 0.2)',
        300: 'rgba(var(--color-primary), 0.3)',
        400: 'rgba(var(--color-primary), 0.4)',
        500: 'rgba(var(--color-primary), 0.5)',
        600: 'rgba(var(--color-primary), 0.6)',
        700: 'rgba(var(--color-primary), 0.7)',
        800: 'rgba(var(--color-primary), 0.8)',
        900: 'rgba(var(--color-primary), 0.9)',
      },
    },
  },
  shortcuts: {
    'btn': 'px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
    'btn-primary': 'btn bg-primary-500 hover:bg-primary-600 text-white',
    'card': 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-4',
    'input': 'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500',
  },
  safelist: [
    'animate-bounce',
  ],
})