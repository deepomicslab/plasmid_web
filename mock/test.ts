import { MockMethod } from 'vite-plugin-mock'
import fs from 'fs'
import path from 'path'

export default [
    // 返回一个 JSON 数据
    {
        url: '/api/demo-json',
        method: 'get',
        statusCode: 200,
        response: () => {
            return {
                code: 0,
                message: 'ok',
                data: {
                    name: 'vben',
                    age: 27,
                    height: 170,
                },
            }
        },
    },
    {
        url: '/api/demo-err',
        method: 'get',
        response: () => {
            return {
                code: 403,
                message: 'some errors',
            }
        },
    },
    // 返回一个文件
    {
        url: '/api/demo-file',
        method: 'get',
        rawResponse: async (req, res) => {
            const demoCsvPath = path.join(__dirname, 'demo/phage.csv')
            const text = fs.readFileSync(demoCsvPath).toString()
            res.setHeader('Content-Type', 'text/csv')
            res.statusCode = 200
            res.write(text)
            res.end()
        },
    },
    // phagelist
] as MockMethod[]
