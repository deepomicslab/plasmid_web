<template>
    <div class="flex flex-col w-full">
        <el-scrollbar class="w-full" ref="scrollbarRef" v-loading="loading">
            <div class="flex flex-col h-550">
                <div class="font-600 ml-20 mt-16 flex flex-row border-b-2 w-9/10 pb-5">
                    <div class="text-4xl text-[#253959]">Genome Comparison</div>
                    <el-button
                        round
                        size="large"
                        color="#EE7E7D"
                        class="text-white hover:text-white focus:text-white active:text-white ml-60"
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
                    <el-button round size="large" color="#3f6212" @click="gosubmithelper">
                        Submission Helper
                    </el-button>
                    <el-button round size="large" color="#3f6212" class="ml-5">
                        <a
                            href="https://github.com/deepomicslab/PhageScope/issues"
                            target="_blank"
                            class="btn"
                        >
                            Report bug
                        </a>
                    </el-button>
                </div>
                <div class="text-lg font-500 ml-20 mt-3 w-9/10 flex flex-row">
                    <el-icon class="text-lg mt-1 mr-2 text-[#3f6212]"><InfoFilled /></el-icon>
                    It takes a few minutes to
                    <p class="text-[#EE7E7D] mx-2">RUN DEMO.</p>
                    Click
                    <p class="text-[#EE7E7D] mx-2">VIEW DEMO RESULT</p>
                    to see the precomputed demo results immediately.
                </div>
                <div class="flex flex-row">
                    <!-- <div class="w-20 h-full mt-10 ml-15">
                        <el-steps direction="vertical" :active="1">
                            <el-step />
                            <el-step />
                            <el-step />
                        </el-steps>
                    </div> -->
                    <div class="ml-20 flex flex-col items-start w-full">
                        <div class="font-600 text-3xl mt-10">
                            1. Input Sequence
                            <n-button
                                text
                                href="https://phagescope.deepomics.org/dataExample/data_demo/cluster_demo.fasta"
                                tag="a"
                                target="_blank"
                                type="primary"
                                class="text-lg ml-3"
                            >
                                See Example FASTA sequence
                            </n-button>
                        </div>

                        <div class="flex flex-col justify-center items-center ml-45">
                            <div class="mt-5 flex flex-row mb-5">
                                <div class="font-500 text-2xl">Select an input type:</div>
                                <div class="ml-5">
                                    <n-radio-group v-model:value="inputtype">
                                        <n-radio-button value="upload">UPLOAD FILE</n-radio-button>
                                        <n-radio-button value="paste">
                                            PASTE SEQUENCE
                                        </n-radio-button>
                                    </n-radio-group>
                                </div>
                            </div>

                            <n-alert
                                type="info"
                                closable
                                :bordered="false"
                                class="w-180 bg-[#9ab4c5]"
                            >
                                <template #icon>
                                    <el-icon class="text-lg mt-2 text-[#3f6212]">
                                        <InfoFilled />
                                    </el-icon>
                                </template>
                                <template #header>
                                    <p class="text-lg text-gray-50">Submit Note</p>
                                </template>
                                <p class="text-lg text-gray-50">
                                    The number of sequences uploaded to perform sequence comparison
                                    must be at least three, as required by comparative tree
                                    construction.
                                </p>
                            </n-alert>
                            <div class="flex flex-row justify-center ml-2">
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
                                                <div
                                                    class="text-[90px] mt-10"
                                                    style="color: #028090"
                                                >
                                                    <i-fa-cloud-upload />
                                                </div>
                                                <p
                                                    class="text-h5 mt-3 font-light"
                                                    style="color: #028090"
                                                >
                                                    Click or drag a file to this area to upload your
                                                    file
                                                </p>

                                                <p
                                                    class="text-sp mt-3 mb-3 text-opacity-100"
                                                    style="color: #f07167"
                                                >
                                                    Fasta file size should be less than 10MB
                                                </p>
                                                <p
                                                    class="text-sp mb-3 text-opacity-100"
                                                    style="color: #f07167"
                                                >
                                                    Supported formats: .fasta / .fa
                                                </p>
                                            </div>
                                        </n-upload-dragger>
                                    </n-upload>
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
                                            <n-button round size="large" class="w-50">
                                                Paste
                                            </n-button>
                                            <n-button round size="large" class="w-50">
                                                Copy
                                            </n-button>
                                        </n-button-group>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="font-600 text-3xl mt-10">2. Select Analysis Module</div>
                        <div class="flex flex-col justify-items-center items-center">
                            <div
                                class="rounded w-270 h-120 mt-10 rounded-2xl flex-row flex ml-15"
                                style="box-shadow: 0 0 64px #cfd5db"
                            >
                                <div class="w-135 p-2 border-r-2">
                                    <div
                                        class="w-125 mt-7 ml-2 text-base flex flex-col justify-start h-full"
                                    >
                                        <div class="text-2xl font-800 ml-7 mb-3">Module List</div>
                                        <el-tree
                                            :data="data"
                                            :props="defaultProps"
                                            @check-change="handleCheckChange"
                                            show-checkbox
                                            default-expand-all
                                        >
                                            <template #default="{ node, data }">
                                                <span class="custom-tree-node">
                                                    <div
                                                        class="text-xl flex flex-row justify-start"
                                                    >
                                                        <div>
                                                            <n-ellipsis style="max-width: 400px">
                                                                {{ node.label }}
                                                            </n-ellipsis>
                                                        </div>
                                                        <div>
                                                            <el-icon
                                                                class="text-xl text-[#3f6212] mt-1 ml-2"
                                                                v-if="
                                                                    data.key !== 'phenotype' &&
                                                                    data.key !== 'Functional'
                                                                "
                                                                @click="showDes(data.key)"
                                                            >
                                                                <Edit />
                                                            </el-icon>
                                                        </div>
                                                    </div>
                                                </span>
                                            </template>
                                        </el-tree>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <div class="ml-16" v-if="showDescription == ''">
                                        <div :class="descriptionTitleClass">
                                            Analysis Module Description
                                        </div>
                                        <div
                                            class="text-lg font-500 flex flex-row items-center text-red-400"
                                        >
                                            Click
                                            <el-icon class="text-[#3f6212] mx-3 text-2xl">
                                                <Edit />
                                            </el-icon>
                                            to view description.
                                        </div>
                                    </div>

                                    <div class="mx-15 my-10">
                                        <div v-if="showDescription == 'cluster'">
                                            <div :class="descriptionTitleClass">
                                                Sequence clustering
                                            </div>
                                            <div :class="descrptionContentClass">
                                                Mmseqs is applied, with a threshold of identity &gt;
                                                0.9 and coverage &gt; 0.9, to generate subclusters
                                                along with their representative sequences.
                                                Subsequently, the representative sequences are taken
                                                as the inputs to another round of mmseqs, with a
                                                threshold of identity &gt; 0.6 and coverage &gt;
                                                0.75, thereby generating clusters.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'alignment'">
                                            <div :class="descriptionTitleClass">
                                                Sequence alignment
                                            </div>
                                            <div :class="descrptionContentClass">
                                                BLASTP is adopted to conduct a pairwise alignment
                                                between the encoded proteins derived from the
                                                annotation process. The alignment coverage and
                                                identity values from the BLAST outputs are showcased
                                                in the alignment visualizations. The order in which
                                                the phages are presented in the visualizations is
                                                determined automatically to ensure an optimal
                                                arrangement of alignments.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'tree'">
                                            <div :class="descriptionTitleClass">
                                                Comparative tree construction
                                            </div>
                                            <div :class="descrptionContentClass">
                                                Alfpy is applied to calculate the genome distance
                                                between the phage sequences, and then the
                                                neighbor-joining algorithm is utilized to construct
                                                a comparative tree.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="font-600 text-3xl mt-10 flex flex-row items-end h-12">
                            <div class="font-600 text-3xl pb-1">
                                3. Compare with PhageScope Database"
                            </div>
                            <el-switch
                                class="ml-5"
                                size="large"
                                v-model="selectseq"
                                @change="selectseqchange"
                            />
                            <div class="text-[16px] font-400 ml-3 mb-3 text-[#f07167]">
                                (Optional)
                            </div>
                        </div>
                        <div
                            class="flex flex-col justify-items-center items-center"
                            v-show="selectseq"
                        >
                            <div
                                class="rounded w-180 h-120 mt-10 rounded-2xl flex-col flex ml-55"
                                style="box-shadow: 0 0 64px #cfd5db"
                            >
                                <div
                                    class="text-xl ml-18 mt-10 font-500 flex flex-row items-center border-b-2 w-130 pb-3"
                                >
                                    <div>Select all Sequences in Databse</div>
                                    <el-switch class="ml-5" size="large" v-model="allseq" />
                                </div>
                                <div class="mt-8 ml-18 text-xl">Filter Sequences in Databse</div>
                                <el-form
                                    class="mt-12 ml-20"
                                    label-position="right"
                                    label-width="auto"
                                    size="large"
                                    :disabled="allseq"
                                >
                                    <el-form-item label="Datasets">
                                        <el-select
                                            placeholder="Select datasets"
                                            multiple
                                            clearable
                                            class="w-80"
                                            v-model="filterform.datasets"
                                        >
                                            <el-option
                                                v-for="option in datasetsOptions"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="Sequence Quality">
                                        <el-select
                                            placeholder="Select Sequence Quality"
                                            class="w-80"
                                            clearable
                                            v-model="filterform.quality"
                                        >
                                            <el-option
                                                v-for="option in qualityOptions"
                                                :key="option.value"
                                                :label="option.label"
                                                :value="option.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="Length">
                                        <el-input
                                            class="w-35"
                                            type="number"
                                            min="0"
                                            v-model="filterform.LengthS"
                                        />
                                        <div class="mx-3">
                                            <el-icon><Minus /></el-icon>
                                        </div>
                                        <el-input
                                            class="w-35"
                                            type="number"
                                            min="0"
                                            v-model="filterform.LengthE"
                                        />
                                        <div class="ml-4">kb</div>
                                    </el-form-item>
                                    <el-form-item label="LifeStyle">
                                        <el-radio-group class="w-80" v-model="filterform.lifestyle">
                                            <el-radio label="virulent" />
                                            <el-radio label="temperate" />
                                            <el-radio label="all" />
                                        </el-radio-group>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="mt-20 flex flex-row justify-center w-17/20 ml-5">
                            <el-button
                                size="large"
                                color="#3f6212"
                                :width="90"
                                class="text-white hover:text-white focus:text-white active:text-white text-2xl"
                                @click="submit"
                            >
                                Submit
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import type { UploadFileInfo } from 'naive-ui'
import { InfoFilled, Edit, Minus } from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
import { useUserIdGenerator } from '@/utils/userIdGenerator'
import { datasetsOptions, qualityOptions } from '@/utils/filteroption'

