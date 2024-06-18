<template>
    <n-anchor show-rail affix :top="150" class="ml-15 w-55" show-background :bound="124">
        <n-anchor-link title="Meta Data Download" href="#meta" class="text-xl"></n-anchor-link>
        <n-anchor-link title="FASTA File Download" href="#fasta" />
        <!-- <n-anchor-link title="GBK File Download" href="#gbk" /> -->
        <n-anchor-link title="GFF3 File Download" href="#gff3" />
    </n-anchor>

    <div class="flex flex-col w-full h-2220 justify-start items-center">
        <div id="meta" class="pt-10">
            <div class="w-280 border-b-1 border-[#3f6212] pb-3">
                <div class="text-[40px] text-[#3f6212] font-600">Meta Data Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Phage Meta Data Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>

                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/all_phage_meta_data_v2.tsv"
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
                            RefSeq Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/refseq_phage_meta_data.tsv"
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
                            Genbank Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>

                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/genbank_phage_meta_data.tsv"
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
                            EMBL Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/embl_phage_meta_data.tsv"
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
                            DDBJ Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/ddbj_phage_meta_data.tsv"
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
                            PhagesDB Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/phagesdb_phage_meta_data.tsv"
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
                            GVD Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/gvd_phage_meta_data.tsv"
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
                            GPD Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/gpd_phage_meta_data.tsv"
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
                            MGV Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/mgv_phage_meta_data.tsv"
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
                            TemPhD Phage Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Phage_meta_data/temphd_phage_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Phage_meta_data/chvd_phage_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Phage_meta_data/igvd_phage_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Phage_meta_data/img_vr_phage_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Phage_meta_data/gov2_phage_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Phage_meta_data/stv_phage_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Annotated Protein Meta Data Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/all_phage_annotated_protein_meta_data_v2.tsv"
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
                            RefSeq Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/refseq_phage_annotated_protein_meta_data.tsv"
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
                            Genbank Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/genbank_phage_annotated_protein_meta_data.tsv"
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
                            EMBL Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/embl_phage_annotated_protein_meta_data.tsv"
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
                            DDBJ Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/ddbj_phage_annotated_protein_meta_data.tsv"
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
                            PhagesDB Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/phagesdb_phage_annotated_protein_meta_data.tsv"
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
                            GVD Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/gvd_phage_annotated_protein_meta_data.tsv"
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
                            GPD Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/gpd_phage_annotated_protein_meta_data.tsv"
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
                            MGV Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/mgv_phage_annotated_protein_meta_data.tsv"
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
                            TemPhD Phage Annotated Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/temphd_phage_annotated_protein_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Annotated Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/chvd_phage_annotated_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Annotated Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/igvd_phage_annotated_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Annotated Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/img_vr_phage_annotated_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Annotated Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/gov2_phage_annotated_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage Annotated Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Annotated_protein_meta_data_v2/stv_phage_annotated_protein_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Transcription Terminator Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/all_phage_transcription_terminator_meta_data_v2.tsv"
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
                            RefSeq Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/refseq_phage_transcription_terminator_meta_data.tsv"
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
                            Genbank Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/genbank_phage_transcription_terminator_meta_data.tsv"
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
                            EMBL Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/embl_phage_transcription_terminator_meta_data.tsv"
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
                            DDBJ Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/ddbj_phage_transcription_terminator_meta_data.tsv"
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
                            PhagesDB Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/phagesdb_phage_transcription_terminator_meta_data.tsv"
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
                            GVD Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/gvd_phage_transcription_terminator_meta_data.tsv"
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
                            GPD Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/gpd_phage_transcription_terminator_meta_data.tsv"
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
                            MGV Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/mgv_phage_transcription_terminator_meta_data.tsv"
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
                            TemPhD Phage Transcription Terminator Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/temphd_phage_transcription_terminator_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Transcription Terminator Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/chvd_phage_transcription_terminator_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Transcription Terminator Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/igvd_phage_transcription_terminator_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Transcription Terminator Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/img_vr_phage_transcription_terminator_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Transcription Terminator Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/gov2_phage_transcription_terminator_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage Transcription Terminator Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transcription_terminators_meta_data/stv_phage_transcription_terminator_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>tRNA & tmRNA Gene Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/all_phage_trna_gene_meta_data_v2.tsv"
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
                            RefSeq Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/refseq_phage_trna_gene_meta_data.tsv"
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
                            Genbank Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/genbank_phage_trna_gene_meta_data.tsv"
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
                            EMBL Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/embl_phage_trna_gene_meta_data.tsv"
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
                            DDBJ Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/ddbj_phage_trna_gene_meta_data.tsv"
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
                            PhagesDB Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/phagesdb_phage_trna_gene_meta_data.tsv"
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
                            GVD Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/gvd_phage_trna_gene_meta_data.tsv"
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
                            GPD Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/gpd_phage_trna_gene_meta_data.tsv"
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
                            MGV Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/mgv_phage_trna_gene_meta_data.tsv"
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
                            TemPhD Phage tRNA & tmRNA Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/temphd_phage_trna_gene_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage tRNA & tmRNA Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/chvd_phage_trna_gene_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage tRNA & tmRNA Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/igvd_phage_trna_gene_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage tRNA & tmRNA Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/img_vr_phage_trna_gene_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage tRNA & tmRNA Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/gov2_phage_trna_gene_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage tRNA & tmRNA Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/tRNA_tmRNA_gene_meta_data_v2/stv_phage_trna_gene_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Anti-CRISPR Protein Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/all_phage_anticrispr_protein_meta_data_v2.tsv"
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
                            RefSeq Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/refseq_phage_anticrispr_protein_meta_data.tsv"
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
                            Genbank Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/genbank_phage_anticrispr_protein_meta_data.tsv"
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
                            EMBL Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/embl_phage_anticrispr_protein_meta_data.tsv"
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
                            DDBJ Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/ddbj_phage_anticrispr_protein_meta_data.tsv"
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
                            PhagesDB Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/phagesdb_phage_anticrispr_protein_meta_data.tsv"
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
                            GVD Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/gvd_phage_anticrispr_protein_meta_data.tsv"
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
                            GPD Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/gpd_phage_anticrispr_protein_meta_data.tsv"
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
                            MGV Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/mgv_phage_anticrispr_protein_meta_data.tsv"
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
                            TemPhD Phage Anti-CRISPR Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/temphd_phage_anticrispr_protein_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Anti-CRISPR Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/chvd_phage_anticrispr_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Anti-CRISPR Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/igvd_phage_anticrispr_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Anti-CRISPR Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/img_vr_phage_anticrispr_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Anti-CRISPR Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/gov2_phage_anticrispr_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage Anti-CRISPR Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/AntiCRISPR_protein_meta_data_v2/stv_phage_anticrispr_protein_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>CRISPR Array Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/all_phage_crispr_array_meta_data_v2.tsv"
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
                            RefSeq Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/refseq_phage_crispr_array_meta_data.tsv"
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
                            Genbank Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/genbank_phage_crispr_array_meta_data.tsv"
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
                            EMBL Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/embl_phage_crispr_array_meta_data.tsv"
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
                            DDBJ Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/ddbj_phage_crispr_array_meta_data.tsv"
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
                            PhagesDB Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/phagesdb_phage_crispr_array_meta_data.tsv"
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
                            GVD Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/gvd_phage_crispr_array_meta_data.tsv"
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
                            GPD Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/gpd_phage_crispr_array_meta_data.tsv"
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
                            MGV Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/mgv_phage_crispr_array_meta_data.tsv"
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
                            TemPhD Phage CRISPR Array Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/temphd_phage_crispr_array_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage CRISPR Array Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/chvd_phage_crispr_array_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage CRISPR Array Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/igvd_phage_crispr_array_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage CRISPR Array Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/img_vr_phage_crispr_array_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage CRISPR Array Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/gov2_phage_crispr_array_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage CRISPR Array Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/CRISPR_array_meta_data/stv_phage_crispr_array_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Antimicrobial Resistance Gene Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/all_antimicrobial_resistance_gene_data_v2.tsv"
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
                            RefSeq Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/RefSeq_antimicrobial_resistance_gene_data.tsv"
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
                            Genbank Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/Genbank_antimicrobial_resistance_gene_data.tsv"
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
                            GVD Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/GVD_antimicrobial_resistance_gene_data.tsv"
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
                            GPD Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/GPD_antimicrobial_resistance_gene_data.tsv"
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
                            MGV Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/MGV_antimicrobial_resistance_gene_data.tsv"
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
                            TemPhD Phage Antimicrobial Resistance Gene Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/TemPhD_antimicrobial_resistance_gene_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Antimicrobial Resistance Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/CHVD_antimicrobial_resistance_gene_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Antimicrobial Resistance Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/IGVD_antimicrobial_resistance_gene_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Antimicrobial Resistance Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/IMG_VR_antimicrobial_resistance_gene_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Antimicrobial Resistance Gene Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Antimicrobial_resistance_gene_meta_data_v2/GOV2_antimicrobial_resistance_gene_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Virulent Factor Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/all_virulent_factor_data_v2.tsv"
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
                            RefSeq Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/RefSeq_virulent_factor_data.tsv"
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
                            Genbank Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/Genbank_virulent_factor_data.tsv"
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
                            EMBL Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/EMBL_virulent_factor_data.tsv"
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
                            DDBJ Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/DDBJ_virulent_factor_data.tsv"
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
                            GVD Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/GVD_virulent_factor_data.tsv"
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
                            GPD Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/GPD_virulent_factor_data.tsv"
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
                            MGV Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/MGV_virulent_factor_data.tsv"
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
                            TemPhD Phage Virulent Factor Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/TemPhD_virulent_factor_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Virulent Factor Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/CHVD_virulent_factor_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Virulent Factor Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/IGVD_virulent_factor_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Virulent Factor Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/IMG_VR_virulent_factor_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Virulent Factor Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Virulent_factor_meta_data_v2/GO2_virulent_factor_data.tsv"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Transmembrane Protein Meta Data Download</div>
                    <div></div>
                </div>

                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            All Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/all_phage_transmembrane_protein_meta_data_v2.tsv"
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
                            RefSeq Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/refseq_phage_transmembrane_protein_meta_data.tsv"
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
                            Genbank Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/genbank_phage_transmembrane_protein_meta_data.tsv"
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
                            EMBL Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/embl_phage_transmembrane_protein_meta_data.tsv"
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
                            DDBJ Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/ddbj_phage_transmembrane_protein_meta_data.tsv"
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
                            PhagesDB Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/phagesdb_phage_transmembrane_protein_meta_data.tsv"
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
                            GVD Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/gvd_phage_transmembrane_protein_meta_data.tsv"
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
                            GPD Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/gpd_phage_transmembrane_protein_meta_data.tsv"
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
                            MGV Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/mgv_phage_transmembrane_protein_meta_data.tsv"
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
                            TemPhD Phage Transmembrane Protein Meta Data
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/temphd_phage_transmembrane_protein_meta_data.tsv"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage Transmembrane Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/chvd_phage_transmembrane_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage Transmembrane Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/igvd_phage_transmembrane_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage Transmembrane Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/img_vr_phage_transmembrane_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage Transmembrane Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/gov2_phage_transmembrane_protein_meta_data.tsv"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage Transmembrane Protein Meta Data"
                        link="https://phageapi.deepomics.org/files/Download/Transmembrane_protein_meta_data/stv_phage_transmembrane_protein_meta_data.tsv"
                    ></downloadItem>
                </div>
            </div>
        </div>
        <div id="fasta" class="pt-10">
            <div class="w-280 mt-20 border-b-1 border-[#3f6212] pb-3">
                <div class="text-[40px] text-[#3f6212] font-600">FASTA File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Phage FASTA File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            Genbank Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=Genbank"
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
                            RefSeq Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=RefSeq"
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
                            DDBJ Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=DDBJ"
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
                            EMBL Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=EMBL"
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
                            PhagesDB Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=PhagesDB"
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
                            GPD Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=GPD"
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
                            GVD Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=GVD"
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
                            MGV Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=MGV"
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
                            TemPhD Phage FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/download/phage/fasta/?datasource=TemPhD"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage FASTA File"
                        link="https://phageapi.deepomics.org/download/phage/fasta/?datasource=CHVD"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage FASTA File"
                        link="https://phageapi.deepomics.org/download/phage/fasta/?datasource=IGVD"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage FASTA File"
                        link="https://phageapi.deepomics.org/download/phage/fasta/?datasource=IMG_VR"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage FASTA File"
                        link="https://phageapi.deepomics.org/download/phage/fasta/?datasource=GOV2"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage FASTA File"
                        link="https://phageapi.deepomics.org/download/phage/fasta/?datasource=STV"
                    ></downloadItem>
                </div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/Genbank.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/RefSeq.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/DDBJ.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/EMBL.tar.gz"
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
                            PhagesDB Protein FASTA File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/PhagesDB.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/GPD.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/GVD.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/MGV.tar.gz"
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
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/TemPhD.tar.gz"
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
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/CHVD.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Protein FASTA File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/IGVD.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Protein FASTA File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/IMG_VR.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Protein FASTA File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/GOV2.tar.gz"
                    ></downloadItem>
                    <downloadItem
                        description="STV Protein FASTA File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/proteins/STV.tar.gz"
                    ></downloadItem>
                </div>
            </div>
        </div>
        <!-- <div id="gbk">
            <div class="w-280 mt-20 border-b-1 border-[#3f6212] pb-3">
                <div class="text-[40px] text-[#3f6212] font-600">GBK File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Phage GBK File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            Genbank Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/Genbank.gbk"
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
                            RefSeq Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/RefSeq.gbk"
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
                            DDBJ Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/DDBJ.gbk"
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
                            EMBL Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/EMBL.gbk"
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
                            PhagesDB Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/PhagesDB.gbk"
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
                            GPD Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/GPD.gbk"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                                d
                            </n-button>
                        </div>
                    </div>
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            GVD Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/GVD.gbk"
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
                            MGV Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/MGV.gbk"
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
                            TemPhD Phage GBK File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/TemPhD.gbk"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage GBK File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/CHVD.gbk"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage GBK File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/IGVD.gbk"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage GBK File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/IMG_VR.gbk"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage GBK File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/GOV2.gbk"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage GBK File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gbk/STV.gbk"
                    ></downloadItem>
                </div>
            </div>
        </div> -->
        <div id="gff3">
            <div class="w-280 mt-20 border-b-1 border-[#3f6212] pb-3">
                <div class="text-[40px] text-[#3f6212] font-600">GFF3 File Download</div>
            </div>
            <div class="w-280 mt-10">
                <div class="w-280 bg-[#3f6212] text-gray-50 p-4 text-[20px] font-600">
                    <div>Phage GFF3 File Download</div>
                    <div></div>
                </div>
                <div class="w-280 border-1 border-gray-700">
                    <div class="w-280 border-1 border-gray-700 h-13 flex flex-row">
                        <div
                            class="w-160 border-r-1 border-gray-700 h-13 flex-row flex pl-4 items-center text-[19px]"
                        >
                            Genbank Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/Genbank.gff3"
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
                            RefSeq Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/RefSeq.gff3"
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
                            DDBJ Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/DDBJ.gff3"
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
                            EMBL Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/EMBL.gff3"
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
                            PhagesDB Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/PhagesDB.gff3"
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
                            GPD Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/GPD.gff3"
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
                            GVD Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/GVD.gff3"
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
                            MGV Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/MGV.gff3"
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
                            TemPhD Phage GFF3 File
                        </div>
                        <div class="w-120 flex flex-row items-center justify-start">
                            <n-button class="ml-10 w-23 h-7 text-lg" text>
                                <template #icon>
                                    <n-icon class="text-lg">
                                        <Download />
                                    </n-icon>
                                </template>
                                <a
                                    href="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/TemPhD.gff3"
                                    target="_blank"
                                    class="btn"
                                >
                                    Click to Download
                                </a>
                            </n-button>
                        </div>
                    </div>
                    <downloadItem
                        description="CHVD Phage GFF3 File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/CHVD.gff3"
                    ></downloadItem>
                    <downloadItem
                        description="IGVD Phage GFF3 File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/IGVD.gff3"
                    ></downloadItem>
                    <downloadItem
                        description="IMG_VR Phage GFF3 File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/IMG_VR.gff3"
                    ></downloadItem>
                    <downloadItem
                        description="GOV2 Phage GFF3 File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/GOV2.gff3"
                    ></downloadItem>
                    <downloadItem
                        description="STV Phage GFF3 File"
                        link="https://phageapi.deepomics.org/fasta/phage_sequence/phage_gff3/STV.gff3"
                    ></downloadItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Download } from '@vicons/fa'
import downloadItem from './downloadItem.vue'
// import axios from 'axios'
</script>
