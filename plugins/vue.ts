import vue from '@vitejs/plugin-vue'

export default function configVuePlugin() {
    return vue({
        reactivityTransform: true,
    })
}
