<template>
    <div class="w-full flex flex-row justify-start h-full">
        <div class="h-full"></div>
        <n-layout-sider
            bordered
            :width="310"
            show-trigger="bar"
            :collapsed-width="20"
            class="h-full"
        >
            <div class="flex flex-col h-full">
                <div class="h-1/8 flex flex-row justify-start items-center w-full">
                    <div class="font-500 text-[28px] text-[#069] ml-18">Directly Start</div>
                </div>
                <div class="h-2/8 flex flex-col justify-center items-center">
                    <el-button round color="#069" class="w-30 h-9" @click="goDocument">
                        Help
                    </el-button>
                    <img src="../../public/png/help.png" class="image w-34 h-23 mt-2" />
                </div>
                <div class="h-2/8 flex flex-col justify-center items-center">
                    <el-button round color="#069" class="w-30 h-9" @click="godatabasae">
                        Database
                    </el-button>
                    <img src="../../public/png/database.png" class="image w-34 h-34" />
                </div>
                <div class="h-2/8 flex flex-col justify-center items-center">
                    <el-button round color="#069" class="w-30 h-9" @click="goAnalysis">
                        Analysis
                    </el-button>
                    <img src="../../public/png/analysis.png" class="image w-34 h-34" />
                </div>
            </div>
        </n-layout-sider>
        <el-scrollbar ref="scrollbarRef" class="w-full">
            <div class="w-full flex flex-col justify-start h-760 bg-[#f8f9fa]">
                <div class="h-220 flex flex-col">
                    <div class="flex flex-row border-b-1 border-[rgb(18,49,73)] ml-13 w-290 pb-6">
                        <div class="text-5xl font-700 mt-20 text-[#069]">PlasmidScope</div>
                        <el-button
                            round
                            color="#069"
                            class="w-25 h-7 mt-24 ml-10"
                            @click="godatabasae"
                        >
                            Database
                        </el-button>
                        <el-button
                            round
                            color="#069"
                            class="w-25 h-7 mt-24 ml-18"
                            @click="goAnalysis"
                        >
                            Analysis
                        </el-button>
                    </div>

                    <div class="text-[22px] font-400 mt-13 ml-15 w-[84%] leading-9 text-gray-900">
                        Welcome to PlasmidScope! PlasmidScope is an
                        <strong class="text-2xl font-600 text-[#069] ml-1">
                            online plasmid database
                        </strong>
                        that offers comprehensive annotations, including mobility assessment,
                        completeness assessment, phenotype annotation, structural annotation,
                        functional annotation, protein structure prediction, and genome comparison.
                    </div>
                    <div class="text-[22px] font-400 mt-10 ml-15 w-[89%] leading-9 text-gray-900">
                        PlasmidScope incorporates automatic analysis and interactive visualization
                        for both curated and customized data.
                    </div>
                    <div class="text-[22px] font-400 mt-10 ml-15 w-[89%] leading-9 text-gray-900">
                        Key features of PlasmidScope:
                    </div>
                    <div class="mt-8 ml-25 w-[81%] flex flex-row">
                        <div>
                            <div
                                class="h-[0.6em] w-[0.6em] rounded-full bg-gray-900 mx-5 mt-3.5"
                            ></div>
                        </div>
                        <div class="text-[21px] font-400 leading-9 text-gray-900">
                            Curated PlasmidScope
                            <span
                                herf="https://plasmid.deepomics.org/database"
                                class="text-[21px] font-400"
                            >
                                database
                            </span>
                            includes
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.plasmid }}
                            </strong>
                            <strong class="text-[#069] font-400 mx-1 text-[21px]">
                                plasmid sequences,
                            </strong>
                            harboring
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.protein }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                annotated proteins,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.host }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                host species,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.trna }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                tRNA & tmRNA,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.sm }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                secondary metabolites,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.sp }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                signal peptides,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.crispr }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                CRISPR-CAS systems,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.vf }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                virulence factors,
                            </strong>
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.arg }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                antibiotic resistance genes,
                            </strong>
                            and
                            <strong class="text-2xl font-600 text-[#069] ml-1">
                                {{ overview_data.tmh }}
                            </strong>
                            <strong class="text-[#069] font-400 ml-1 text-[21px]">
                                transmembrane proteins.
                            </strong>
                        </div>
                    </div>

                    <div
                        class="text-[21px] font-400 mt-8 ml-25 w-[79%] leading-9 text-gray-900 flex flex-row"
                    >
                        <div>
                            <div
                                class="h-[0.4em] w-[0.4em] rounded-full bg-gray-900 mx-5 mt-3.5"
                            ></div>
                        </div>
                        Automatic plasmid annotation and analysis with state-of-the-art tools,
                        including mobility assessment, completeness scoring, ORF prediction,
                        functional gene annotation, tRNA & tmRNA prediction, plasmid clustering,
                        protein structure prediction, sequence comparison, etc.
                    </div>
                    <div
                        class="text-[21px] font-400 mt-8 ml-25 w-[80%] leading-9 text-gray-900 flex flex-row"
                    >
                        <div>
                            <div
                                class="h-[0.4em] w-[0.4em] rounded-full bg-gray-900 mx-5 mt-3.5"
                            ></div>
                        </div>
                        Interactive visualization of completeness and phenotype distribution,
                        structural and functional annotation, sequence alignment, comparative tree,
                        etc.
                    </div>
                </div>
                <div class="h-359 flex flex-col items-center">
                    <div class="mb-10 text-3xl font-600 text-[#069] mt-25">Focus</div>
                    <div
                        style="box-shadow: 0 0 64px #cfd5db"
                        class="w-297 h-259 bg-white rounded-2xl"
                    >
                        <div>
                            <el-carousel
                                height="1036px"
                                width="1080px"
                                arrow="always"
                                indicator-position="outside"
                                :autoplay="false"
                            >
                                <el-carousel-item>
                                    <div class="w-297 h-259">
                                        <el-image
                                            src="/png/Plasmid_database.pdf"
                                            class="image w-297 h-259"
                                            z-index="100"
                                        />
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <div
                                        class="w-297 h-259 flex flex-row items-center justify-center"
                                    >
                                        <el-image
                                            src="/png/Plasmid_analysis.pdf"
                                            class="image w-297 h-259"
                                            z-index="100"
                                        />
                                    </div>
                                </el-carousel-item>
                                <!-- <el-carousel-item>
                                    <div
                                        class="w-270 h-150 flex flex-row items-center justify-center"
                                    >
                                        <el-image
                                            src="/png/visualization.png"
                                            class="image w-270 h-150"
                                            z-index="100"
                                        />
                                    </div>
                                </el-carousel-item> -->
                            </el-carousel>
                        </div>
                    </div>
                </div>
                <div class="h-180 flex flex-row w-full justify-center">
                    <div class="w-270 flex flex-row">
                        <div>
                            <iframe class="w-120 h-120" src="/cloudTag.html"></iframe>
                        </div>
                        <el-scrollbar
                            class="w-110 h-100 ml-40 rounded-7px bg-white mt-10"
                            style="box-shadow: 0 0 64px #cfd5db"
                        >
                            <div class="text-3xl font-600 mt-4 ml-8">NEWS</div>
                            <el-steps direction="vertical" class="h-70 ml-8 mt-5 mb-10">
                                <!-- <el-step :icon="Opportunity" status="process">
                                    <template #title>
                                        <div class="text-gray-700 font-600">
                                            Version 1.1 (2023.10.10)
                                        </div>
                                    </template>
                                    <template #description>
                                        <div :class="descriptionClass">
                                            Five additional phage datasets are incorporated into the
                                            database.
                                            <br />
                                            Update the genome comparison modules to provide the
                                            option to compare customized phage genomes with the
                                            PhageScope database.
                                        </div>
                                    </template>
                                </el-step> -->
                                <el-step :icon="Opportunity" status="process">
                                    <template #title>
                                        <div class="text-gray-700 font-600">
                                            Version 1.0 (2024.7.1)
                                        </div>
                                    </template>
                                    <template #description>
                                        <div :class="descriptionClass">
                                            PlasmidScope has been released. Welcome to use!
                                        </div>
                                    </template>
                                </el-step>
                            </el-steps>
                        </el-scrollbar>
                    </div>
                </div>
                <el-footer
                    class="px-20 h-70 bg-[rgb(18,49,73)] text-[rgb(200,200,200)] flex flex-col justify-center items-start text-sm"
                >
                    <div class="px-10 w-full flex flex-row justify-between leading-relaxed">
                        <div class="flex flex-col">
                            <a class="text-xl mb-3" href="/database">Database</a>
                            <p><a href="/database/plasmid">Plasmid List</a></p>
                            <p><a href="/database/host">Host List</a></p>
                            <p><a href="/database/cluster">Cluster List</a></p>
                            <p><a href="/database/protein">Annotated Protein List</a></p>
                            <p><a href="/database/filter">Sequence Filter</a></p>
                            <!-- <div class="flex flex-col">
                                <p>
                                    <a href="/database/function/trna">tRNA & tmRNA Gene List</a>
                                </p>
                                <p>
                                    <a href="/database/function/anticrispr">
                                        Anti-CRISPR Protein List
                                    </a>
                                </p>
                                <p>
                                    <a href="/database/function/virulent">
                                        Virluent Factor List
                                    </a>
                                </p>
                                <p>
                                    <a href="/database/function/antimicrobial_resistance">
                                        Antimicrobial Resistance Gene List
                                    </a>
                                </p>
                                <p>
                                    <a href="/database/function/transmembrane">
                                        Transmebrane Protein List
                                    </a>
                                </p>
                            </div> -->
                        </div>

                        <div class="flex flex-col">
                            <p class="text-xl mb-3">Analysis</p>
                            <p><a href="/analysis/annopipline">Genome Annotation</a></p>
                            <p><a href="/analysis/comparison">Genome Comparison</a></p>
                        </div>
                        <div class="flex flex-col mb-3">
                            <p class="text-xl mb-10"><a href="/workspace">Workspace</a></p>
                        </div>
                        <div class="flex flex-col mb-3">
                            <p class="text-xl"><a href="/download">Download</a></p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-xl mb-3">Help</p>
                            <p><a href="/tutorial">Tutorial</a></p>
                            <p><a href="/contact">Contact us</a></p>
                        </div>
                    </div>
                    <el-divider color="black" />
                    <div>2024 &copy; City University of Hong Kong. All rights reserved.</div>
                </el-footer>
            </div>
        </el-scrollbar>
        <admin v-show="false" />
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>This is a message</span>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmcookie()">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// import { ref, onMounted } from 'vue'
import { Opportunity } from '@element-plus/icons-vue'
import axios from 'axios'
import { useUserIdGenerator } from '@/utils/userIdGenerator'
import admin from './admin.vue'

