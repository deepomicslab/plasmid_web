module.exports = {
    printWidth: 100, //单行长度
    tabWidth: 4, //缩进长度
    useTabs: false, //使用空格代替tab缩进
    semi: false, //句末使用分号
    singleQuote: true, //使用单引号
    trailingComma: 'es5', // 多行时尽可能打印尾随逗号
    bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
    arrowParens: 'avoid', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
    endOfLine: 'lf', //结束行形式
    // 包裹文字时候结束标签的结尾尖括号掉到了下一行
    htmlWhitespaceSensitivity: 'ignore',
}
