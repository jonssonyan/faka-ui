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
                    今日交易额
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
        <el-row :gutter="1">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div id="price" style="width: 100%; height:500px;"></div>
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
            this.drawPrice();
        },
        methods: {
            drawUser() {
                // 基于准备好的dom，初始化echarts实例
                const myChart = this.$echarts.init(document.getElementById('user'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '用户统计'
                    },
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
                    title: {
                        text: '订单统计'
                    },
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
            },
            drawPrice() {
                // 基于准备好的dom，初始化echarts实例
                const myChart = this.$echarts.init(document.getElementById('price'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '收入统计'
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
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