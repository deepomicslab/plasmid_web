/* eslint-disable camelcase */
import request from './request'

export default {
    getPhageList: (page: number, pageSize: number) =>
        request.get('/phage/', {
            params: {
                page,
                pagesize: pageSize,
            },
        }) as listResponse,
    getPhagedetail: (phageid: string) => request.get(`/phage/${phageid}`, {}) as any,
}
