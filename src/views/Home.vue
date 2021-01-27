<template>
    <el-container class="home-container">
        <!--主题区域-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse?'64px':'255px'">
                <div class="sidebar-logo-container">
                    <router-link v-if="isCollapse" class="sidebar-logo-link" to="/home">
                        <img src="../assets/logo.png" class="sidebar-logo">
                    </router-link>
                    <router-link v-else class="sidebar-logo-link" to="/home">
                        <img src="../assets/logo.png" class="sidebar-logo">
                        <h1 class="sidebar-title">以梦系统</h1>
                    </router-link>
                </div>
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409EFF" :unique-opened="true" :collapse="isCollapse"
                        :collapse-transition="false" :router="true" :default-active="activePath">
                    <!--一级菜单-->
                    <el-submenu :index="item.id.toString()" v-for="item in menuList" :key="item.id">
                        <!--一级菜单模板区域-->
                        <template slot="title">
                            <!--图标-->
                            <i :class="item.icon"></i>
                            <!--文本-->
                            <span>{{item.name}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item :index="'/'+menu.path"
                                      v-for="menu in item.menuLists" :key="menu.id"
                                      @click="saveNavState('/'+menu.path)">
                            <template slot="title">
                                <!--图标-->
                                <i :class="menu.icon"></i>
                                <!--文本-->
                                <span>{{menu.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <!--头部区域-->
                <el-header class="container-header">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <el-badge :value="3" class="item">
                        <el-button size="small">未处理订单</el-button>
                    </el-badge>
                    <el-button type="info" @click="logout">退出</el-button>
                </el-header>
                <!--右侧主题内容-->
                <el-main class="container-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                menuList: [],
                isCollapse: false,
                activePath: '',
                menuListForm: {
                    pageSize: 1,
                    pageNum: -1
                }
            }
        },
        async created() {
            let {data: res} = await this.$http.post('/api/menuList/selectList', this.menuListForm);
            if (res.code !== 1) {
                this.$message.error(res.msg)
            } else {
                this.menuList = res.data
            }
            // 记录上一次激活的菜单
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout: function () {
                window.sessionStorage.clear();
                this.$router.push('/login')
            },
            toggleCollapse: function () {
                this.isCollapse = !this.isCollapse
            },
            saveNavState: function (activePath) {
                window.sessionStorage.setItem('activePath', activePath)
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            .avatar-container {
                margin-right: 10px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-name {
                        vertical-align: top;
                        font-size: .9rem;
                        margin-left: 5px;
                        margin-top: -4px;
                        display: inline-block;
                    }

                    .user-avatar {
                        cursor: pointer;
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        vertical-align: text-bottom;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

    // 左侧导航栏
    .el-aside {
        background-color: #333744;

        .el-menu {
            border-right: none;
        }
    }

    // 右侧主区域
    .el-main {
        background-color: #EAEDF1;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 54px;
        line-height: 54px;
        background: #333744;
        text-align: center;
        overflow: hidden;

        .sidebar-logo-link {
            height: 100%;
            width: 100%;
        }

        .sidebar-logo {
            width: 32px;
            margin-right: 12px;
            display: inline-block;
            vertical-align: middle;
            margin-bottom: -2px;
        }

        .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 500;
            line-height: 50px;
            font-size: 19px;
            vertical-align: middle;

            span {
                font-size: 12px;
                letter-spacing: 1px;
            }
        }
    }
</style>
