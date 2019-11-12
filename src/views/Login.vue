<template>
    <div class="main">
        <div class="form_area">
            <div class="login_text">登录</div>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0" :show-message="false">
                <FormItem prop="phone">
                    <Input type="text" v-model="formCustom.phone" placeholder="请输入手机号" prefix="ios-call"
                           style="width: 370px;"/>
                </FormItem>
                <FormItem prop="password">
                    <Input @keydown.enter.native="handleSubmit('formCustom')" type="password"
                           v-model="formCustom.password" placeholder="请输入密码" prefix="md-lock"
                           style="width: 370px;"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">登录
                    </Button>
                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">重填</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (value.length !== 11) {
                    callback(new Error('请输入正确的手机号!'));
                } else {
                    callback();
                }
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码必须不能小于6位'));
                } else {
                    callback();
                }
            };

            return {
                formCustom: {
                    phone: '',
                    password: ''
                },
                ruleCustom: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 登录
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.doLogin();
                    } else {
                        this.$Message.error('请输入正确信息');
                    }
                })
            },

            // 重填
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            // 登录
            doLogin() {
                this.axios.post('xmg/login', this.formCustom).then(res => {
                    if (res.data.code === 0) {
                        let userData = res.data.data;

                        let roleList = userData.roleList.map(item => {
                            return item.roleTag;
                        });
                        localStorage.setItem("user_data", JSON.stringify(userData));
                        localStorage.setItem("user_token", JSON.stringify(userData.token));
                        localStorage.setItem("user_roles", JSON.stringify(roleList));
                        this.$router.push({path: './'})
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    window.console.log(err);
                })
            }
        },
        created() {
            sessionStorage.clear();
            localStorage.clear();
        }
    }
</script>

<style scoped>
    .main {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #000;
    }

    .form_area {
        text-align: center;
        position: absolute;
        width: 520px;
        height: 350px;
        border-radius: 5px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #fff;
    }

    .login_text {
        font-size: 24px;
        font-weight: bold;
        margin: 35px 0;
    }

</style>
