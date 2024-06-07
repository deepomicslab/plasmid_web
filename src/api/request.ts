import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // },
})

instance.interceptors.request.use(
    config => config,
    error => {
        window.$message.error('Response timeout!')
        return Promise.resolve(error)
    }
)

/** 响应状态码包含两部分：请求状态和数据状态
 * 请求正常时 response.status = 200, 使用标准的 HTTP 状态码
 * 数据正常时 response.data.code = 0, 使用自定义的业务状态码
 */
instance.interceptors.response.use(
    response => {
        const { status, data } = response
        // 响应状态码不为 200 说明请求异常，交由异常回调处理错误
        if (status !== 200) {
            return Promise.reject(response)
        }

        // 响应对象中没有业务状态码时，说明返回的不是 JSON 数据
        if (data.code === undefined) {
            return Promise.resolve(data)
        }

        const { code, message } = data
        // 业务状态码不为 0 时，说明业务数据出现异常，先打印异常
        if (code !== 0) {
            if (code === 1) {
                window.$message.warning(message, { duration: 8000 })
            } else {
                window.$message.error(message, { duration: 8000 })
            }
        }
        // 正常返回响应体中的 JSON 数据
        return Promise.resolve(data)
    },
    // 处理 HTTP code ≠ 200 的响应，通常是请求错误或者服务器错误
    error => {
        const { status } = error.response
        switch (status) {
            case 400:
                window.$message.error('Request error!')
                break
            case 403:
                window.$message.error('The server has refused to process the request!')
                break
            case 404:
            case 504:
                window.$message.error('Server lost')
                break
            default:
                window.$message.error('Unknown error!')
        }
        return Promise.resolve()
    }
)

export default instance
