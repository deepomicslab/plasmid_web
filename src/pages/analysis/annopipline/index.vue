<template>
    <div class="flex flex-col w-full">
        <el-scrollbar class="w-full" ref="scrollbarRef" v-loading="loading">
            <div class="flex flex-col h-430">
                <div class="font-600 ml-20 mt-16 flex flex-row border-b-2 w-9/10 pb-5">
                    <div class="text-4xl text-[#253959]">Genome Annotation</div>
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
                    <el-button round size="large" color="rgb(175,44,94)" @click="gosubmithelper">
                        Submission Helper
                    </el-button>
                    <el-button round size="large" color="rgb(175,44,94)" class="ml-5">
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
                    <el-icon class="text-lg mt-1 mr-2 text-[rgb(175,44,94)]">
                        <InfoFilled />
                    </el-icon>
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
                                href="https://phagescope.deepomics.org/dataExample/data_demo/sequence.fasta"
                                tag="a"
                                target="_blank"
                                type="primary"
                                class="text-lg"
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
                                        <n-radio-button value="enter">
                                            ENTER Phage ID
                                        </n-radio-button>
                                        <n-radio-button value="paste">
                                            PASTE SEQUENCE
                                        </n-radio-button>
                                    </n-radio-group>
                                </div>
                            </div>
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
                                    class="rounded w-200 h-80 mt-5 rounded-2xl flex-col flex justify-center items-center"
                                    style="box-shadow: 0 0 64px #cfd5db"
                                    v-if="inputtype === 'enter'"
                                >
                                    <div class="text-lg flex flex-row mb-2">
                                        Enter the
                                        <p class="text-red-400 mx-2">Phage IDs</p>
                                        that already exist in the database, separated by
                                        <p class="text-red-400 mx-2 font-900">' ; '</p>
                                    </div>

                                    <div class="w-130 mt-4 flex flex-row">
                                        <n-form
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
                                        M14428.1;MGV-GENOME-0091953;AJ969242.1
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
                                class="rounded w-270 h-190 mt-10 rounded-2xl flex-row flex ml-15"
                                style="box-shadow: 0 0 64px #cfd5db"
                            >
                                <div class="w-135 p-2 border-r-2">
                                    <div
                                        class="w-125 mt-7 ml-2 text-base flex flex-col justify-start h-full"
                                    >
                                        <!-- <n-input
                                size="large"
                                round
                                placeholder="Filter Keywords"
                                clearable
                            ></n-input> -->
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
                                                                class="text-xl text-[rgb(175,44,94)] mt-1 ml-2"
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
                                            <el-icon class="text-[rgb(175,44,94)] mx-3 text-2xl">
                                                <Edit />
                                            </el-icon>
                                            to view description.
                                        </div>
                                    </div>
                                    <div class="mx-15 my-10">
                                        <div v-if="showDescription == 'quality'">
                                            <div :class="descriptionTitleClass">
                                                Completeness Assessment Description
                                            </div>
                                            <div :class="descrptionContentClass">
                                                CheckV v0.8.1 is applied to assess the completeness
                                                of the phage genomes. CheckV estimates the
                                                completeness by comparing the query genomes with a
                                                reference database, subsequently categorizing each
                                                genome into four distinct quality tiers, which are
                                                complete, high-quality, medium-quality, and
                                                low-quality.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'host'">
                                            <div :class="descriptionTitleClass">
                                                Host Assignment Description
                                            </div>
                                            <div :class="descrptionContentClass">
                                                First, BLASTN v2.5.0 is applied to align the
                                                sequences with the curated references, with a
                                                threshold of e-value &lt; 1e-5. The host taxonomy of
                                                the hit with the lowest e-value is designated as the
                                                predicted taxonomy. For those sequences with no hit
                                                in BLASTN, DeepHost is employed to predict the host
                                                taxonomy on species rank.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'lifestyle'">
                                            <div :class="descriptionTitleClass">
                                                Lifestyle Prediction Description
                                            </div>
                                            <div :class="descrptionContentClass">
                                                Graphage is utilized to discern between virulent and
                                                temperate phages by detecting the presence of
                                                lysogeny-associated proteins.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'annotation'">
                                            <div :class="descriptionTitleClass">
                                                ORF prediction & Protein Classification
                                            </div>
                                            <div :class="descrptionContentClass">
                                                Prodigal v2.6.3 is adopted with a meta option to
                                                identify the ORFs on the phage genomes. Then
                                                Eggnog-mapper v2.1.10 is employed to conduct
                                                orthology assignments with DIAMOND and transfer
                                                annotations from the assigned ortholog groups for
                                                the resulting coding sequences. For proteins that
                                                lack hits, mmseqs is applied iteratively to detect
                                                homology from the PHROG database, adopting a
                                                threshold of e-value &lt; 1e-5 with a sensitive
                                                mode, and then the proteins are annotated with the
                                                functional information from the homology. The
                                                annotated proteins are classified into ten
                                                functional classes.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'terminator'">
                                            <div :class="descriptionTitleClass">
                                                Transcription Terminator Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                TransTermHP v2.09 is adopted to identify the
                                                terminators on the phage genomes.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'taxonomic'">
                                            <div :class="descriptionTitleClass">
                                                Taxonomic Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                For each phage, HMMsearch is applied to align its
                                                encoded proteins to 30,553 taxonomy-specific VOGs,
                                                and the phage is assigned to the taxonomical group
                                                with the most HMM hits.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'trna'">
                                            <div :class="descriptionTitleClass">
                                                tRNA & tmRNA Gene Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                tRNAscan-SE v2.0 with a bacterial option and ARAGORN
                                                v1.2.41 with the bacteria genetic code are utilized
                                                to detect tRNA and tmRNA genes within phage genomes.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'anticrispr'">
                                            <div :class="descriptionTitleClass">
                                                Anti-CRISPR Protein Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                AcRanker and homology-based search are incorporated,
                                                using Anti-CRISPRdb as the reference, to identify
                                                anti-CRISPR proteins.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'crispr'">
                                            <div :class="descriptionTitleClass">
                                                CRISPR Array Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                CRISPRCasFinder v4.2.20 is utilized to detect CRISPR
                                                arrays on phage genomes.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'arvf'">
                                            <div :class="descriptionTitleClass">
                                                Virulent Factor & Antimicrobial Resistance
                                            </div>
                                            <div :class="descrptionContentClass">
                                                Mmseqs is employed to conduct homology searches for
                                                the phage proteins against CARD and VFDB. Virulence
                                                factor or antimicrobial resistance genes are
                                                identified on phage genomes if the match meets the
                                                thresholds of &gt; 80% identity and &gt; 40%
                                                coverage.
                                            </div>
                                        </div>
                                        <div v-if="showDescription == 'transmembrane'">
                                            <div :class="descriptionTitleClass">
                                                Transmembrane Protein Annotation
                                            </div>
                                            <div :class="descrptionContentClass">
                                                TMHMM v2.09 is utilized to predict transmembrane
                                                protein topology.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-20 flex flex-row justify-center w-17/20 ml-5">
                            <el-button
                                size="large"
                                color="rgb(175,44,94)"
                                :width="70"
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
import { InfoFilled, Edit } from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
import { useUserIdGenerator } from '@/utils/userIdGenerator'

