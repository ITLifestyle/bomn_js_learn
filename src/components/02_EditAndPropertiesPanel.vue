<template>
    <div id="CamundaLeftTool" class="full-height">
        <el-row class="full-height">
            <el-col :span="18" class="full-height">
                <div id="camunda-designer" class="full-height"></div>
            </el-col>
            <el-col :span="6" class="full-height">
                <div class="properties-panel-parent full-height" id="js-properties-panel"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

// 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import '@bpmn-io/properties-panel/assets/properties-panel.css'

// bpmn-js
import BpmnModeler from 'bpmn-js/lib/Modeler';
// 工具栏插件
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
    /*useService,
    ZeebePropertiesProviderModule,
    ZeebeTooltipProvider*/
} from 'bpmn-js-properties-panel';

import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'

let viewer = null
export default {
    name: 'EditAndProperties',
    data() {
        return {
            flowContent: null,
        }
    },
    mounted() {
        viewer = new BpmnModeler({
            container: '#camunda-designer',
            // 添加控制板
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
                // 右侧属性
                BpmnPropertiesPanelModule,
                // 左边工具栏以及节点
                BpmnPropertiesProviderModule,
                //
                CamundaPlatformPropertiesProviderModule,
                /*useService,
                ZeebePropertiesProviderModule,
                ZeebeTooltipProvider*/
            ],
            moddleExtensions: {
              camunda: CamundaBpmnModdle
            }
        });
        // ask_of_level.bpmn hr_staff_enter.bpmn
        this.fetchFlow('ask_of_level.bpmn');
    },
    methods: {
        fetchFlow(fileName) {
            fetch(`/flow/${fileName}`)
                .then(response => response.text())
                .then(data => {
                    this.flowContent = data;
                })
                .catch(error => {
                    console.error('Error fetching text file:', error);
                });
        },
        renderFlow() {
            console.log('render..............')
            if (this.flowContent === null || this.flowContent.length === 0) {
                console.error('flow content is empty!');
            }

            viewer.importXML(this.flowContent).then(function (result) {
                const { warnings } = result;
                console.log('success !', warnings);
                console.log('camunda viwer: ', viewer)
                console.log('camunda-designer: ', viewer.get('canvas'))
                viewer.get('canvas').zoom('fit-viewport');
            }).catch(function (err) {
                const { warnings, message } = err;
                console.log('something went wrong:', warnings, message);
            });
        }
    },
    watch: {
        flowContent() {
            this.renderFlow();
        }
    }
}
</script>

<style>
.full-height {
    height: 100%;
}</style>