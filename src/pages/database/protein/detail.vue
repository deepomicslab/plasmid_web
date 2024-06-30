<template>
    <div class="flex flex-col justify-center items-center h-full">
        <div class="w-290">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Protein Detail</div>
                <div class="mt-1.5 ml-10">
                    <el-button @click="downloadprotein">
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        Download Sequence
                    </el-button>
                    <el-button @click="downloadpdb">
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        Download PDB Structure File
                    </el-button>
                </div>
            </div>
            <el-descriptions class="w-310 text-xl" :column="2" size="large" border>
                <el-descriptions-item v-if="props.type !== 'taskresult'">
                    <template #label>
                        <div class="cell-item">Plasmid ID</div>
                    </template>

                    <!-- <el-button type="text">
                   
                            {{ proteinInfo.Phage_Acession_ID }}
                  
                    </el-button> -->
                    {{ proteinInfo.plasmid_id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Protein ID</div>
                    </template>
                    {{ proteinInfo.protein_id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Orf Prediction Source</div>
                    </template>
                    <el-tag v-if="props.type === 'taskresult'">prodigal</el-tag>
                    <el-tag v-else>{{ proteinInfo.orf_source }}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item v-if="props.type === 'taskresult'">
                    <template #label>
                        <div class="cell-item">Function Prediction Source</div>
                    </template>
                    <el-tag>{{ proteinInfo.function_source }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item v-else>
                    <template #label>
                        <div class="cell-item">Function Prediction Source</div>
                    </template>
                    <el-tag>{{ proteinInfo.function_source }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Protein Product</div>
                    </template>
                    {{ proteinInfo.product }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Strand</div>
                    </template>
                    {{ proteinInfo.strand }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Start Point</div>
                    </template>
                    {{ proteinInfo.start }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">End Point</div>
                    </template>
                    {{ proteinInfo.end }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-290 mt-6" v-show="props.type !== 'taskresult'">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-4">Protein Function Information</div>
                <div class="ml-10"></div>
            </div>

            <el-descriptions class="w-310 text-xl" :column="2" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">COG category</div>
                    </template>
                    <!-- @vue-ignore -->
                    {{ COGCategoryDict[proteinInfo.cog_category] }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">EC number</div>
                    </template>
                    {{ proteinInfo.ec_number }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">COG id</div>
                    </template>
                    {{ proteinInfo.cog_id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">GOs</div>
                    </template>
                    {{ proteinInfo.go }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG ko</div>
                    </template>
                    {{ proteinInfo.kegg_ko }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG Pathway</div>
                    </template>
                    {{ proteinInfo.kegg_pathway }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG Module</div>
                    </template>
                    {{ proteinInfo.kegg_module }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG_Reaction</div>
                    </template>
                    {{ proteinInfo.kegg_reaction }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG_rclass</div>
                    </template>
                    {{ proteinInfo.kegg_rclass }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">BRITE</div>
                    </template>
                    {{ proteinInfo.brite }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">KEGG TC</div>
                    </template>
                    {{ proteinInfo.kegg_tc }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">CAZy</div>
                    </template>
                    {{ proteinInfo.cazy }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">BiGG_Reaction</div>
                    </template>
                    {{ proteinInfo.bigg_reaction }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">PFAMs</div>
                    </template>
                    {{ proteinInfo.pfam }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">UniProtKB</div>
                    </template>
                    {{ proteinInfo.uni_port_kb }}
                </el-descriptions-item>
            </el-descriptions>
            <div></div>
        </div>
        <div class="w-290 mt-6">
            <div class="flex flex-row w-290">
                <div class="text-2xl font-500 mb-4">Protein Sequence</div>
            </div>

            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="sequence"
            />
        </div>
        <div class="w-290 mt-6">
            <div class="flex flex-row w-290">
                <div class="text-2xl font-500 mb-4">Protein Structure</div>
            </div>
            <div class="flex flex-row w-290">
                <div id="myViewer" :key="`${props.proteinInfo.id}`">
                    <pdbe-molstar
                        :custom-data-url="`/api/database/download_protein_pdb/?protein_id=${props.proteinInfo.id}&sequence=${props.proteinInfo.sequence}&`"
                        custom-data-format="pdb"
                        assembly-id="1"
                        default-preset="default"
                        alphafold-view="false"
                        hide-water="true"
                        hide-het="false"
                        hide-non-standard="false"
                        load-maps="false"
                        highlight-color-g="255"
                        highlight-color-b="0"
                        select-color-g="255"
                        select-color-b="0"
                        lighting="glossy"
                        domain-annotation="true"
                        validation-annotation="true"
                        symmetry-annotation="true"
                        encoding="bcif"
                        low-precision="true"
                        subscribe-events="false"
                        hide-controls="true"
                        sequence-panel="false"
                        pdbe-link="true"
                        loading-overlay="true"
                        expanded="false"
                        landscape="false"
                        reactive="false"
                    ></pdbe-molstar>
                    <!-- <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar.css"
                    />
                    <script
                        type="text/javascript"
                        src="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar-component.js"
                    ></script> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
//
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import { PropType } from 'vue'
import { COGCategoryDict } from '@/utils/phage'
// import { TypeDict } from '@/utils/annotation'
onMounted(async () => {
    const script1 = document.createElement('script')
    script1.src = 'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js'
    document.body.appendChild(script1)
    const script2 = document.createElement('script')
    script2.src =
        'https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/webcomponents-lite.js'
    document.body.appendChild(script2)
    const script3 = document.createElement('script')
    script3.src =
        'https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
    document.body.appendChild(script3)
    const script4 = document.createElement('script')
    script4.src = 'https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar-component.js'
    document.body.appendChild(script4)

    const style = document.createElement('link')
    style.href = 'https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    document.body.appendChild(style)
})

const props = defineProps({
    proteinInfo: Object as PropType<any>,
    dataset: String,
    type: String,
})

// const typedTypeDict = TypeDict as { [key: string]: { color: string } }
// const classlist = computed(() => {
//     if (props.proteinInfo.Protein_function_classification === undefined) return []
//     return props.proteinInfo.Protein_function_classification.split(';').slice(0, -1) as string[]
// })
const sequence = computed(() => {
    if (props.proteinInfo.sequence === undefined) return ''
    return props.proteinInfo.sequence
})
const downloadprotein = () => {
    const filename = `${props.proteinInfo.protein_id}.fasta`
    const blob = new Blob([sequence.value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}

const downloadpdb = () => {
    window.open(
        `/api/database/download_protein_pdb/?protein_id=${props.proteinInfo.id}&protein_id=${props.proteinInfo.sequence}`,
        '_blank'
    )
}
</script>
<style>
#myViewer {
    width: 100%;
    height: 500px;
    position: relative;
    overflow: scroll;
    /* margin: 20px; */
}
</style>
