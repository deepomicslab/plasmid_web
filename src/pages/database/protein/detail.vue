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
        </div>
    </div>
</template>
<script setup lang="ts">
//
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import { PropType } from 'vue'
import { COGCategoryDict } from '@/utils/phage'
// import { TypeDict } from '@/utils/annotation'

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
    const filename = `${props.proteinInfo.Protein_id}.fasta`
    const blob = new Blob([sequence.value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}
</script>
