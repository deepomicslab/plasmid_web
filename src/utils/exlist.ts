import _ from 'lodash'

/**
 * 从指定对象数组中按照指定关键词过滤出目标子集
 * @param records 待过滤的对象数组，每个对象包含多个属性和值，值一般是基本数据类型
 * @param keyword 搜索关键词，空字符串和nil值可以在选项中控制其处理方式
 * @param option.field 在对象的哪些字段中搜索，默认全字段
 * @param option.caseSensitive 是否大小写敏感
 * @param option.returnWhenNilKeyword 搜索关键词为nil时怎么返回搜索结果. 例如执行搜索功能时应该返回所有对象，执行过滤功能时应该返回空数组
 */
export function search<T extends Record<string, unknown>>(
    records: T[],
    keyword: string,
    option?: {
        fields?: string[]
        caseSensitive?: boolean
        returnWhenNilKeyword?: 'all' | 'none'
    }
) {
    const whenNil = option?.returnWhenNilKeyword ?? 'all'
    if ((keyword ?? '') === '') {
        return whenNil === 'all' ? records : []
    }

    const caseSensitive = option?.caseSensitive ?? false
    const toCase = (v: string) => (caseSensitive ? v.toLowerCase() : v)

    const fields = option?.fields ?? Object.keys(records[0])
    const kyword = toCase(keyword)

    return records.filter(
        record =>
            // 只要搜索字段中有一个满足就停止对其余字段值的检查
            fields.findIndex(field => {
                const value = toCase((record[field] as any).toString())
                return value.indexOf(kyword) > -1
            }) > -1
    )
}

/**
 * Build a hash from the specified objects array. The keys of the new hash are all
 * different values of some specified attribute and the values are new objects array
 * with the same attribute values. The single object is shared in memory.
 * @param dataList an objects array.
 * @param key attribute name of object.
 * @returns a new hash whose values are arrays.
 */
export function toHashByKey<T extends SARecord>(dataList: T[], key: string) {
    const hash: Record<string, T[]> = {}
    dataList.forEach(d => {
        if (_.has(hash, d[key])) hash[d[key]].push(d)
        else hash[d[key]] = [d]
    })
    return hash
}

/**
 * Build a hash from the specified objects array. The keys of the new hash are all
 * different values of some specified attribute and the values are the object which
 * firstly appears in the specified objects array. The single object is shared in memory.
 * @param dataList an objects array.
 * @param key attribute name of object.
 * @returns a new hash whose values are the firstly appearing object.
 */
export function toHashByKeyFirst<T extends SARecord>(dataList: T[], key: string) {
    const hash: Record<string, T> = {}
    dataList.forEach(d => {
        if (!_.has(hash, d[key])) hash[d[key]] = d
    })
    return hash
}

/**
 * Build a hash from the specified objects array. The keys of the new hash are all
 * different values of some specified attribute and the values are the object which
 * lastly appears in the specified objects array. The single object is shared in memory.
 * @param dataList an objects array.
 * @param key attribute name of object.
 * @returns a new hash whose values are the lastly appearing object.
 */
export function toHashByKeyLast<T extends SARecord>(dataList: T[], key: string) {
    const hash: Record<string, T> = {}
    dataList.forEach(d => {
        hash[d[key]] = d
    })
    return hash
}
