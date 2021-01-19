<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的导出</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <!--搜索与添加区域-->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getExportFileList">
                        <el-button slot="append" icon="el-icon-search" @click="getExportFileList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--导出列表区域-->
            <el-table :data="exportFileList.records" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.state===1">已下载
                        </el-tag>
                        <el-tag type="info" v-if="scope.row.state===0">未下载
                        </el-tag>
                        <el-tag type="danger" v-if="scope.row.state===-1">正在成
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--下载-->
                        <el-tooltip effect="dark" content="下载" placement="top" :enterable="false"
                                    v-if="scope.row.state===1 || scope.row.state===0">
                            <el-button type="success" icon="el-icon-bottom" size="mini"
                                       @click="downloadExportFile(scope.row)"></el-button>
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
                    :total="exportFileList.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ExportFile",
        data() {
            return {
                queryInfo: {
                    pageNum: 1,
                    pageSize: 10
                },
                exportFileList: {
                    records: [],
                    total: 0
                }
            }
        },
        created() {
            this.getExportFileList();
        },
        methods: {
            async getExportFileList() {
                let {data: res} = await this.$http.post(`/api/exportFile/selectPage`, this.queryInfo);
                if (res.code !== 1) return this.$message.error(res.msg);
                this.exportFileList.records = res.data.records;
                this.exportFileList.total = res.data.total;
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize;
                this.getExportFileList()
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage;
                this.getExportFileList()
            },
            // 根据id删除订单信息
            async removeById(card) {
                // 弹框询问用户是否删除订单
                await this.$confirm('此操作将永久删除该导出, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // 删除订单
                    const {data: res} = await this.$http.post(`/api/exportFile/removeById`, card);
                    if (res.code !== 1) return this.$message.error("删除导出失败");
                    this.$message.success("删除导出成功");
                    // 重新获取订单列表
                    this.getExportFileList();
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
            },
            async downloadExportFile(file) {
                let {data: res} = await this.$http.post(`/api/exportFile/downloadExportFile`, file);
                if (res.code !== 1) return this.$message.error(res.msg);
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