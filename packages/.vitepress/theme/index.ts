import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@ruabick/vitepress-demo-block'
import '@ruabick/vitepress-demo-block/dist/style.css'

export default {
  ...DefaultTheme,
  NotFound: () => 'custom 404',
  enhanceApp({ app }) {
    app.component('demo', DemoBlock)
  }
}
