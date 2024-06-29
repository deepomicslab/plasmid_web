<template>
    <div class="flex flex-col w-full">
        <el-scrollbar class="w-full" ref="scrollbarRef">
            <div class="flex flex-col h-400">
                <div class="font-600 ml-20 mt-16 flex flex-row border-b-2 w-9/10 pb-5">
                    <div class="text-4xl text-[#253959]">tRNA & tmRNA prediction</div>
                    <el-button
                        round
                        size="large"
                        color="#EE7E7D"
                        class="text-white hover:text-white focus:text-white active:text-white ml-20"
                        @click="submitdemo"
                    >
                        Run Demo
                    </el-button>
                    <el-button
                        round
                        size="large"
                        color="#EE7E7D"
                        class="ml-5 text-white hover:text-white focus:text-white active:text-white"
                        @click="godemo"
                    >
                        View Demo Result
                    </el-button>
                    <el-button round size="large" color="#069" @click="gosubmithelper">
                        Submission Helper
                    </el-button>
                    <el-button round size="large" color="#069" class="ml-5">
                        <a
                            href="https://github.com/deepomicslab/plasmid_web/issues"
                            target="_blank"
                            class="btn"
                        >
                            Report bug
                        </a>
                    </el-button>
                </div>
                <div class="text-lg font-500 ml-20 mt-3 w-9/10 flex flex-row">
                    It takes a few minutes to
                    <p class="text-[#EE7E7D] mx-2">RUN DEMO.</p>
                    Click
                    <p class="text-[#EE7E7D] mx-2">VIEW DEMO RESULT</p>
                    to see the precomputed demo results immediately.
                </div>
                <div class="font-600 text-3xl ml-20 mt-10">
                    1. Input Sequence
                    <n-button
                        text
                        href="https://plasmid.deepomics.org/dataExample/data_demo/plasmid.fasta"
                        tag="a"
                        target="_blank"
                        type="primary"
                        class="text-lg"
                    >
                        See Example FASTA sequence
                    </n-button>
                </div>
                <div class="ml-25 mt-5 flex flex-row mb-5">
                    <div class="font-500 text-2xl">Select an input type:</div>

                    <div class="ml-5">
                        <n-radio-group v-model:value="inputtype">
                            <n-radio-button value="upload">UPLOAD FILE</n-radio-button>
                            <n-radio-button value="enter">ENTER Plasmid ID</n-radio-button>
                            <n-radio-button value="paste">PASTE SEQUENCE</n-radio-button>
                        </n-radio-group>
                    </div>
                </div>

                <div class="flex flex-row justify-center">
                    <div
                        class="rounded w-190 h-90 mt-5 rounded-2xl"
                        style="box-shadow: 0 0 64px #cfd5db"
                        v-if="inputtype === 'upload'"
                    >
                        <n-upload
                            v-model:file-list="fileList"
                            directory-dnd
                            :default-upload="false"
                            accept=".fasta,.fa"
                            @update:file-list="handleFileListChange"
                            @remove="remove"
                            show-remove-button
                        >
                            <n-upload-dragger>
                                <div class="flex flex-col justify-center items-center">
                                    <div class="text-[90px] mt-10" style="color: #028090">
                                        <i-fa-cloud-upload />
                                    </div>
                                    <p class="text-h5 mt-3 font-light" style="color: #028090">
                                        Click or drag a file to this area to upload your file
                                    </p>

                                    <p
                                        class="text-sp mt-3 mb-3 text-opacity-100"
                                        style="color: #f07167"
                                    >
                                        Fasta file size should be less than 10MB
                                    </p>
                                    <p class="text-sp mb-3 text-opacity-100" style="color: #f07167">
                                        Supported formats: .fasta / .fa
                                    </p>
                                </div>
                            </n-upload-dragger>
                        </n-upload>
                    </div>

                    <div
                        class="rounded w-200 h-80 mt-5 rounded-2xl flex-col flex justify-center items-center"
                        style="box-shadow: 0 0 64px #cfd5db"
                        v-if="inputtype === 'enter'"
                    >
                        <div class="text-lg flex flex-row mb-2">
                            Enter the
                            <p class="text-red-400 mx-2">Plasmid IDs</p>
                            that already exist in the database, separated by
                            <p class="text-red-400 mx-2 font-900">' ; '</p>
                        </div>

                        <div class="w-130 mt-4 flex flex-row">
                            <n-form
                                ref="formRef"
                                :model="inputformValue"
                                class="w-130"
                                label-placement="left"
                                size="large"
                            >
                                <n-form-item
                                    label="Phage IDs"
                                    path="phage"
                                    :validation-status="validationstatus"
                                    :show-require-mark="true"
                                >
                                    <n-input-group>
                                        <n-input
                                            size="large"
                                            round
                                            placeholder="Phage ID"
                                            clearable
                                            v-model:value="inputformValue.phage"
                                        ></n-input>
                                        <n-button
                                            size="large"
                                            round
                                            ghost
                                            @click="confirmids"
                                            :type="validationstatus"
                                        >
                                            Confirm
                                        </n-button>
                                    </n-input-group>
                                </n-form-item>
                            </n-form>
                        </div>
                        <div class="flex flex-row">
                            <p class="text-red-400 mx-2">Example:</p>
                            PLSDB_NZ_CP035950.1;COMPASS_NZ_CP011350.1;IMGPR_plasmid_2757320406_000001
                        </div>
                        <div v-show="inputfeedback.length !== 0" class="mt-5">
                            <n-alert :type="validationstatus">
                                {{ inputfeedback }}
                            </n-alert>
                        </div>
                    </div>
                    <div
                        class="rounded w-240 h-100 mt-5 rounded-2xl flex-col flex justify-center items-center"
                        style="box-shadow: 0 0 64px #cfd5db"
                        v-if="inputtype === 'paste'"
                    >
                        <div class="text-lg mb-6 w-190">
                            Paste a fasta formatted nucleotide sequence.
                        </div>
                        <div class="w-190 mt-1 flex flex-row text-lg">
                            <n-input
                                round
                                placeholder="Nucleotide Sequence"
                                type="textarea"
                                clearable
                                :rows="10"
                                v-model:value="pastefile"
                            ></n-input>
                        </div>
                        <div class="mt-4">
                            <el-switch
                                active-text="Use Example"
                                size="large"
                                class="mr-7"
                                v-model="exampleSwicth"
                                @change="examplechange"
                            />
                            <n-button-group>
                                <n-button round size="large" class="w-50">Paste</n-button>
                                <n-button round size="large" class="w-50">Copy</n-button>
                            </n-button-group>
                        </div>
                    </div>
                </div>
                <div class="mt-20 flex flex-row justify-center">
                    <el-button
                        size="large"
                        color="#069"
                        :width="70"
                        class="text-white hover:text-white focus:text-white active:text-white text-2xl"
                        @click="submit"
                    >
                        Submit
                    </el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui'
