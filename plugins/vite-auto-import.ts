import AutoImport from 'unplugin-auto-import/vite'

export default function configAutoImportPlugin() {
    return AutoImport({
        // https://github.com/antfu/unplugin-auto-import#configuration
        include: [/\.ts$/, /\.vue$/, /\.md$/],
        imports: [
            'vue',
            'vue-router',
            {
                'vue-request': ['useRequest', 'usePagination'],
                '@vueuse/core': [
                    'watchOnce', // 监听一次后立即移除监听
                    'useDraggable', // 拖动元素
                    'useFocus',
                    'useWindowSize', // 获取窗口大小
                    'onClickOutside', // 点击指定元素外部区域
                ],
                '@/composables/global': [
                    'useHTMLElementRef', // 用于代理组件或者元素的响应式变量
                ],
            },
        ],
        dts: 'src/typings/auto-import.d.ts',
        eslintrc: {
            enabled: true,
            filepath: '.eslintrc-auto-import.json',
            globalsPropValue: true,
        },
    })
}