const loading = ref(false)
// eslint-disable-next-line camelcase
const overview_data = ref({
    plasmid: 953438,
    host: 14382,
    protein: 39172224,
    trna: 109510,
    arg: 32240953,
    sm: 63737,
    sp: 4142979,
    tmh: 8672432,
    vf: 514503,
    crispr: 10088,
})

const dialogVisible = ref(false)

const descriptionClass = ref('text-gray-500 font-400 pt-1 border-t-1 mb-5 w-70')

const router = useRouter()
// const route = useRoute()

const godatabasae = () => {
    router.push({
        path: '/database',
    })
}

const goDocument = () => {
    router.push({
        path: '/tutorial',
    })
}

const goAnalysis = () => {
    router.push({
        path: '/analysis/annopipline',
    })
}

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get('get_home_overview', {
        baseURL: '/api/database/',
        timeout: 100000,
        // params: {
        //     page: pagevalue.value,
        //     pagesize: pageSize.value,
        //     search: searchinput.value,
        // },
    })
    const { data } = response
    overview_data.value = data
    loading.value = false
})

// onBeforeMount(async () => {
//     const { isCookieExist } = useUserIdGenerator()
//     const CookieExist = ref(isCookieExist())
//     console.log(CookieExist.value)
//     if (!CookieExist.value) {
//         dialogVisible.value = true
//     }
// })

const confirmcookie = () => {
    const { generateUserId, userId } = useUserIdGenerator()
    generateUserId()
    dialogVisible.value = false
    console.log(userId.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-carousel__arrow) {
    background-color: rgb(31 45 61 / 59%);
}
:deep(.el-carousel__indicators--outside button) {
    height: 10px;
    width: 60px;
    background-color: #070708;
}
// :deep(.el-carousel__indicators--outside) {
//     z-index: 500 !important;
//     position: absolute;
//     margin-top: -500px;
// }
</style>
