<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu @on-select="onSelect" active-name="1-1" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        首页
                    </template>
                    <MenuItem name="1-1" to="profile">个人信息</MenuItem>
                    <MenuItem name="1-2" to="question">题库中心</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
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
                user: {userName: ""}
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
            onSelect() {
                // alert(item);
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
