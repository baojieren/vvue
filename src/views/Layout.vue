<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :open-names="openNames" :active-name="this.$route.name" theme="dark"
                  width="auto" ref="menu">
                <Submenu :name="menu.name" v-for="(menu,index) of menus" :key="index">
                    <template slot="title">
                        <Icon :type="menu.icon"></Icon>
                        {{menu.title}}
                    </template>
                    <MenuItem :name="child.pathName" :to="child.pathName" v-for="(child,idx) of menu.children"
                              :key="idx">
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
                menus: [
                    {
                        title: "用户",
                        name: "user",
                        icon: "ios-navigate",
                        children: [
                            {
                                title: "个人信息",
                                pathName: "user-profile",
                            }
                        ]
                    }, {
                        title: "题目",
                        name: "question",
                        icon: "md-list",
                        children: [
                            {
                                title: "题目列表",
                                pathName: "question-list",
                            },
                            {
                                title: "题目详情",
                                pathName: "question-edit",
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
            onSelect(name) {
                if (this.$route.name !== name) {
                    this.$router.push({name: name});
                }
            }
        },

        computed: {
            openNames() {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                });
                return [this.$route.name.split("-")[0]];
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
