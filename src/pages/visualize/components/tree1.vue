<template>
    <el-scrollbar class="h-240 w-300">
        <div class="w-300 h-20 flex flex-row">
            <el-radio-group
                v-model="checkboxGroup"
                size="large"
                class="mt-2 ml-5"
                @change="Vizchange"
            >
                <el-radio-button label="Linear">Linear</el-radio-button>
                <el-radio-button label="Radial">Radial</el-radio-button>
            </el-radio-group>
            <!-- <el-button-group class="ml-10 mt-6" size="large">
                <el-button round>
                    <el-icon class="text-xl"><RemoveFilled /></el-icon>
                </el-button>
                <el-button round>
                    <el-icon class="text-xl"><CirclePlusFilled /></el-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAlt />
                    </n-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAltH />
                    </n-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAltV />
                    </n-icon>
                </el-button>
            </el-button-group> -->
        </div>
        <div id="tree_container" class="h-300 w-900 ml-20"></div>
    </el-scrollbar>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import * as phylotree from 'phylotree'
import _ from 'lodash'
import axios from 'axios'
import { RemoveFilled, CirclePlusFilled, FullScreen } from '@element-plus/icons-vue'
import { ArrowsAlt, ArrowsAltH, ArrowsAltV } from '@vicons/fa'

const props = defineProps({
    treeUrl: String,
    clusterid: String,
    isdemo: Boolean,
    type:String,
    task_id:String,
    annlist:Array,
    
})






onBeforeMount(async () => {
    if (props.isdemo) {

        if (props.type === 'cluster'){
            const response = await axios.get(`tasks/result/tree/`, 
            {
                baseURL: '/api',timeout: 10000,
                params: {
                    clsuter_id: props.clusterid as string,
                    taskid: props.task_id as string,
                },
            }
            )
            treedata.value = response.data

        }
        else if (props.type === 'tree'){
            const response = await axios.get(`tasks/result/tree/`, 
                {
                    baseURL: '/api',timeout: 10000,
                    params: {
                        taskid: props.task_id as string,
                    },
                }
            )
            treedata.value = response.data
        }
        else{        
            const response = await axios.get(props.treeUrl)
            treedata.value = response.data
        }

    } 
    else {

        const response = await axios.get(`/cluster/tree`, {
            baseURL: '/api',
            timeout: 10000,
            params: {
                id: props.clusterid as string,
            },
        })
        treedata.value = response.data
        
    }

    draw_tree()
})

const is_radial = ref(false)
const treedom = ref(null)
const treedata = ref(null)

const checkboxGroup = ref('Linear')
function edge_colorizer(element, data) {
    try {
        element.style('stroke-width', '2px')
        element.style('fill', 'none')
        element.style('stroke', '#4d6a7f')
    } catch (e) {}
}

function node_styler(element, data) {
    try {
        element.style('fill', '#4d6a7f')

        if (props.isdemo || props.type === 'cluster'){
            if (data.data.name !== '')
                {
                    const colorScale = d3.scaleOrdinal()
                        .domain(_.keys(_.groupBy(props.annlist,'subcluster')))
                        .range(d3.schemeCategory10)
                    const subcluster = _.find(props.annlist, {phage_id: data.data.name}).subcluster
                    const color = colorScale(subcluster)
                    element.style('fill', color)
                }
        }
    } catch (e) {}
}

function draw_tree() {
    const tree = new phylotree.phylotree(treedata.value)
    tree.render({
        container: '#tree_container',
        'is-radial': is_radial.value,
        'show-scale': true,
        brush: false,
        zoom: false,
        'edge-styler': edge_colorizer,
        'node-styler': node_styler,
        'draw-size-bubbles': true,
        'minimum-per-level-spacing': 20,
        'minimum-per-node-spacing':10
    })

    tree.display.alignTips(true)
    tree.display.font_size=15
    tree.display.update()
    console.log(tree.display)

    treedom.value = tree.display.show()
    console.log(treedom.value)
    treedom.value.id = 'tree'

    if (is_radial.value === true && props.isdemo === false) {
        treedom.value.setAttribute('transform', `translate(-780, -890) scale(0.39)`)
    } else if (is_radial.value === true && props.isdemo === true) {
        treedom.value.setAttribute('transform', `translate(-480, -490) scale(0.50)`)
    }
    document.querySelector('#tree_container').appendChild(treedom.value)
}



const Vizchange = () => {
    if (checkboxGroup.value === 'Radial') {
        is_radial.value = true
    } else {
        is_radial.value = false
    }
    document.getElementById('tree').remove()
    draw_tree()
}
</script>
