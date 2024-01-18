import Vue from 'vue'
import VueRouter from 'vue-router'
import CamundaSimpleView from '@/components/01_SimpleView.vue'
import CamundaEditAndProperties from '@/components/02_EditAndPropertiesPanel.vue'
import GetBpmnXml from '@/components/03_GetBpmnXml.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/CamundaSimpleView',
      component: CamundaSimpleView
    },
    {
      path: '/CamundaEditAndProperties',
      component: CamundaEditAndProperties
    },
    {
      path: '/GetBpmnXml',
      component: GetBpmnXml
    }
  ]
});

export default router;
