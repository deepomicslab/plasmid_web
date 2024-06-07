import { defineStore } from 'pinia'

export const useQueryStore = defineStore('querydata', () => {
    const selectedhostlist = ref()
    const filterdata = ref()
    return {
        selectedhostlist,
        filterdata,
    }
})
