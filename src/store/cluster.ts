import { defineStore } from 'pinia'

export const useClusterStore = defineStore('clusterdata', () => {
    const clusterdata = ref({
        id: 0,
        cluster: '',
        subclusters: 0,
        member: 0,
        average_length: '0.0',
        average_gc: '0.0',
        average_genes: '0.0',
    })
    const funcount = ref([] as any[])
    const treetext = ref([] as any[])
    const tasktreetext = ref('')
    const taskclusterdata = ref([] as any[])
    const taskclustercount = ref([] as any[])
    const dataload = ref(false)

    return {
        clusterdata,
        funcount,
        treetext,
        tasktreetext,
        taskclusterdata,
        taskclustercount,
        dataload,
    }
})
