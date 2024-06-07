module.exports = {
    root: true,
    plugins: ['stylelint-order', 'stylelint-scss'],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-recess-order',
    ],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['apply'],
            },
        ],
        // 不要使用已被 autoprefixer 支持的浏览器前缀
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
    },
}
