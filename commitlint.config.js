module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'fix', // 修补bug
                'feat', // 新功能（feature）
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 不属于以上类型的其他类型(日常事务)
                'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
                'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
                'perf', // 性能优化
                'revert', // 回滚某个更早之前的提交
            ],
        ],
    },
}