// import { RefreshRightSearch } from '@element-plus/icons-vue'
// import { Edit } from '@element-plus/icons-vue'
import axios from 'axios'
import { FormInst } from 'naive-ui'
import { useUserIdGenerator } from '@/utils/userIdGenerator'

const fileList = ref<UploadFileInfo[]>([])
const submitfile = ref<File>()
const inputtype = ref('upload')
const pastefile = ref('')
const userid = ref('')

// input phage ids
const inputformValue = ref({ phage: '' })
const idlist = ref([])
const formRef = ref<FormInst | null>(null)
const inputfeedback = ref('')
const validationstatus = ref()
const isconfirmed = ref(false)
const confirmids = async () => {
    const checkdata = new FormData()
    if (inputformValue.value.phage.length === 0) {
        inputfeedback.value = 'Please input plasmid id'
        validationstatus.value = 'error'
    } else {
        checkdata.append('phageids', inputformValue.value.phage)
        const response = await axios.post(`/check_plasmid_ids/`, checkdata, {
            baseURL: '/api/analysis',
            timeout: 100000,
        })
        const res = response.data
        idlist.value = res.idlist
        validationstatus.value = res.status
        inputfeedback.value = res.message
        isconfirmed.value = true
    }
}
const exampleSwicth = ref(false)

