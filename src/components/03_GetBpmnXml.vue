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
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

let modeler = null
export default {
  name: 'GetBpmnXml',
  data() {
    return {
      flowContent: null,
    }
  },
  mounted() {
    modeler = new BpmnModeler({
      container: '#camunda-designer',
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 右侧属性
        BpmnPropertiesPanelModule,
        // 左边工具栏以及节点
        BpmnPropertiesProviderModule
      ]
    });

    // 添加事件, 监听流程图的变更
    modeler.on('commandStack.changed',  () => {
      // 箭头函数, this指向vue实例
      this.saveDiagram()
    })

    // ask_of_level.bpmn hr_staff_enter.bpmn
    this.fetchFlow('ask_of_level.bpmn');
  },
  methods: {
    saveDiagram() {
      // 获取xml
      modeler.saveXML({ format: true }).then(({ xml }) => console.info('流程图变更, 这是xml文件', xml));
    },
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

      modeler.importXML(this.flowContent).then(function (result) {
        const {warnings} = result;
        console.log('success !', warnings);
        modeler.get('canvas').zoom('fit-viewport');
      }).catch(function (err) {
        const {warnings, message} = err;
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
}
</style>