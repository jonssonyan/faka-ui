<template>
    <div>
        <el-row :gutter="1">
            <el-col :span="6">
                <el-card shadow="hover">
                    用户总数
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    订单总数
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    商品总数
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    卡密总数
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="1">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="user" style="width: 100%; height:500px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="order" style="width: 100%; height:500px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {}
        },
        created() {
        },
        mounted() {
            this.drawUser();
            this.drawOrder();
        },
        methods: {
            drawUser() {
                // 基于准备好的dom，初始化echarts实例
                const myChart = this.$echarts.init(document.getElementById('user'));
                // 绘制图表
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                });
            },
            drawOrder() {
                // 基于准备好的dom，初始化echarts实例
                const myChart = this.$echarts.init(document.getElementById('order'));
                // 绘制图表
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }]
                });
            }
        }
    }
</script>

<style scoped lang="less">
    div .el-card {
        margin: 5px;
    }
</style>