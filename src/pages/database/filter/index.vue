<template>
    <div class="h-full flex flex-col py-10 px-30 justify-start items-center">
        <div class="text-3xl text-gray-600">Sequence Filter</div>
        <div
            class="rounded w-280 h-180 mt-15 rounded-xl"
            style="box-shadow: 0 0 64px #cfd5db"
            v-loading="loading"
        >
            <div class="mt-25">
                <el-form status-icon label-width="auto" label-position="right">
                    <el-row justify="space-around">
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Host Phylum">
                                <el-tooltip
                                    effect="dark"
                                    content="Host Phylum is the taxonomic rank below kingdom and above class."
                                    placement="top"
                                    popper-class="popper-class"
                                    class=""
                                >
                                    <el-icon class="info-icon">
                                        <InfoFilled />
                                    </el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.HostType"
                                    placeholder="Select Host Type"
                                    class="w-60 left"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in hostTypeOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Datasets">
                                <el-tooltip effect="dark" content="Dataset" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.datasets"
                                    placeholder="Select datasets"
                                    multiple
                                    clearable
                                    class="w-60"
                                >
                                    <el-option
                                        v-for="option in datasetsOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Cluster">
                                <el-tooltip
                                    effect="dark"
                                    content="Search Cluster Name"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <!-- <el-select
                                    v-model="filterform.cluster"
                                    placeholder="Select cluster"
                                    class="w-60 left"
                                    clearable
                                    filterable
                                    allow-create
                                >
                                    <el-option
                                        v-for="option in clusterOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select> -->
                                <el-input
                                    v-model="filterform.cluster"
                                    class="w-60"
                                    placeholder="Search Cluster Name"
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Subcluster">
                                <el-tooltip
                                    effect="dark"
                                    content="Search subCluster name"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <!-- <el-select
                                    v-model="filterform.subcluster"
                                    placeholder="Select Subcluster"
                                    class="w-60"
                                    clearable
                                    filterable
                                    allow-create
                                >
                                    <el-option
                                        v-for="option in subclusterOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select> -->
                                <el-input
                                    v-model="filterform.subcluster"
                                    class="w-60"
                                    placeholder="Search subCluster Name"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="9.5">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Mobility">
                                <el-tooltip effect="dark" content="Mobility" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.mobility"
                                    placeholder="Select Mobility"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in mobilityOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Completeness">
                                <el-tooltip effect="dark" content="Completeness" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.completeness"
                                    placeholder="Select Sequence Completeness"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in completenessOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="9.5">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of ARGs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of Antibiotic Resistance Genes"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.args"
                                    placeholder="Select Presence of ARGs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of VFs">
                                <el-tooltip effect="dark" content="Presence of VFs" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.vfs"
                                    placeholder="Select Presence of VFs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="9.5">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of SMs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of Secondary Metabolites"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.sms"
                                    placeholder="Select Presence of SMs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of SPs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of Signal Peptides"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.sps"
                                    placeholder="Select Presence of SPs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="9.5">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of tRNAs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of tRNAs & tmRNAs"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.trnas"
                                    placeholder="Select Presence of tRNAs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of TPs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of Transmembrane Proteins"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.tmhs"
                                    placeholder="Select Presence of TPs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="9.5">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="0.5" :offset="2"></el-col> -->
                        <el-col :span="9">
                            <el-form-item label="Presence of C/Cs">
                                <el-tooltip
                                    effect="dark"
                                    content="Presence of CRISPR/Cas systems"
                                    placement="top"
                                >
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.crisprs"
                                    placeholder="Select Presence of C/Cs"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in presenceOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="Length">
                                <el-tooltip effect="dark" content="Length" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-input
                                    v-model.number="filterform.LengthS"
                                    class="w-20"
                                    type="number"
                                    min="0"
                                />
                                <div class="mx-3">
                                    <el-icon><Minus /></el-icon>
                                </div>
                                <el-input
                                    v-model.number="filterform.LengthE"
                                    class="w-20"
                                    type="number"
                                    min="0"
                                />
                                <div class="ml-4">kb</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="space-around">
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <!-- <el-col :span="9">
                            <el-form-item label="Length">
                                <el-tooltip effect="dark" content="Length" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-input
                                    v-model.number="filterform.LengthS"
                                    class="w-20"
                                    type="number"
                                    min="0"
                                />
                                <div class="mx-3">
                                    <el-icon><Minus /></el-icon>
                                </div>
                                <el-input
                                    v-model.number="filterform.LengthE"
                                    class="w-20"
                                    type="number"
                                    min="0"
                                />
                                <div class="ml-4">kb</div>
                            </el-form-item>
                        </el-col> -->
                        <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                        <!-- <el-col :span="9">
                            <el-form-item label="Annotation Ref">
                                <el-tooltip effect="dark" content="Annotation Ref" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-select
                                    v-model="filterform.annotationRef"
                                    placeholder="Select annotation ref"
                                    class="w-60"
                                    clearable
                                >
                                    <el-option
                                        v-for="option in annotationRefOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="9">
                            <el-form-item label="GC Content">
                                <el-tooltip effect="dark" content="GC Content" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-input
                                    v-model.number="filterform.gcContentS"
                                    class="w-22"
                                    type="number"
                                    min="0"
                                />
                                <div class="mx-3">
                                    <el-icon><Minus /></el-icon>
                                </div>
                                <el-input
                                    v-model.number="filterform.gcContentE"
                                    class="w-22"
                                    type="number"
                                    min="0"
                                />
                                <div class="ml-3">%</div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- <el-row class="mt-4"> -->
                    <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                    <!-- <el-col :span="12">
                            <el-form-item label="LifeStyle" class="ml-17">
                                <el-tooltip effect="dark" content="LifeStyle" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-radio-group v-model="filterform.lifestyle" class="w-70">
                                    <el-radio label="virulent" />
                                    <el-radio label="temperate" />
                                    <el-radio label="all" />
                                </el-radio-group>
                            </el-form-item>
                        </el-col> -->
                    <!-- <el-col :span="0.5" :offset="2"></el-col> -->
                    <!-- <el-col :span="12">
                            <el-form-item label="GC Content" class="ml-17">
                                <el-tooltip effect="dark" content="GC Content" placement="top">
                                    <el-icon class="info-icon"><InfoFilled /></el-icon>
                                </el-tooltip>
                                <el-input
                                    v-model.number="filterform.gcContentS"
                                    class="w-22"
                                    type="number"
                                    min="0"
                                />
                                <div class="mx-3">
                                    <el-icon><Minus /></el-icon>
                                </div>
                                <el-input
                                    v-model.number="filterform.gcContentE"
                                    class="w-22"
                                    type="number"
                                    min="0"
                                />
                                <div class="ml-3">%</div>
                            </el-form-item>
                        </el-col> -->
                    <!-- </el-row> -->
                    <el-row class="mt-12">
                        <el-col :span="24" class="text-center">
                            <el-button type="primary" @click="submitFilter">Submit</el-button>
                            <el-button type="info" @click="resetFilterForm()">Reset</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4" justify="center">
                        <el-col :span="15">
                            <el-alert
                                v-if="showError"
                                v-model:title="alertTitle"
                                type="error"
                                center
                                show-icon
                            />
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { InfoFilled, Minus } from '@element-plus/icons-vue'
import {
    annotationRefOptions,
    datasetsOptions,
    qualityOptions,
    clusterOptions,
    subclusterOptions,
    hostTypeOptions,
    taxonomyOptions,
    mobilityOptions,
    completenessOptions,
    presenceOptions,
} from '@/utils/filteroption'
import { useQueryStore } from '@/store/query'

