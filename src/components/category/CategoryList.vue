<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <!--搜索与添加区域-->
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getCategoryList">
                        <el-button slot="append" icon="el-icon-search" @click="getCategoryList"></el-button>
                    </el-input>
                </el-col>
                <!--添加区域-->
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
                </el-col>
            </el-row>
            <!--用户列表区域-->
            <el-table :data="categoryList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="是否上架">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state" @change="stateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <!--修改-->
                        <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>
                        <!--删除-->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
        <!--添加用户的对话框-->
        <el-dialog
                title="添加分类"
                :visible.sync="dialogVisible"
                width="50%">
            <!--内容主体区域-->
            <el-form :model="addCategoryForm" :rules="addCategoryRules" ref="addCategoryRef" label-width="70px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addCategoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="父级" prop="parent">
                    <el-input v-model="addCategoryForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-input v-model="addCategoryForm.state"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data() {
            return {
                queryInfo: {
                    name: '',
                    pageNum: 1,
                    pageSize: 10
                },
                categoryList: [],
                total: 0,
                // 设置添加分类弹框的显示和隐藏
                dialogVisible: false,
                // 添加的分类对象
                addCategoryForm: {},
                // 添加分类的验证规则
                addCategoryRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    parent:[
                        {required: true, message: '请输入父级', trigger: 'blur'},
                    ],
                    state: [
                        {required: true, message: '请输入状态', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getCategoryList();
        },
        methods: {
            async getCategoryList() {
                let {data: res} = await this.$http.post(`/admin/category/findByPage/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`, this.queryInfo)
                if (res.code !== 1) return this.$message.error("获取分类列表失败！")
                this.categoryList = res.data.records
                this.total = res.data.total
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getCategoryList()
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage
                this.getCategoryList()
            },
            async stateChange(info) {
                let {data: res} = await this.$http.post(`/admin/category/updateById/${info.id}`, info)
                if (res.code !== 1) {
                    info.state = !info.state
                    return this.$message.error("更新状态失败")
                }
                this.$message.success("更新状态成功")
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