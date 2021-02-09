<template>
    <div class="app">
        <!--面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>配置列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card class="el-card">
            <el-row :gutter="20">
                <!--搜索与添加区域-->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.appId" clearable @clear="getConfigList()">
                        <el-button slot="append" icon="el-icon-search" @click="getConfigList()"></el-button>
                    </el-input>
                </el-col>
                <!--添加区域-->
                <el-col :span="4">
                    <el-button type="primary" @click="showAddDialog">添加配置</el-button>
                </el-col>
            </el-row>
            <!--配置列表区域-->
            <el-table :data="configList.records" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="app id" prop="appId"></el-table-column>
                <el-table-column label="私钥" prop="merchantPrivateKey"></el-table-column>
                <el-table-column label="公钥" prop="aliPayPublicKey"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch :active-value=1
                                   :inactive-value=0
                                   v-model="scope.row.state"
                                   @change="stateChange(scope.row)">
                        </el-switch>
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
                                       @click="removeById(scope.row)"></el-button>
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
                    :total="configList.total">
            </el-pagination>
        </el-card>
        <!--添加配置的对话框-->
        <el-dialog
                title="添加配置"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed">
            <!--内容主体区域-->
            <el-form :model="addConfigForm" :rules="addConfigRules" ref="addConfigRef" label-width="70px">
                <el-form-item label="app id" prop="appId">
                    <el-input v-model="addConfigForm.appId"></el-input>
                </el-form-item>
                <el-form-item label="私钥" prop="merchantPrivateKey">
                    <el-input v-model="addConfigForm.merchantPrivateKey"></el-input>
                </el-form-item>
                <el-form-item label="公钥" prop="aliPayPublicKey">
                    <el-input v-model="addConfigForm.aliPayPublicKey"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="addConfigForm.state" placeholder="请选择">
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
    <el-button type="primary" @click="addConfig">确 定</el-button>
  </span>
        </el-dialog>
        <!--修改配置的对话框-->
        <el-dialog
                title="修改配置"
                :visible.sync="editDialogVisible"
                width="50%">
            <!--内容主体区域-->
            <el-form :model="editConfigForm" :rules="addConfigRules" ref="addConfigRef" label-width="70px">
                <el-form-item label="app id" prop="name">
                    <el-input v-model="editConfigForm.appId"></el-input>
                </el-form-item>
                <el-form-item label="私钥" prop="merchantPrivateKey">
                    <el-input v-model="editConfigForm.merchantPrivateKey"></el-input>
                </el-form-item>
                <el-form-item label="公钥" prop="aliPayPublicKey">
                    <el-input v-model="editConfigForm.aliPayPublicKey"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="editConfigForm.state" placeholder="请选择">
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
    <el-button type="primary" @click="editConfigInfo">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Alipay",
        data() {
            return {
                queryInfo: {
                    pageNum: 1,
                    pageSize: 10
                },
                configList: {
                    records: [],
                    total: 0
                },
                // 控制添加配置弹框的显示和隐藏
                addDialogVisible: false,
                // 控制修改配置对话框的显示与隐藏
                editDialogVisible: false,
                // 添加的配置对象
                addConfigForm: {
                    state: 1
                },
                // 修改的配置对象
                editConfigForm: {},
                // 添加配置的验证规则
                addConfigRules: {
                    appId: [
                        {required: true, message: '请输入app id', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    merchantPrivateKey: [
                        {required: true, message: '请输入私钥', trigger: 'blur'}
                    ],
                    aliPayPublicKey: [
                        {required: true, message: '请输入公钥', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请输入状态', trigger: 'blur'}
                    ]
                },
                options: [
                    {label: '已启动', value: 1},
                    {label: '未启用', value: 0}
                ]
            }
        },
        created() {
            this.getConfigList();
        },
        methods: {
            async getConfigList() {
                let {data: res} = await this.$http.post(`/api/aliPay/selectPage`, this.queryInfo);
                if (res.code !== 1) return this.$message.error("获取配置列表失败！");
                this.configList.total = res.data.total;
                this.configList.records = res.data.records;
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize;
                this.getConfigList()
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage;
                this.getConfigList()
            },
            async stateChange(aliPay) {
                let {data: res} = await this.$http.post(`/api/aliPay/saveOrUpdate`, aliPay);
                if (res.code !== 1) {
                    aliPay.state = !aliPay.state;
                    return this.$message.error("更新状态失败")
                }
                this.$message.success("更新状态成功")
            },
            // 监听添加配置对话框的关闭事件
            addDialogClosed() {
                this.$refs['addConfigRef'].resetFields();
            },
            // 点击按钮添加新配置
            addConfig() {
                this.$refs.addConfigRef.validate(async valid => {
                    if (!valid) return;
                    // 发起添加配置的网络请求
                    const {data: res} = await this.$http.post('/api/aliPay/saveOrUpdate', this.addConfigForm);
                    if (res.code !== 1) return this.$message.error(res.data);
                    this.$message.success("添加配置成功");
                    // 隐藏添加配置对话框
                    this.addDialogVisible = false;
                    // 重新获取配置列表
                    this.getConfigList();
                })
            },
            // 展示修改配置的对话框
            async showEditDialog(Config) {
                const {data: res} = await this.$http.post(`/api/aliPay/getById`, Config);
                if (res.code !== 1) return this.$message.error("查询配置失败");
                this.editConfigForm = res.data;
                this.editDialogVisible = true;
            },
            // 展示添加配置的对话框
            async showAddDialog() {
                this.addDialogVisible = true;
            },
            // 修改配置信息并提交
            editConfigInfo() {
                this.$refs.addConfigRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改配置的网络请求
                    const {data: res} = await this.$http.post(`/api/aliPay/saveOrUpdate`, this.editConfigForm);
                    if (res.code !== 1) return this.$message.error(res.msg);
                    this.$message.success("修改配置成功");
                    // 隐藏添加配置对话框
                    this.editDialogVisible = false;
                    // 重新获取配置列表
                    this.getConfigList();
                })
            },
            // 根据id删除配置信息
            async removeById(Config) {
                // 弹框询问用户是否删除配置
                await this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // 删除配置
                    const {data: res} = await this.$http.post(`/api/aliPay/removeById`, Config);
                    if (res.code !== 1) return this.$message.error("删除配置失败");
                    this.$message.success("删除配置成功");
                    // 重新获取配置列表
                    this.getConfigList();
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
    .app .el-card {
        width: 99%;
    }
</style>
