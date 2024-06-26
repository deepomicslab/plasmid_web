<template>
    <n-anchor show-rail affix :top="150" class="ml-15 w-55" show-background :bound="124">
        <n-anchor-link title="Meta Data Download" href="#meta" class="text-xl"></n-anchor-link>
        <n-anchor-link title="FASTA File Download" href="#fasta" />
        <n-anchor-link title="GBK File Download" href="#gbk" />
        <n-anchor-link title="GFF3 File Download" href="#gff3" />
    </n-anchor>

    <div class="flex flex-col w-full h-2220 justify-start items-center">
        <div id="meta" class="pt-10">
            <div class="w-280 border-b-1 border-[rgb(18,49,73)] pb-3">
                <div class="text-[40px] text-[#069] font-600">Meta Data Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Plasmid Meta Data Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>

                                <a
                                    :href="`https://plasmid.deepomics.org/files/${source}/data/${source}.plasmid_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Annotated Protein Meta Data Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.protein_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Secondary Metabolism Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Secondary Metabolism Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.SMs_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>tRNA & tmRNA Gene Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.trna_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>CRISPR-CAS Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid CRISPR-CAS Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.CRISPR-Cas_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Signal Peptides Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Signal Peptides Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.SP_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Antimicrobial Resistance Gene Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.ARG_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Virulent Factor Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.VF_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Transmembrane Protein Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/data/${source}.TMHs_list.xls`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="fasta" class="pt-10">
            <div class="w-280 mt-20 border-b-1 border-[rgb(18,49,73)] pb-3">
                <div class="text-[40px] text-[#069] font-600">FASTA File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Plasmid FASTA File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList2"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/${source}.fasta.tar.gz`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Protein FASTA File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            Genbank Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/Genbank.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            RefSeq Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/RefSeq.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            DDBJ Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/DDBJ.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            EMBL Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/EMBL.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            PlasmidsDB Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/PlasmidsDB.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            GPD Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/GPD.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            GVD Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/GVD.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            MGV Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/MGV.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            TemPhD Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/TemPhD.tar.gz"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Protein FASTA File"
                        link="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/CHVD.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Protein FASTA File"
                        link="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/IGVD.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Protein FASTA File"
                        link="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/IMG_VR.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Protein FASTA File"
                        link="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/GOV2.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="STV Protein FASTA File"
                        link="https://plasmidapi.deepomics.org/fasta/phage_sequence/proteins/STV.tar.gz"
                    ></downloadItem>
                </div>
            </div> -->
        </div>
        <div id="gbk">
            <div class="w-280 mt-20 border-b-1 border-[rgb(18,49,73)] pb-3">
                <div class="text-[40px] text-[#069] font-600">GBK File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Plasmid GBK File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList2"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/${source}.gbk.tar.gz`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="gff3">
            <div class="w-280 mt-20 border-b-1 border-[rgb(18,49,73)] pb-3">
                <div class="text-[40px] text-[#069] font-600">GFF3 File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[rgb(18,49,73)] text-gray-50 p-4 text-[20px] font-600">
                    <div>Plasmid GFF3 File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div
                        class="w-280 border-1 border-gray-700 h-13 flex flex-row"
                        v-for="source in datasetList2"
                        :key="source"
                    >
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            {{ source }} Plasmid GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://plasmidapi.deepomics.org/fasta/phage_sequence/phage_gff3/Genbank.gff3"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            RefSeq Plasmid GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    :href="`https://plasmidapi.deepomics.org/api/database/files/${source}/${source}.gff.tar.gz`"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Download } from '@vicons/fa'
// import downloadItem from './downloadItem.vue'
// import axios from 'axios'
const datasetList = [
    'ALL',
    'PLSDB',
    'IMG-PR',
    'COMPASS',
    'GenBank',
    'RefSeq',
    'EMBL',
    'Kraken2',
    'DDBJ',
    'TPA',
]
const datasetList2 = [
    'PLSDB',
    'IMG-PR',
    'COMPASS',
    'GenBank',
    'RefSeq',
    'EMBL',
    'Kraken2',
    'DDBJ',
    'TPA',
]
</script>
