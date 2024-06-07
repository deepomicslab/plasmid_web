import ViteRestart from 'vite-plugin-restart'

export default function configRestartPlugin() {
    return ViteRestart({
        restart: ['vite.config.ts', '.env.development'],
    })
}
