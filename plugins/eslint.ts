import eslintPlugin from 'vite-plugin-eslint'

export default function configEslintPlugin() {
    // https://www.npmjs.com/package/vite-plugin-eslint
    return eslintPlugin({
        // decrease execution time
        cache: true,
        // 是否自动修复源代码，默认为 false
        fix: true,
        // 需要检查的文件，下面为默认值
        include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        // 不需要检查的文件，下面为默认值
        exclude: 'node_modules',
        formatter: 'stylish',
    })
}
