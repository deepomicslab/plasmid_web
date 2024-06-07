module.exports = {
    env: {
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'airbnb-base',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json',
    ],
    settings: {
        // plugins 下的 ts 文件属于 vite 后端微服务识别的内容，它们之间的相互导入需要额外配置。因为 eslint 默认只处理 src 目录下的模块之间的相互导入。报错：`Unable to resolve path to module './vue'. eslint(import/no-unresolved)`，解决办法参考 https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module
        // 'import/resolver': {
        //     node: {
        //         extensions: ['.js', '.jsx', '.ts', '.tsx'],
        //     },
        // },
    },
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // 禁止在提交代码中出现 console 语句
        'no-console': 'warn',

        // eslint-plugin-vue 插件提供的规范中，项目的自定义组件除了 App 外都需要使用多个单词命名，例如 HelloWorld.vue
        // 使用动态路由时可以禁用这个选项
        'vue/multi-word-component-names': 'off',

        // 允许从 devDependencies 导入资源
        'import/no-extraneous-dependencies': [
            'off',
            {
                devDependencies: false,
            },
        ],

        // 'import/no-unresolved': [
        //     'error',
        //     {
        //         // eslint 识别不了的特殊模块
        //         ignore: [
        //             'virtual:*',
        //             'unplugin-icons/vite',
        //             'unplugin-auto-import/vite',
        //             'unplugin-vue-components/vite',
        //             'resolver*',
        //         ],
        //     },
        // ],
        'import/no-unresolved': 0,

        // 模块只有一个导出时，eslint 会核善的提醒你要使用默认导出，禁用它
        'import/prefer-default-export': 'off',

        // 导入 ts 文件时不需要加 .ts 后缀
        'import/extensions': [
            'error',
            {
                ts: 'never',
            },
        ],

        // 部分 ts 自动导入的全局类型报错不知道咋解决，干脆全部禁了
        'no-undef': 0,

        'no-unused-expressions': 0,

        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                printWidth: 100,
            },
        ],
    },
}
