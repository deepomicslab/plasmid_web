import _ from 'lodash'

/** 比较两个对象的指定键的值是否相等 */
export function isEqual(x: SARecord, y: SARecord, keys?: string[]) {
    const keys$1 = keys ?? _.uniq([..._.keys(x), ..._.keys(y)])
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < keys$1.length; index++) {
        const attr = keys$1[index]
        if (x[attr] !== y[attr]) {
            return false
        }
    }
    return true
}

/** 只重写目标对象中已经存在的键的值 */
export function assignExistingKeys(target: SARecord, source: SARecord) {
    _.keys(target).forEach(k => {
        if (_.has(source, k)) {
            // eslint-disable-next-line no-param-reassign
            target[k] = source[k]
        }
    })
}

/** 计算目标对象中与参考对象值不相等的子属性集合 */
export function diffFrom(target: SARecord, ref: SARecord) {
    const keys = _.keys(target).filter(k => target[k] !== ref[k])
    return _.pick(target, keys)
}
