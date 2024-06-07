/* eslint-disable camelcase */
import request from './request'

export default {
    login: (eid: String, psw: String) =>
        request.post('/login', eid, psw) as JsonResponse<{
            success?: boolean
        }>,
    signup: (eid: String, psw: String) =>
        request.post('/login', eid, psw) as JsonResponse<{
            success?: boolean
        }>,
}
