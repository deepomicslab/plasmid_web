<template>
    <div class="flex flex-col justify-center items-center">
        <div class="mt-10 w-9/10 mb-10" v-if="props.enableTable">
            <el-descriptions class="text-lg" :column="2" size="large" border v-loading="loading">
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">taskid</div>
                    </template>
                    {{ taskid }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">name</div>
                    </template>
                    {{ taskdata.results.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">modulelist</div>
                    </template>
                    <div class="flex flex-row justify-start w-110 flex-wrap">
                        <el-tag
                            v-for="key in taskdata.results.modulelist"
                            :key="key"
                            type="primary"
                            class="ml-2 mb-2"
                        >
                            {{ key }}
                        </el-tag>
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">task_status</div>
                    </template>
                    <el-tag
                        :type="taskdata.results.status === 'Success' ? 'success' : 'warning'"
                        size="large"
                    >
                        {{ taskdata.results.status }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">analysis_type</div>
                    </template>
                    {{ taskdata.results.analysis_type }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">created_at</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-9/10" v-if="props.enableTab">
            <el-tabs
                v-model="activeName"
                class="text-xl"
                type="card"
                @tab-click="handletabClick"
                v-loading="loading"
            >
                <el-tab-pane v-for="key in taskdata.results.modulelist" :key="key" :name="key">
                    <template #label>
                        <span class="custom-tabs-label text-2xl">
                            <span>{{ key }}</span>
                        </span>
                    </template>
                </el-tab-pane>
                <el-scrollbar :class="logStyle" v-loading="consoleloading">
                    <n-code
                        :code="taskmoduledetail.tasklogoutput + taskmoduledetail.tasklogerror"
                        word-wrap
                        show-line-numbers
                    />
                </el-scrollbar>
            </el-tabs>
        </div>
        <div class="w-full" v-if="!props.enableTab">
            <el-scrollbar class="h-150 bg-dark p-4 text-light" v-loading="consoleloading">
                <n-code
                    :code="taskmoduledetail.tasklogoutput + taskmoduledetail.tasklogerror"
                    word-wrap
                    show-line-numbers
                />
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import axios from 'axios'

// const route = useRoute()
// const taskid = computed(() => route.query?.taskid as string)

const props = defineProps({
    taskid: String,
    enableTable: Boolean,
    enableTab: Boolean,
    moduleName: String,
})
const moduleName = computed(() => props.moduleName as String)
const taskid = computed(() => {
    return props.taskid as string
})
const activeName = ref('')
const taskdata = ref({
    results: {
        modulelist: [] as any[],
        task_detail: {
            analysis_type: '',
            task_status: '',
        },
        status: '',
        analysis_type: '',
        created_at: '',
        name: '',
    },
})
const taskmoduledetail = ref({
    module_id: '',
    status: '',
    tasklogoutput: '',
    tasklogerror: '',
})
const loading = ref(false)
const consoleloading = ref(false)
// const logStyle = computed(
//     () => {
//         console.log('log style')
//         return 'h-96 bg-dark p-4 text-light' ? props.enableTable : 'h-150 bg-dark p-4 text-light'
//     }
//     // 'h-96 bg-dark p-4 text-light' ? props.enableTable : 'h-150 bg-dark p-4 text-light'
// )
const logStyle = ref('h-150 bg-dark p-4 text-light')

const fetchData = async () => {
    loading.value = true
    consoleloading.value = true
    let module
    if (props.enableTab || props.enableTable) {
        const response2 = await axios.get(`/tasks/detail/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                taskid: taskid.value,
            },
        })
        taskdata.value = response2.data
        const { modulelist } = response2.data.results
        taskdata.value.results.modulelist = JSON.parse(modulelist.replace(/'/g, '"'))
        taskdata.value.results.task_detail = JSON.parse(response2.data.results.task_detail)
        const firstModule = taskdata.value.results.modulelist.slice(0, 1)[0]
        activeName.value = firstModule
        module = firstModule
        loading.value = false
    }

    if (!module) {
        module = moduleName.value
    }

    const response3 = await axios.get(`/tasks/detail/log/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            moudlename: module,
        },
    })
    taskmoduledetail.value.tasklogerror = response3.data.task_error
    taskmoduledetail.value.tasklogoutput = response3.data.task_log
    consoleloading.value = false
}

onBeforeMount(async () => {
    await fetchData()
})

watch(taskid, async () => {
    await fetchData()
})

const handletabClick = async (tab: any) => {
    consoleloading.value = true
    const response3 = await axios.get(`/tasks/detail/log/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            moudlename: tab.props.name,
        },
    })
    taskmoduledetail.value.tasklogerror = response3.data.task_error
    taskmoduledetail.value.tasklogoutput = response3.data.task_log
    consoleloading.value = false
}
</script>