const examplechange = async () => {
    console.log(exampleSwicth.value)
    if (exampleSwicth.value) {
        const fileURL = new URL(
            '../../../../../public/dataExample/data_demo/plasmid.fasta',
            import.meta.url
        )
        const response = await fetch(fileURL)
        const content = await response.text()
        console.log(content)
        pastefile.value = content
    } else {
        pastefile.value = ''
    }
}
/* eslint-disable */
const handleFileListChange = (data: UploadFileInfo[]) => {
    if (data[0].name.match(/(.fasta)$/g) === null && data[0].name.match(/(.fa)$/g) === null) {
        window.$message.error('Uploaded file must be fasta format.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data[0].file?.size === 0 || data[0].file?.size === undefined) {
        window.$message.error('Uploaded file cannot be empty.', { closable: true, duration: 5000 })
        data.pop()
    } else if (data[0].file.size / 1024 / 1024 > 10) {
        window.$message.error('Uploaded file cannot exceed 10MB.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data.length > 1) {
        window.$message.error('Cannot upload more than one files.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data.length === 1) {
        submitfile.value = data[0].file
        fileList.value[0] = data[0]
    }
}
const remove = () => {
    submitfile.value = undefined
    fileList.value.pop()
}
const router = useRouter()

const godemo = () => {
    router.push({
        path: '/task/result/annopipline/trna',
        query: { taskid: 108 },
    })
}

const modulelist = ref({
    annotation: false,
    quality: false,
    host: false,
    lifestyle: false,
    trna: true,
    anticrispr: false,
    transmembrane: false,
    terminator: false,
})
const submit = async () => {
    const submitdata = new FormData()
    submitdata.append('rundemo', 'false')
    submitdata.append('modulelist', JSON.stringify(modulelist.value))
    const precheck = ref(false)

    // check empty
    if (inputtype.value === 'upload') {
        if (typeof submitfile.value === 'undefined') {
            window.$message.error('Please upload file', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
        } else {
            submitdata.append('submitfile', submitfile.value as File)
            precheck.value = true
        }
    } else if (inputtype.value === 'paste') {
        if (pastefile.value.length > 0) {
            submitdata.append('file', pastefile.value)
            precheck.value = true
        } else {
            window.$message.error('Please input sequence', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
        }
    } else {
        if (isconfirmed.value){
            if (idlist.value.length > 0) {
            submitdata.append('phageid', JSON.stringify(idlist.value))
            precheck.value = true
        } else {
            window.$message.error('The number of Plasmid IDs you entered is 0.', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
        }
        }
        else{
            window.$message.error('Please click the confirm button first to check if the IDs you entered are correct.', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
        }
    }


    if (precheck.value) {
        submitdata.append('analysistype', 'tRNA & tmRNA gene annotation')
        submitdata.append('userid', userid.value)
        //submitdata.append('user', 'demo')
        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/submit_task/`, submitdata, {
            baseURL: '/api/analysis',
            timeout: 100000,
        })
        const { data } = response
        if (data.status === 'Success') {
            window.$message.success(data.message, {
                closable: true,
                duration: 5000,
            })
            router.push({
                path: '/workspace/',
            })
        } else {
            window.$message.error(data.message, {
                closable: true,
                duration: 5000,
            })
        }
    }
}

const submitdemo = async () => {
    const submitdata = new FormData()
    submitdata.append('modulelist', JSON.stringify(modulelist.value))
    submitdata.append('rundemo', 'true')
    const precheck = ref(true)
    if (precheck.value) {
        submitdata.append('analysistype', 'tRNA & tmRNA gene annotation')
        submitdata.append('userid', userid.value)
        //submitdata.append('user', 'demo')
        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/submit_task/`, submitdata, {
            baseURL: '/api/analysis',
            timeout: 100000,
        })
        const { data } = response
        if (data.status === 'Success') {
            window.$message.success(data.message, {
                closable: true,
                duration: 5000,
            })
            router.push({
                path: '/workspace/',
            })
        } else {
            window.$message.error(data.message, {
                closable: true,
                duration: 5000,
            })
        }
    }
}
onBeforeMount(() => {
    const { userId, getUserIdFromCookie } = useUserIdGenerator()
    getUserIdFromCookie()
    userid.value = userId.value as string
})
const gosubmithelper = () => {
    router.push({ path: '/tutorial', query: { type: 'analysis' } })
}
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__content) {
    height: 48px !important;
}
</style>
