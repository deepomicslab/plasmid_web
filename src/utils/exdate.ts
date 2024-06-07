/** 格式化时间
 * @param date 待格式化的 Date 对象
 * @param fmt 格式化字符串，例如`'YYYY-mm-dd'`
 */
export function format(date: Date, fmt: string) {
    const opts = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(),
    }

    let result = fmt
    Object.entries(opts).forEach(([k, v]) => {
        const ret = new RegExp(`(${k})`).exec(result)
        if (!ret) return
        const ov = ret[1]
        const nv = ov.length === 1 ? v : v.padStart(ov.length, '0')
        result = result.replace(ov, nv)
    })

    return result
}
