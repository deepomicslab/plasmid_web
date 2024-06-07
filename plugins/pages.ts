import Pages from 'vite-plugin-pages'

export default function configPagesPlugin() {
    // https://github.com/hannoeru/vite-plugin-pages#configuration
    return Pages({
        // An array of glob patterns to exclude matches.
        exclude: ['**/components/*', '**/helpers/*', '**/helper.ts', '**/composables/**'],
    })
}
