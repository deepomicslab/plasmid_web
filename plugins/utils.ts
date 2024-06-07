const formatUrl = (raw: string) => {
    const url$1 = raw.startsWith('http') || raw.startsWith('https') ? raw : `http://${raw}`
    const url$2 = url$1.endsWith('/') ? url$1.slice(0, -1) : url$1
    return url$2
}

/**
 * 调整某些环境变量的值，使其表现出预期的形式，例如布尔值
 * @param env 环境变量文件中定义的环境变量字典
 * @returns 校正过的环境变量字典
 */
export function wrapEnv(env: Record<string, string>) {
    const data: Record<string, any> = {}

    Object.entries(env).forEach(([k, v]) => {
        switch (k) {
            // 确保有 http/https 前缀；确保没有 / 后缀
            case 'VITE_BASE_API':
                data[k] = formatUrl(v)
                break

            // 确保值为布尔类型
            case 'VITE_USE_MOCK':
                data[k] = v === 'true'
                break

            // 值默认为字符串类型
            default:
                data[k] = v
        }
    })

    data.VITE_USE_MOCK = data.VITE_USE_MOCK ?? false

    return data
}
