/* eslint-disable camelcase */
import request from './request'

export default {
    getDemofile: () => request.get(`/demo-file`),
    getPhageList: () =>
        request.get('/phage/list') as JsonResponse<{
            phageList?: any
        }>,
    getProteinList: () =>
        request.get('/protein/list') as JsonResponse<{
            proteinList?: any
        }>,
}
