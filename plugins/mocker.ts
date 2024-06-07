import { viteMockServe } from 'vite-plugin-mock'

export default function configMockerPlugin() {
    return viteMockServe()
}
