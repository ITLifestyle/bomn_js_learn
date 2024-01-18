<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']" :router="true">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>camunda案例</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="CamundaSimpleView" route="CamundaSimpleView">显示流程图
                            </el-menu-item>
                            <el-menu-item index="CamundaEditAndProperties" route="CamundaEditAndProperties">流程图工具栏
                            </el-menu-item>
                            <el-menu-item index="GetBpmnXml" route="GetBpmnXml">获取xml信息
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(20).fill(item)
        }
    }
};
</script>

<style scoped>
html, body {
    height: 100%;
    overflow: hidden;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>