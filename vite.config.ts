import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

import { createVitePlugins } from './plugins'
import { wrapEnv } from './plugins/utils'

// https://vitejs.dev/config/
// export default defineConfig(({ command, mode }) => {
export default defineConfig(({ mode }) => {
    const env = wrapEnv(loadEnv(mode, process.cwd()))
    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        plugins: createVitePlugins(env),
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    // 生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        // 开发服务器选项
        server: {
            host: env.VITE_HOST ?? 'localhost',
            port: env.VITE_PORT ?? '8328',
            proxy: {
                // 配置 api 代理解决跨域问题
                '/api': {
                    target: env.VITE_BASE_API,
                    changeOrigin: true,
                    // rewrite: p => p.replace(/^\/api/, ''),
                },
            },
        },
    }
})