const queryStore = useQueryStore()
const loading = ref(false)

const filterform = ref({
    HostType: '',
    cluster: '',
    annotationRef: '',
    subcluster: '',
    quality: '',
    datasets: [],
    mobility: '',
    completeness: '',
    args: '',
    vfs: '',
    sms: '',
    sps: '',
    tmhs: '',
    trnas: '',
    crisprs: '',
    LengthS: 0,
    LengthE: 100,
    gcContentS: 30,
    gcContentE: 70,
    lifestyle: 'all',
    Taxonomy: '',
})
const router = useRouter()
const showError = ref(false)
const alertTitle = ref('Please select/fill at least one filter')

const checkNumericField = (field: string | number, label: string) => {
    if (Number.isNaN(field)) {
        showError.value = true
        alertTitle.value = `${label}: please input a number`
        return false
    }
    if ((field as number) < 0) {
        showError.value = true
        alertTitle.value = `${label}: please input a positive number`
        return false
    }
    return true
}
const isAllNumericFieldValid = () => {
    if (checkNumericField(filterform.value.LengthS, 'Length') === false) {
        return false
    }
    if (checkNumericField(filterform.value.LengthE, 'Length') === false) {
        return false
    }
    if (filterform.value.LengthS > filterform.value.LengthE) {
        showError.value = true
        alertTitle.value = `Length: start value should be smaller than end value`
        return false
    }
    if (checkNumericField(filterform.value.gcContentS, 'GC Content') === false) {
        return false
    }
    if (checkNumericField(filterform.value.gcContentE, 'GC Content') === false) {
        return false
    }
    if (filterform.value.gcContentS > filterform.value.gcContentE) {
        showError.value = true
        alertTitle.value = `GC Content: start value should be smaller than end value`
        return false
    }
    return true
}
const submitFilter = async () => {
    if (isAllNumericFieldValid() === false) {
        showError.value = true
    } else {
        loading.value = true
        queryStore.filterdata = JSON.stringify(filterform.value)
        router.push({
            path: `/database/filter/result`,
        })
    }

    loading.value = false
}
const resetFilterForm = () => {
    filterform.value = {
        HostType: '',
        cluster: '',
        annotationRef: '',
        subcluster: '',
        quality: '',
        datasets: [],
        mobility: '',
        completeness: '',
        args: '',
        vfs: '',
        sms: '',
        sps: '',
        tmhs: '',
        trnas: '',
        crisprs: '',
        LengthS: 0,
        LengthE: 100,
        gcContentS: 30,
        gcContentE: 70,
        lifestyle: 'all',
        Taxonomy: '',
    }
}
</script>

<style>
.el-icon.info-icon {
    color: #79bbff;
}
.el-form-item__label-wrap {
    margin-right: 0px !important;
}
.el-form-item__label {
    padding-right: 3px !important;
}
.el-row {
    position: relative;
}
.info-icon {
    margin-right: 32px;
}
/* .left {
    position: absolute;
    left: 200px;
    display: inline-block;
} */
</style>
