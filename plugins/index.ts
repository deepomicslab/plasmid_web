import vueLayoutsPlugin from 'vite-plugin-vue-layouts'
import windicssPlugin from 'vite-plugin-windicss'
import svgLoader from 'vite-svg-loader'
import iconsPlugin from 'unplugin-icons/vite'
import vueSetupExtendPlugin from 'vite-plugin-vue-setup-extend'
import compressionPlugin from 'vite-plugin-compression'
import md2vuePlugin from 'vite-plugin-md2vue'

import configVuePlugin from './vue'
import configPagesPlugin from './pages'
import configAutoImportPlugin from './vite-auto-import'
import configAutoComponentPlugin from './vite-auto-component'
// import configRestartPlugin from './vite-restart'
import configEslintPlugin from './eslint'
import configMockerPlugin from './mocker'

type Env = Record<string, any>

export function createVitePlugins(env: Env) {
    const plugins = [
        configVuePlugin(),
        vueSetupExtendPlugin(),
        configPagesPlugin(),
        vueLayoutsPlugin(),
        configAutoImportPlugin(),
        configAutoComponentPlugin(),
        windicssPlugin(),
        svgLoader(),
        iconsPlugin(),
        // configRestartPlugin(),
        compressionPlugin(),
        md2vuePlugin(),
        configEslintPlugin(),
    ]
    if (env.VITE_USE_MOCK) {
        plugins.push(configMockerPlugin())
    }
    return plugins
}