const fileList = ref<UploadFileInfo[]>([])
const submitfile = ref<File>()
const inputtype = ref('upload')
const pastefile = ref('')

const userid = ref('')
const loading = ref(false)
const descrptionContentClass = ref('text-justify text-lg leading-relaxed tracking-wide')
const descriptionTitleClass = ref('text-xl mb-5 font-800 text-left')

// input phage ids
const inputformValue = ref({ phage: '' })
const idlist = ref([])
const inputfeedback = ref('')
const validationstatus = ref()
const isconfirmed = ref(false)
const confirmids = async () => {
    const checkdata = new FormData()
    if (inputformValue.value.phage.length === 0) {
        inputfeedback.value = 'Please input phage id'
        validationstatus.value = 'error'
    } else {
        checkdata.append('phageids', inputformValue.value.phage)
        const response = await axios.post(`/analyze/inputcheck/`, checkdata, {
            baseURL: '/api',
            timeout: 10000,
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
            '../../../../../public/dataExample/data_demo/sequence.fasta',
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
    annotation: false,
    quality: false,
    host: false,
    lifestyle: false,
    trna: false,
    anticrispr: false,
    crispr: false,
    transmembrane: false,
    terminator: false,
    arvf: false,
    taxonomic: false,
})

const showDes = (data: any) => {
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
        label: 'Completeness Assessment',
        key: 'quality',
    },
    {
        id: 2,
        label: 'Phenotype Annotation',
        key: 'phenotype',
        children: [
            {
                id: 21,
                label: 'Host Assignment',
                key: 'host',
            },
            {
                id: 22,
                label: 'Lifestyle Prediction',
                key: 'lifestyle',
            },
        ],
    },
    {
        id: 3,
        label: 'Structural Annotation',
        key: 'phenotype',
        children: [
            {
                id: 31,
                label: 'ORF prediction & Protein Classification',
                key: 'annotation',
            },
            {
                id: 32,
                label: 'Transcription Terminator Annotation',
                key: 'terminator',
            },
        ],
    },

    {
        id: 6,
        label: 'Taxonomic Annotation',
        key: 'taxonomic',
    },
    {
        id: 4,
        label: 'Functional Annotation',
        key: 'Functional',
        children: [
            {
                id: 41,
                label: 'tRNA & tmRNA Gene Annotation',
                key: 'trna',
            },
            {
                id: 42,
                label: 'Anti-CRISPR Protein Annotation',
                key: 'anticrispr',
            },
            {
                id: 43,
                label: 'CRISPR Array Annotation',
                key: 'crispr',
            },
            {
                id: 45,
                label: 'Virulent Factor & Antimicrobial Resistance Gene Detection',
                key: 'arvf',
            },
            {
                id: 44,
                label: 'Transmembrane  Protein Annotation',
                key: 'transmembrane',
            },
        ],
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
    const precheck = ref(false)
    // check empty
    if (inputtype.value === 'upload') {
        if (typeof submitfile.value === 'undefined') {
            window.$message.error('Please upload file', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
            loading.value = false
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
            loading.value = false
        }
    } else {
        if (isconfirmed.value){
            if (idlist.value.length > 0) {
            submitdata.append('phageid', JSON.stringify(idlist.value))
            precheck.value = true
        } else {
            window.$message.error('The number of Phage IDs you entered is 0.', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
            loading.value = false
        }
        }
        else{
            window.$message.error('Please click the confirm button first to check if the IDs you entered are correct.', {
                closable: true,
                duration: 5000,
            })
            precheck.value = false
            loading.value = false
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
            loading.value = false
        } else if (modulelist.value['transmembrane'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Transmembrane protein annotation, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
            loading.value = false
        } 
        else if (modulelist.value['taxonomic'] && !modulelist.value['annotation']) {
            window.$message.error(
                'If you want to perform Taxonomic Annotation, please also choose ORF prediction & Protein classification.',
                {
                    closable: true,
                    duration: 5000,
                }
            )
            precheck.value = false
            loading.value = false
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
            loading.value = false
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
            loading.value = false
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
        loading.value = false
    }

    if (precheck.value) {
        submitdata.append('analysistype', 'Annotation Pipline')
        submitdata.append('userid', userid.value)
        //submitdata.append('userid', 'demo')

        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/analyze/pipline/`, submitdata, {
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
        quality: true,
        host: true,
        lifestyle: true,
        trna: true,
        anticrispr: true,
        crispr: true,
        transmembrane: true,
        terminator: true,
        arvf: true,
        taxonomic: true,
    }
    submitdata.append('modulelist', JSON.stringify(modulelist.value))
    if (precheck.value) {
        submitdata.append('analysistype', 'Annotation Pipline')
        submitdata.append('userid', userid.value)
        //submitdata.append('userid', 'demo')

        submitdata.append('inputtype', inputtype.value)
        const response = await axios.post(`/analyze/pipline/`, submitdata, {
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
    router.push({ path: '/task/result/annopipline', query: { taskid: 111 } })
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
