<template>
    <div id="camundaSimpleViwer">
        <h1> Designer </h1>
        <div id="camunda-designer">

        </div>
    </div>
</template>

<script>
import BpmnViewer from 'bpmn-js'

let viewer = null

export default {
    name: 'CamundaSimpleViwer',
    data() {
        return {
            flowContent: null,
        }
    },
    mounted() {
        viewer = new BpmnViewer({
            container: '#camunda-designer'
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

<style scoped>
#camundaSimpleViwer, #camunda-designer {
    width: 100%;
    height: 100%;
}
</style>