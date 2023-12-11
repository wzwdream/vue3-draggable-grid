import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'

export default defineConfig({
  base: '/vue3-draggable-grid/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/vue3-draggable-grid/Grid.svg'
      }
    ]
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      title: 'vue3-draggable-grid',
      description: 'vue3拖拽栅格布局',
      label: '简体中文',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
          { text: '演示', link: '/demo/', activeMatch: '^/demo/' },
          { text: 'API', link: '/api/', activeMatch: '^/api/' },
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '使用说明', link: '/guide/' }
            ]
          },
          {
            text: '演示',
            items: [
              { text: '基本使用', link: '/demo/index' },
              { text: '设置拖拽元素', link: '/demo/settingDragElement' },
              { text: '防止碰撞', link: '/demo/crashPrevention' },
              { text: '动态修改', link: '/demo/dynamicChanges' },
            ]
          },
          {
            text: 'API',
            items: [
              { text: 'API', link: '/api/' }
            ]
          }
        ],
      }
    },
    en: {
      lang: 'en-US',
      title: 'vue3-draggable-grid',
      description: 'vue3 drag and drop grid layout',
      label: 'English',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/', activeMatch: '^/guide/' },
          { text: 'Demo', link: '/en/demo/', activeMatch: '^/demo/' },
          { text: 'API', link: '/en/api/', activeMatch: '^/api/' },
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Directions', link: '/en/guide/' }
            ]
          },
          {
            text: 'Demo',
            items: [
              { text: 'Basic use', link: '/en/demo/index' },
              { text: 'Setting Drag Element', link: '/demo/settingDragElement' },
              { text: 'Crash Prevention', link: '/demo/crashPrevention' },
              { text: 'Dynamic changes', link: '/demo/dynamicChanges' },
            ]
          },
          {
            text: 'API',
            items: [
              { text: 'API', link: '/en/api/' },
            ]
          }
        ],
      }
    }
  },
  themeConfig: {
    logo: '/Grid.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wzwdream/vue3-draggable-grid' }
    ],

    search: {
      provider: 'local'
    },
  },
  lastUpdated: true,
  markdown: {
    config: (md) => {
      applyPlugins(md)
    }
  }
})
