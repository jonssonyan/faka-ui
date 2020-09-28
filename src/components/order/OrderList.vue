<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <!--搜索与添加区域-->
                <el-col :span="8">
                    <el-input placeholder="请输入订单编号" v-model="queryInfo.outTradeNo" clearable @clear="getOrderList()">
                        <el-button slot="append" icon="el-icon-search" @click="getOrderList()"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--订单列表区域-->
            <el-table :data="orderList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="商品名称" prop="productName"></el-table-column>
                <el-table-column label="数量" prop="quantity"></el-table-column>
                <el-table-column label="订单标题" prop="subject"></el-table-column>
                <el-table-column label="订单编号" prop="outTradeNo"></el-table-column>
                <el-table-column label="总金额" prop="totalAmount"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="是否上架">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state" @change="stateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--修改-->
                        <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <!--删除-->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click="removeOrderById(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <!--修改订单的对话框-->
        <el-dialog
                title="修改订单"
                :visible.sync="editDialogVisible"
                width="50%">
            <!--内容主体区域-->
            <el-form :model="editOrderForm" :rules="addOrderRules" ref="addOrderRef" label-width="70px">
                <el-form-item label="订单标题" prop="subject">
                    <el-input v-model="editOrderForm.subject"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="editOrderForm.state" placeholder="请选择">
                        <el-option v-for="(item,index) in options"
                                   :key="index"
                                   :value="item.value"
                                   :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editOrderInfo()">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrderList",
        data() {
            return {
                queryInfo: {
                    pageNum: 1,
                    pageSize: 10
                },
                orderList: [],
                total: 0,
                // 设置添加订单弹框的显示和隐藏
                addDialogVisible: false,
                // 添加的订单对象
                addOrderForm: {
                    parent: null,
                    state: true
                },
                // 修改的订单对象
                editOrderForm: {},
                // 添加订单的验证规则
                addOrderRules: {
                    subject: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请输入状态', trigger: 'blur'}
                    ]
                },
                options: [
                    {label: '上架', value: true},
                    {label: '下架', value: false}
                ],
                orderFormExceptSelf: [],
                // 控制修改订单对话框的显示与隐藏
                editDialogVisible: false
            }
        },
        created() {
            this.getOrderList();
        },
        methods: {
            async getOrderList() {
                let {data: res} = await this.$http.post(`/order/admin/selectByPage/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`, this.queryInfo);
                if (res.code !== 1) return this.$message.error("获取订单列表失败！");
                for (const order of res.data.records) {
                    let {data: res1} = await this.$http.post(`/product/selectOne/${order.productId}`, this.queryInfo);
                    order.productName = res1.data.name;
                }
                this.orderList = res.data.records;
                this.total = res.data.total;
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize;
                this.getOrderList()
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage;
                this.getOrderList()
            },
            async stateChange(info) {
                let {data: res} = await this.$http.post(`/order/admin/updateById/${info.id}`, info);
                if (res.code !== 1) {
                    info.state = !info.state;
                    return this.$message.error("更新状态失败")
                }
                this.$message.success("更新状态成功")
            },
            // 监听添加订单对话框的关闭事件
            addDialogClosed() {
                this.$refs.addOrderRef.resetFields();
            },
            // 展示修改订单的对话框
            async showEditDialog(id) {
                const {data: res} = await this.$http.post(`/order/admin/selectOne/${id}`);
                if (res.code !== 1) {
                    this.$message.error("查询订单失败")
                }
                this.editOrderForm = res.data;
                this.editDialogVisible = true;
            },
            // 修改订单信息并提交
            editOrderInfo(id) {
                this.$refs.addOrderRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改订单的网络请求
                    id = this.editOrderForm.id;
                    const {data: res} = await this.$http.post(`/order/admin/updateById/${id}`, this.editOrderForm);
                    if (res.code !== 1) {
                        this.$message.error(res.data)
                    }
                    this.$message.success("修改订单成功");
                    // 隐藏添加订单对话框
                    this.editDialogVisible = false;
                    // 重新获取订单列表
                    this.getOrderList();
                })
            },
            // 根据id删除订单信息
            async removeOrderById(id) {
                // 弹框询问用户是否删除订单
                await this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // 删除订单
                    const command = {
                        ids: []
                    };
                    command.ids[0] = id;
                    const {data: res} = await this.$http.post(`/order/admin/deleteByIds`, command);
                    if (res.code !== 1) {
                        this.$message.error("删除订单失败");
                    }
                    this.$message.success("删除订单成功");
                    // 重新获取订单列表
                    this.getOrderList();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-table {
        margin-top: 15px;
        font-size: 12px;
    }

    .el-pagination {
        margin-top: 15px;
    }
</style>