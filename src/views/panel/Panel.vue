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
                orderSeries: []
            }
        },
        beforeMount() {
            this.orderCharts();
        },
        mounted() {
            this.drawOrder();
            this.drawPrice();
        },
        methods: {
            async orderCharts() {
                let _orderXAxis = [];
                let _orderSeries = [];
                let {data: res} = await this.$http.post(`/api/order/orderCharts`, {});
                if (res.code !== 1) {
                    this.$message.error(res.msg)
                } else {
                    let map = res.data;
                    Object.keys(map).forEach(function (key) {
                        _orderXAxis.push(key);
                        _orderSeries.push(map[key]);
                    });
                }
                this.orderXAxis = _orderXAxis;
                this.orderSeries = _orderSeries;
                console.log(this.orderXAxis);
                console.log(this.orderSeries);
            },
            drawOrder() {
                console.log(this.orderXAxis);
                console.log(this.orderSeries);
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
                        data: this.orderXAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.orderSeries,
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
                            name: '收入(元)',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 1000]
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
