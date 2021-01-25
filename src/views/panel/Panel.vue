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
                    <div id="order" style="width: 100%; height:500px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
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
            return {
                orderXAxis: [],
                orderSeries: [],
                priceXAxis: [],
                priceSeries: [],
            }
        },
        mounted() {
            this.drawChart();
        },
        methods: {
            drawChart() {
                const that = this;
                this.$http.post(`/api/order/orderCharts`, {}).then(data => {
                    const res = data.data;
                    if (res.code !== 1) {
                        this.$message.error(res.msg)
                    } else {
                        let map = res.data;
                        Object.keys(map).forEach(function (key) {
                            that.orderXAxis.push(key);
                            that.orderSeries.push(map[key]);
                        });
                    }
                    // 基于准备好的dom，初始化echarts实例
                    const orderChart = this.$echarts.init(document.getElementById('order'));
                    // 绘制图表
                    orderChart.setOption({
                        title: {
                            text: '订单统计'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: that.orderXAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: that.orderSeries,
                            type: 'line',
                            areaStyle: {}
                        }]
                    });
                });
                this.$http.post(`/api/order/priceCharts`, {}).then(data => {
                    let res = data.data;
                    if (res.code !== 1) {
                        this.$message.error(res.msg)
                    } else {
                        let map = res.data;
                        Object.keys(map).forEach(function (key) {
                            that.priceXAxis.push(key);
                            that.priceSeries.push(map[key]);
                        });
                    }
                    // 基于准备好的dom，初始化echarts实例
                    const priceChart = this.$echarts.init(document.getElementById('price'));
                    // 绘制图表
                    priceChart.setOption({
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
                                data: that.priceXAxis,
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
                                name: '收入(元)',
                                type: 'bar',
                                barWidth: '60%',
                                data: that.priceSeries
                            }
                        ]
                    });
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
