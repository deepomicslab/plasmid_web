<template>
    <div class="h-900 flex flex-col py-10 px-30 pl-80">
        <div class="mt-5">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Host Assignment</div>
                <!-- <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="onClick">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                </div>
                <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                    <logModule v-model:taskid="taskid" moduleName="arvf" />
                </el-dialog> -->
            </div>

            <el-descriptions class="w-330 text-xl" :column="2" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Status</div>
                    </template>
                    <el-tag type="success">Success</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    Host Assignment
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Use Tools</div>
                    </template>
                    <el-tag type="info">DeepHost</el-tag>
                    <el-tag type="info" class="ml-4">BLAST</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="flex flex-row justify-between mt-8 mb-4">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Prediction Result</div>
                <div class="mt-1.5 ml-4">
                    <n-button>
                        Download
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                    </n-button>
                </div>
            </div>
        </div>
        <div>
            <div class="w-377">
                <el-table :data="hostlist" border max-height="500" style="width: 100%">
                    <el-table-column
                        prop="accesion_id"
                        label="Phage ID"
                        fixed
                        width="150"
                    ></el-table-column>

                    <el-table-column prop="host_source" label="Host Source" fixed width="150">
                        <template #default="scope">
                            <el-tag
                                :type="scope.row.host_source === 'DeepHost' ? '' : 'success'"
                                disable-transitions
                            >
                                {{ scope.row.host_source }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Genus" label="Genus" width="190">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Genus"
                                placement="top"
                                :disabled="scope.row.Genus.length < 27"
                            >
                                <el-button type="text">
                                    {{ scope.row.Genus }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Family" label="Family" width="190">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Family"
                                placement="top"
                                :disabled="scope.row.Family.length < 27"
                            >
                                <el-button type="text">
                                    {{ scope.row.Family }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Order" label="Order" width="190">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Order"
                                placement="top"
                                :disabled="scope.row.Order.length < 27"
                            >
                                <el-button type="text">
                                    {{ scope.row.Order }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Class" label="Class" width="190">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Class"
                                placement="top"
                                :disabled="scope.row.Class.length < 27"
                            >
                                <el-button type="text">
                                    {{ scope.row.Class }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Phylum" label="Phylum" width="190">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Phylum"
                                placement="top"
                                :disabled="scope.row.Phylum.length < 27"
                            >
                                <el-button type="text">
                                    {{ scope.row.Phylum }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="host" label="Host" fixed="right" width="260">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.host"
                                placement="top"
                                :disabled="scope.row.host.length < 27"
                            >
                                <el-button text type="warning">
                                    {{ scope.row.host }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="ml-140">
            <n-pagination
                class="mt-10 mb-20"
                :page-count="1"
                show-size-picker
                :page-sizes="[13, 20, 30]"
                show-quick-jumper
            />
        </div>
        <div class="mt-5">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Lifestyle Prediction</div>
                <div class="mt-1.5 ml-10"></div>
            </div>

            <el-descriptions class="w-330 text-xl" :column="2" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Status</div>
                    </template>
                    <el-tag type="success">Success</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    Lifestyle Prediction
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="flex flex-row w-200 mt-10">
            <div class="text-4xl font-500 mb-4">Overview</div>
        </div>
        <div class="flex flex-row">
            <div class="w-190 h-90 mb-10 mt-5" style="box-shadow: 0 0 64px #cfd5db">
                <div id="myEcharts" class="w-190 h-90" ref="echartDom"></div>
            </div>
        </div>
        <div class="flex flex-row w-200 mt-10">
            <div class="text-4xl font-500 mb-4">Result</div>
            <div class="text-4xl font-500 mb-4">
                <el-button type="primary" class="ml-5">Download Result</el-button>
            </div>
        </div>
        <div class="w-200 mt-5">
            <el-table :data="lifestylelist" style="width: 100%" max-height="850" border>
                <el-table-column
                    prop="phageid"
                    label="Phage ID"
                    width="600"
                    align="center"
                    fixed
                ></el-table-column>
                <el-table-column
                    prop="lifestyle"
                    label="Lifestyle"
                    width="200"
                    align="center"
                ></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'

import * as echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'
// import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import { lifestyleoption } from '@/utils/overview'

const route = useRoute()
const echartDom = ref<HTMLElement | null>(null)

const taskid = computed(() => route.query?.taskid as string)
const lifestyledata = ref()
onBeforeMount(async () => {
    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'lifestyle',
            taskid: taskid.value,
        },
    })
    const { data } = response
    lifestyledata.value = data.results

    const lifestyleCounts = _.countBy(data.results, 'lifestyle')

    const result = _.map(lifestyleCounts, (value, key) => {
        return { value, name: key }
    })
    lifestyleoption.series[0].data = result
    const myEcharts = echarts.init(echartDom.value as HTMLElement)
    myEcharts.setOption(lifestyleoption)
})

const lifestylelist = computed(() => lifestyledata.value)
const hostlist = ref([
    {
        id: 23670,
        accesion_id: 'uvig_43940',
        host: 'Faecalibacterium prausnitzii',
        host_source: 'BLAST',
        Genus: 'Faecalibacterium prausnitzii',
        Family: 'Faecalibacterium',
        Order: 'Oscillospiraceae',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23670,
    },
    {
        id: 23671,
        accesion_id: 'uvig_43941',
        host: 'Bacteroides faecis',
        host_source: 'BLAST',
        Genus: 'Bacteroides faecis',
        Family: 'Bacteroides',
        Order: 'Bacteroidaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23671,
    },
    {
        id: 23672,
        accesion_id: 'uvig_43943',
        host: 'Megamonas funiformis',
        host_source: 'BLAST',
        Genus: 'Megamonas funiformis',
        Family: 'Megamonas',
        Order: 'Selenomonadaceae',
        Class: 'Selenomonadales',
        Phylum: 'Negativicutes',
        phage: 23672,
    },
    {
        id: 23674,
        accesion_id: 'uvig_43949',
        host: 'Collinsella intestinalis',
        host_source: 'BLAST',
        Genus: 'Collinsella intestinalis',
        Family: 'Collinsella',
        Order: 'Coriobacteriaceae',
        Class: 'Coriobacteriales',
        Phylum: 'Coriobacteriia',
        phage: 23674,
    },

    {
        id: 23676,
        accesion_id: 'uvig_43951',
        host: 'Lachnospira eligens',
        host_source: 'BLAST',
        Genus: 'Lachnospira eligens',
        Family: 'Lachnospira',
        Order: 'Lachnospiraceae',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23676,
    },
    {
        id: 23677,
        accesion_id: 'uvig_43952',
        host: 'Lachnospira eligens',
        host_source: 'BLAST',
        Genus: 'Lachnospira eligens',
        Family: 'Lachnospira',
        Order: 'Lachnospiraceae',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23677,
    },
    {
        id: 23679,
        accesion_id: 'uvig_43955',
        host: 'Lawsonia intracellularis',
        host_source: 'DeepHost',
        Genus: 'Lawsonia intracellularis',
        Family: 'Lawsonia',
        Order: 'Desulfovibrionaceae',
        Class: 'Desulfovibrionales',
        Phylum: 'Desulfovibrionia',
        phage: 23679,
    },
    {
        id: 23681,
        accesion_id: 'uvig_43972',
        host: 'Faecalibacterium prausnitzii',
        host_source: 'BLAST',
        Genus: 'Faecalibacterium prausnitzii',
        Family: 'Faecalibacterium',
        Order: 'Oscillospiraceae',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23681,
    },
    {
        id: 23682,
        accesion_id: 'uvig_43973',
        host: 'Intestinimonas butyriciproducens',
        host_source: 'BLAST',
        Genus: 'Intestinimonas butyriciproducens',
        Family: 'Intestinimonas',
        Order: '-',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23682,
    },
    {
        id: 23683,
        accesion_id: 'uvig_43977',
        host: 'Staphylococcus aureus',
        host_source: 'DeepHost',
        Genus: 'Staphylococcus aureus',
        Family: 'Staphylococcus',
        Order: 'Staphylococcaceae',
        Class: 'Bacillales',
        Phylum: 'Bacilli',
        phage: 23683,
    },
    {
        id: 23684,
        accesion_id: 'uvig_43980',
        host: 'Bacteroides uniformis',
        host_source: 'BLAST',
        Genus: 'Bacteroides uniformis',
        Family: 'Bacteroides',
        Order: 'Bacteroidaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23684,
    },
    {
        id: 23685,
        accesion_id: 'uvig_43982',
        host: 'Lactococcus lactis',
        host_source: 'DeepHost',
        Genus: 'Lactococcus lactis',
        Family: 'Lactococcus',
        Order: 'Streptococcaceae',
        Class: 'Lactobacillales',
        Phylum: 'Bacilli',
        phage: 23685,
    },
    {
        id: 23686,
        accesion_id: 'uvig_43990',
        host: 'Erysipelatoclostridium ramosum',
        host_source: 'BLAST',
        Genus: 'Thomasclavelia ramosa',
        Family: 'Thomasclavelia',
        Order: 'Coprobacillaceae',
        Class: 'Erysipelotrichales',
        Phylum: 'Erysipelotrichia',
        phage: 23686,
    },
    {
        id: 23688,
        accesion_id: 'uvig_43993',
        host: 'Prevotella copri',
        host_source: 'BLAST',
        Genus: 'Prevotella copri',
        Family: 'Prevotella',
        Order: 'Prevotellaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23688,
    },

    {
        id: 23691,
        accesion_id: 'uvig_43997',
        host: 'Lawsonia intracellularis',
        host_source: 'DeepHost',
        Genus: 'Lawsonia intracellularis',
        Family: 'Lawsonia',
        Order: 'Desulfovibrionaceae',
        Class: 'Desulfovibrionales',
        Phylum: 'Desulfovibrionia',
        phage: 23691,
    },
    {
        id: 23692,
        accesion_id: 'uvig_43999',
        host: 'Prevotella copri',
        host_source: 'BLAST',
        Genus: 'Prevotella copri',
        Family: 'Prevotella',
        Order: 'Prevotellaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23692,
    },
    {
        id: 23693,
        accesion_id: 'uvig_44001',
        host: 'Prevotella copri',
        host_source: 'BLAST',
        Genus: 'Prevotella copri',
        Family: 'Prevotella',
        Order: 'Prevotellaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23693,
    },
    {
        id: 23694,
        accesion_id: 'uvig_44002',
        host: 'Bacteroides vulgatus',
        host_source: 'BLAST',
        Genus: 'Phocaeicola vulgatus',
        Family: 'Phocaeicola',
        Order: 'Bacteroidaceae',
        Class: 'Bacteroidales',
        Phylum: 'Bacteroidia',
        phage: 23694,
    },
    {
        id: 23695,
        accesion_id: 'uvig_44007',
        host: 'Agathobacter faecis',
        host_source: 'BLAST',
        Genus: 'Roseburia faecis',
        Family: 'Roseburia',
        Order: 'Lachnospiraceae',
        Class: 'Eubacteriales',
        Phylum: 'Clostridia',
        phage: 23695,
    },
])
</script>
