<template>
    <div class="flex flex-col justify-center items-center">
        <div class="w-full">
            <div v-if="enableTab">
                <el-tabs
                    v-model="activeName"
                    class="text-xl"
                    type="card"
                    @tab-click="handletabClick"
                >
                    <el-tab-pane v-for="key in taskdata.results.modulelist" :key="key" :name="key">
                        <template #label>
                            <span class="custom-tabs-label text-2xl">
                                <span>{{ key }}</span>
                            </span>
                        </template>
                    </el-tab-pane>
                    <el-scrollbar class="h-150 bg-dark p-4 text-light" v-loading="consoleloading">
                        <n-code
                            :code="taskmoduledetail.tasklogoutput + taskmoduledetail.tasklogerror"
                            word-wrap
                            show-line-numbers
                        />
                    </el-scrollbar>
                </el-tabs>
                <el-scrollbar
                    v-if="!enableTab"
                    class="h-150 bg-dark p-4 text-light"
                    v-loading="consoleloading"
                >
                    <n-code
                        :code="taskmoduledetail.tasklogoutput + taskmoduledetail.tasklogerror"
                        word-wrap
                        show-line-numbers
                    />
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import axios from 'axios'

// const route = useRoute()
// const taskid = computed(() => route.query?.taskid as string)
const consoleloading = ref(false)
const props = defineProps({
    taskid: String,
    moduleName: String,
    enableTab: Boolean,
})

const taskmoduledetail = ref({
    tasklogoutput: '',
    tasklogerror: '',
})
const activeName = ref('')
const taskid = computed(() => props.taskid as string)
const moduleName = computed(() => props.moduleName as String)

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

onBeforeMount(async () => {
    consoleloading.value = true
    console.log({
        taskid: taskid.value,
        moudlename: moduleName.value,
    })
    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response2.data
    const response = await axios.get(`/tasks/detail/log/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            moudlename: moduleName.value,
        },
    })
    taskmoduledetail.value.tasklogerror = response.data.task_error
    taskmoduledetail.value.tasklogoutput = response.data.task_log
    consoleloading.value = false
})
</script>
