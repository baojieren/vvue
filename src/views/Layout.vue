<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu @on-select="onSelect" :open-names="openNames" :active-name="activeName" theme="dark" width="auto">
                <Submenu :name="menu.name" v-for="(menu,index) of menus" :key="index">
                    <template slot="title">
                        <Icon :type="menu.icon"></Icon>
                        {{menu.title}}
                    </template>
                    <MenuItem :name="child.name" :to="child.path" v-for="(child,idx) of menu.children" :key="idx">
                        {{child.title}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div class="userLogo">
                    欢迎
                    {{user.userName}}
                    <Divider type="vertical"/>
                    <span class="logout" @click="doLogout">退出</span>
                </div>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <router-view/>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    userName: ""
                },
                openNames: ['home'],
                activeName: "home-profile",
                menus: [
                    {
                        title: "首页",
                        name: "home",
                        icon: "ios-navigate",
                        children: [
                            {
                                title: "个人信息",
                                name: "home-profile",
                                path: "profile"
                            }, {
                                title: "题目中心",
                                name: "home-question",
                                path: "question"
                            }
                        ]
                    }, {
                        title: "菜单1",
                        name: "caiDan",
                        icon: "ios-bluetooth",
                        children: [
                            {
                                title: "子菜单1",
                                name: "caiDan-1",
                                path: "1"
                            }, {
                                title: "子菜单2",
                                name: "caiDan-2",
                                path: "2"
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            doLogout() {
                this.axios.get("/xmg/logout").then(res => {
                    if (res.data.code === 0) {
                        localStorage.clear();
                        sessionStorage.clear();
                        this.$router.push({name: "login"});
                        this.$Message.success(res.data.msg);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$Message.error(err.data.msg);
                })
            },

            // 点击菜单回调方法
            onSelect() {
                // this.activeName = name;
                // this.openNames = [name.split('-')[0]];
            }
        },
        created() {
            let userData = localStorage.getItem("user_data");
            if (userData === null) {
                this.router.push({name: "login"});
            } else {
                this.user = JSON.parse(userData);
            }
        }
    }
</script>

<style scoped>
    .layout {
        /*border: 1px solid #d7dde4;*/
        /*background: #f5f7f9;*/
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .userLogo {
        position: absolute;
        right: 20px;
        font-weight: bold;
    }

    .logout {
        cursor: pointer;
        font-weight: normal;
    }

    .logout:hover {
        color: #808695;
    }
</style>
