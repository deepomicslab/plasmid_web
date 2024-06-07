import { defineStore } from 'pinia'

export const useVisualizeStore = defineStore('visualizedata', () => {
    const fileapi = ref('http://localhost:8328/')
    return {
        fileapi,
    }
})
