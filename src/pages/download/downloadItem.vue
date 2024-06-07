<template>
    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
        <div
            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
        >
            {{ description }}
        </div>

        <!-- <div class="w-120 flex flex-row items-center justify-start">
            <DownloadButton :link="link" />
        </div> -->
        <div class="w-120 flex flex-row items-center justify-start">
            <n-button class="ml-10 w-23 h-7 text-lg" text>
                <template #icon>
                    <n-icon class="text-lg">
                        <Download />
                    </n-icon>
                </template>
                <a :href="link" target="_blank" class="btn">Click to Download</a>
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { Download } from '@vicons/fa'

defineProps({
    description: String,
    link: String,
    // type: String,
    // dataset: String,
})
// const TYPE_DICT = {
//     phage: ['Phage Meta Data', 'Phage_meta_data', 'phage_meta_data.tsv'],
//     protein: [
//         'Phage Annotated Protein Meta Data',
//         'Annotated_protein_meta_data_v2',
//         'phage_annotated_protein_meta_data.tsv',
//     ],
//     terminator: [
//         'Phage Transcription Terminator Meta Data',
//         'Transcription_terminators_meta_data',
//         'phage_transcription_terminator_meta_data.tsv',
//     ],
//     tRNA: [],
// }
// const href = computed(() => {
//     if ('link') {
//         return link
//     }
//     const info = TYPE_DICT[props.type]
//     return `https://phageapi.deepomics.org/files/Download/${info[1]}/${dataset}_${info[2]}`
// })
// const title = computed(() => {
//     if (props?.description) {
//         return props.description
//     }
//     return TYPE_DICT[props.type][0]
// })
// if (props.description === 'CHVD Phage Anti-CRISPR Protein Meta Data') {
//     console.log(props)
//     console.log(props.value)
//     console.log(props.description)
//     console.log(props.description.value)
// }
</script>
