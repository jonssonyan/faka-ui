<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <!--搜索与添加区域-->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.content" clearable @clear="getCardList">
                        <el-button slot="append" icon="el-icon-search" @click="getCardList"></el-button>
                    </el-input>
                </el-col>
                <!--添加区域-->
                <el-col :span="4">
                    <el-button type="primary" @click="showAddDialog">添加卡密</el-button>
                </el-col>
                <!--卡密列表区域-->
                <el-table :data="cardList.records" border stripe>
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column label="商品名称" prop="product.name"></el-table-column>
                    <el-table-column label="卡密内容" prop="content"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime"></el-table-column>
                    <el-table-column label="是否有效">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state===0">未使用
                            </el-tag>
                            <el-tag type="danger" v-if="scope.row.state===1">已使用
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!--修改-->
                            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                                <el-button type="primary" icon="el-icon-edit" size="mini"
                                           @click="showEditDialog(scope.row)"></el-button>
                            </el-tooltip>
                            <!--删除-->
                            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                           @click="removeById(scope.row.id)"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!--分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="cardList.total">
            </el-pagination>
        </el-card>
        <!--添加分类的对话框-->
        <el-dialog
                title="添加卡密"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed">
            <!--内容主体区域-->
            <el-form :model="addCardForm" :rules="addCardRules" ref="addCardRef" label-width="70px">
                <el-form-item label="卡密内容" prop="content">
                    <el-input v-model="addCardForm.content"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="productId">
                    <el-select filterable v-model="addCardForm.productId" placeholder="请选择">
                        <el-option v-for="item in productList"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否使用" prop="state">
                    <el-select v-model="addCardForm.state">
                        <el-option v-for="(item,index) in options"
                                   :key="index"
                                   :value="item.value"
                                   :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrderInfo">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CardList",
        data() {
            return {
                queryInfo: {
                    pageNum: 1,
                    pageSize: 10
                },
                cardList: {
                    records: [],
                    total: 0
                },
                // 控制添加订单弹框的显示和隐藏
                addDialogVisible: false,
                addCardForm: {},
                // 添加订单的验证规则
                addCardRules: {
                    content: [
                        {required: true, message: '请输入卡密内容', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请输入卡密内容', trigger: 'blur'}
                    ],
                    productId: [
                        {required: true, message: '请输入卡密内容', trigger: 'blur'}
                    ]
                },
                productList: [],
                options: [
                    {label: '已使用', value: 1},
                    {label: '未使用', value: 0}
                ]
            }
        },
        created() {
            this.getCardList();
        },
        methods: {
            async getCardList() {
                let {data: res} = await this.$http.post(`/api/card/selectPage`, this.queryInfo);
                if (res.code !== 1) return this.$message.error(res.msg);
                this.cardList.records = res.data.records;
                this.cardList.total = res.data.total;
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize;
                this.getCardList()
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage;
                this.getCardList()
            },
            addDialogClosed() {
                this.$refs['addCardRef'].resetFields();
            },
            // 展示修改订单的对话框
            async showAddDialog() {
                let {data: res} = await this.$http.post(`/api/product/selectList`, {});
                this.productList = res.data;
                this.addDialogVisible = true;
            },
            // 添加订单信息并提交
            addOrderInfo() {
                this.$refs.addOrderRef.validate(async valid => {
                    if (!valid) return;
                    const {data: res} = await this.$http.post(`/api/card/saveOrUpdate`, this.addCardForm);
                    if (res.code !== 1) return this.$message.error(res.msg);
                    this.$message.success("修改订单成功");
                    // 隐藏添加订单对话框
                    this.addDialogVisible = false;
                    // 重新获取订单列表
                    this.getOrderList();
                })
            },
            // 根据id删除订单信息
            async removeOrderById(card) {
                // 弹框询问用户是否删除订单
                await this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // 删除订单
                    const {data: res} = await this.$http.post(`/api/card/removeById`, card);
                    if (res.code !== 1) return this.$message.error("删除订单失败");
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

<style scoped lang="less">
    .el-table {
        margin-top: 15px;
        font-size: 12px;
    }

    .el-pagination {
        margin-top: 15px;
    }
</style>