const fileList = ref<UploadFileInfo[]>([])
const submitfile = ref<File>()
const inputtype = ref('upload')
const pastefile = ref('')
const phageid = ref('')
const userid = ref('')
const loading = ref(false)
const descrptionContentClass = ref('text-justify text-lg leading-relaxed tracking-wide')
const descriptionTitleClass = ref('text-xl mb-5 font-800 text-left')
const exampleSwicth = ref(false)
const allseq = ref(true)
const selectseq = ref(false)

const filterform = ref({
    quality: '',
    datasets: [],
    LengthS: 0,
    LengthE: 5,
    lifestyle: 'all',
})

const examplechange = async () => {
    console.log(exampleSwicth.value)
    if (exampleSwicth.value) {
        const fileURL = new URL(
            '../../../../../public/dataExample/data_demo/cluster_demo.fasta',
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

interface Tree {
    id?: number
    label: string
    children?: Tree[]
}

const showDescription = ref('')

const modulelist = ref({
    annotation: true,
    alignment: false,
    cluster: false,
    tree: false,
    comparedatabse: false,
})

const selectseqchange=()=>{
    if(selectseq.value){
        modulelist.value['comparedatabse'] = true
    }else{
        modulelist.value['comparedatabse'] = false
    }
    console.log(modulelist.value)
}

const showDes = (data: any) => {
    console.log(data)
    showDescription.value = data
    console.log(showDescription.value)
}
const handleCheckChange = (data: any, isCheck: any) => {
    const key = data.key as keyof typeof modulelist.value
    if (key in modulelist.value) {
        modulelist.value[key] = isCheck
    }
}

const data: Tree[] = [
    {
        id: 1,
        label: 'Sequence Clustering',
        key: 'cluster',
    },
    {
        id: 2,
        label: 'Comparison Alignment',
        key: 'alignment',
    },
    {
        id: 3,
        label: 'Comparative Tree Construction',
        key: 'tree',
    }, 
    
]

const defaultProps = {
    id: 0,
    children: 'children',
    label: 'label',
}

const submit = async () => {
    loading.value = true
    const submitdata = new FormData()
    submitdata.append('rundemo', 'false')
    submitdata.append('comparedatabase', 'false')
    submitdata.append('neednum', '3')
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
        if (phageid.value.length > 0) {
            submitdata.append('phageid', pastefile.value)
            precheck.value = true
        } else {
            window.$message.error('Please input phageid', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
        }
    }
    //check dependencies
    if (_.values(modulelist.value).includes(true)) {
        if (modulelist.value['anticrispr'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Anti-CRISPR protein annotation, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
        } else if (modulelist.value['transmembrane'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Transmembrane protein annotation, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
            
        } 
        else if (modulelist.value['arvf'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Virulent Factor & Antimicrobial Resistance Gene Detection, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
            
        } 
        else if (modulelist.value['terminator'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Transcription Terminator Annotation, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
            
        } 
        else {
            submitdata.append('modulelist', JSON.stringify(modulelist.value))
            precheck.value = true
        }
    } else {
        window.$message.error('Please select module', {
            closable: true,
            duration: 5000,
        })
        precheck.value = false
    }

    if (precheck.value) {
        submitdata.append('analysistype', 'Genome Comparison')
        submitdata.append('userid', userid.value)
        //submitdata.append('userid', 'demo')

        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/analyze/clusterpipline/`, submitdata, {
            baseURL: '/api',
            timeout: 10000,
        })
        const { data } = response
        loading.value = false
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
    loading.value = true
    const submitdata = new FormData()
    submitdata.append('rundemo', 'true')
    const precheck = ref(true)
    modulelist.value = {
        annotation: true,
        alignment: true,
        cluster: true,
        tree: true,
    }
    submitdata.append('modulelist', JSON.stringify(modulelist.value))
    if (precheck.value) {
        submitdata.append('analysistype', 'Genome Comparison')
        submitdata.append('rundemo', 'true')
        submitdata.append('userid', userid.value)
        //submitdata.append('userid', 'demo')

        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/analyze/clusterpipline/`, submitdata, {
            baseURL: '/api',
            timeout: 10000,
        })
        const { data } = response
        loading.value = false
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
const godemo = () => {
    router.push({ path: '/task/result/comparison', query: { taskid: 237 } })
}
const gosubmithelper = () => {
    router.push({ path: '/tutorial', query: { type: 'analysis' } })
}
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__content) {
    height: 48px !important;
}
</style>
