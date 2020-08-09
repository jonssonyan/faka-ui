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
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!--添加区域-->
                <el-col :span="4">
                    <el-button type="primary">添加</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data() {
            return {}
        },
        created() {
            this.getCategoryList;
        },
        methods: {
            async getCategoryList() {
                let {data: res} = await this.$http.post('/category/findAll')
                console.log(res)
            }
        }
    }
</script>

<style scoped>

</style>