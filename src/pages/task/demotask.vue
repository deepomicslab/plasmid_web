<template>
    <div class="w-full bg-white flex flex-col justify-start items-center">
        <div class="text-4xl font-800 mt-20">Demo Task Query</div>
        <div
            class="rounded w-240 h-250 mt-20 rounded-xl flex flex-col justify-start items-center"
            style="box-shadow: 0 0 34px #cfd5db"
        >
            <div class="text-3xl font-700 mt-10 w-150 text-center pb-4">
                Annotation Pipline
                <el-tag size="large" type="success">finish</el-tag>
            </div>
            <div class="flex flex-row justify-start mt-6 w-full">
                <el-button round color="#34498E " class="w-40 ml-58">Back</el-button>
                <el-button round color="#34498E " class="ml-5 w-40">Task Monitor</el-button>
                <el-button round color="#34498E " class="ml-5 w-40" @click="ViewDemoVisualization">
                    Visualization
                </el-button>
            </div>
            <div class="w-full flex flex-col justify-start mt-6 ml-40">
                <div class="text-xl font-700 ml-40">Your input file</div>
                <div class="flex flex-row p-4 bg-gray-100 w-160 mt-10 justify-center ml-30">
                    <button class="p-2 bg-gray-400 w-40 rounded-xl pl-3 text-gray-100">
                        sequence.fasta
                    </button>
                </div>
            </div>
            <div class="w-full flex flex-col justify-start mt-6 ml-40">
                <div class="ml-40 text-xl font-700">Resource Usage</div>
                <img src="../../../public/png/usage.png" class="w-509px ml-40 mt-10" />
            </div>
            <div class="w-full flex flex-col justify-start mt-6 ml-40">
                <div class="ml-8 text-xl font-700 ml-40">Analysis Result</div>
                <div class="flex flex-row p-4 bg-gray-100 w-160 mt-10 justify-center ml-30">
                    <a href="../../../public/dataExample/sequence.gff3" download>
                        <button class="p-2 bg-gray-400 w-40 rounded-xl pl-3 text-gray-100">
                            sequence.gff3
                        </button>
                    </a>
                    <a href="../../../public/dataExample/acc_list.txt" download>
                        <button class="ml-8 p-2 bg-gray-400 w-40 rounded-xl text-gray-100">
                            acc_list.txt
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const ViewDemoVisualization = () => {
    router.push({ path: '/visualize/annotation' })
}
</script>
