import _ from 'lodash'

/** 将字符串转化为基本数据类型 */
export function retype(v: string, type: BaseType) {
    switch (type) {
        case 'number':
            return _.toNumber(v)
        case 'boolean':
            return ['t', 'true', 'yes'].includes(_.toLower(v))
        case 'symbol':
            throw Error(`Unsupported target type: ${type}`)
        default:
            return v
    }
}

export interface ValidateVariantStringOption {
    /** 测试染色体名称，不提供则不进行测试 */
    chromNames?: string[]
    /** 测试突变位置，不提供则不测试 */
    chromLens?: number[]
    /** 0/1坐标系，默认为 0 坐标系 */
    coord?: 0 | 1
    /** not realized */
    nucleinType?: 'dna' | 'rna'
}

/** 验证突变字符串是否合法，形如 chr1:12344 */
export const validateVariantString = (
    variant: Nilable<string>,
    option?: ValidateVariantStringOption
) => {
    if (variant === undefined || variant === null || variant === '') return undefined

    const a = variant.split(':')
    if (a.length < 2) {
        return 'Must provide chromosome and position'
    }

    const coord = option?.coord ?? 0

    // 位置字段必须全部是数字
    if (/^\d+$/.exec(a[1]) === null) return `Wrong position: ${a[1]}`
    const pos = +a[1]

    // 测试染色体名称是否合法
    if (option?.chromNames) {
        const index = option.chromNames.indexOf(a[0])
        if (index === -1) return `Wrong chromosome: ${a[0]}`

        // 测试位置是否合法
        if (option.chromLens) {
            const chrSize = option.chromLens[index]
            const maxp = chrSize + coord - 1
            if (pos < coord || pos > maxp) {
                return `Position out of range: [${coord}, ${maxp}]`
            }
        }
    }

    return undefined
}
