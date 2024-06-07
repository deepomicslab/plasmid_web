import { MockMethod } from 'vite-plugin-mock'
/*eslint-disable*/
export default [
    {
        url: '/api/login',
        method: 'post',
        response: (eid: String, psw: String) => {
            return {
              code: 0,
              msg:'ok',
              data: {
                success: true
              },
            }
          },
    },
] as MockMethod[]
