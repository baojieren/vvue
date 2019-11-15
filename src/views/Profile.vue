<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>个人信息</BreadcrumbItem>
        </Breadcrumb>
        <div class="main-content-box">
            <Card>
                <p slot="title">当前收益:</p>
                <div>
                    <div class="overTitle">账户名:</div>
                    <span>{{userOverview.userName}}</span>
                </div>
                <div>
                    <div class="overTitle">审核通过数:</div>
                    <span>{{userOverview.passSum}}</span>
                </div>
                <div>
                    <div class="overTitle">被使用数:</div>
                    <span>{{userOverview.usedSum}}</span>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                userOverview: {
                    passSum: 0,
                    usedSum: 0,
                    userName: ""
                }
            }
        },
        methods: {
            getUserOverview() {
                this.axios.get("/xmg/user/overview", {
                    params: {id: JSON.parse(localStorage.getItem("user_data")).userId}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.userOverview = res.data.data;
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                })
            }
        },
        components: {},
        created() {
            this.getUserOverview();
        }
    }
</script>

<style scoped>
    .content-box{
        background-color: #fff;
        padding: 20px;
        min-height: 700px;
        border-radius: 5px;
    }
    .overTitle {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 10px;
    }
</style>
