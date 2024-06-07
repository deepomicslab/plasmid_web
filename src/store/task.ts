import { defineStore } from 'pinia'

export const usetaskStore = defineStore('taskdata', () => {
    const taskdetail = ref({
        results: {
            id: '',
            status: '',
            modulelist: [],
            uploadpath: '',
        },
    })
    return {
        taskdetail,
    }
})
