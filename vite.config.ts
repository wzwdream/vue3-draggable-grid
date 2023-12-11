
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ],
    build: {
        lib: {
            entry: 'src/index',
            name: 'vue3-draggable-grid',
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
