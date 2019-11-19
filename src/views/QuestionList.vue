<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>题目</BreadcrumbItem>
            <BreadcrumbItem>题目列表</BreadcrumbItem>
        </Breadcrumb>
        <div class="global-content-box">
            <div class="search-area">
                <Form ref="searchModel" :model="searchModel" :inline="true" label-position="right" :label-width="80">
                    <FormItem label="年级:">
                        <Select v-model="searchModel.gradeId" style="width:180px">
                            <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.gradeName }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="知识点:">
                        <Input v-model="searchModel.name" style="width: 180px;"/>
                    </FormItem>
                    <FormItem label="关键字:">
                        <Input v-model="searchModel.name" style="width: 180px;"/>
                    </FormItem>
                    <br>
                    <FormItem label="开始时间:">
                        <DatePicker @on-change="changeStartTime" v-model="searchModel.startTime" type="datetime"
                                    placeholder="请选择日期" style="width: 180px;"></DatePicker>
                    </FormItem>
                    <FormItem label="结束时间:">
                        <DatePicker @on-change="changeEndTime" v-model="searchModel.endTime" type="datetime"
                                    placeholder="请选择日期" style="width: 180px;"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="doSearch">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="table-area">
                <Table :loading="loading" border :columns="tableColumns" :data="tableData"></Table>
                <div class="global-pager">
                    <Page :total="totalSum" show-total @on-change="doChange" :current="searchModel.pageIndex"
                          :page-size="searchModel.pageSize" size="small"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuestionPage",

        data() {
            return {
                loading: false,
                searchModel: {
                    startTime: '',
                    endTime: '',
                    name: '',
                    gradeId: '',
                    pageSize: 10,
                    pageIndex: 1
                },
                gradeList: [{id: '', gradeName: ''}],
                tableColumns: [
                    {
                        title: '题目ID',
                        key: 'id'
                    },
                    {
                        title: '上传者',
                        key: 'userName'
                    },
                    {
                        title: '年级',
                        key: 'grade'
                    },
                    {
                        title: '知识点',
                        key: 'knowledge'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '状态',
                        key: 'valid',
                        // align:'center',
                        render: (h, params) => {
                            return h("span", params.row.valid === 0 ? '无效' : params.row.valid === 1 ? '审核中' : params.row.valid === 2 ? '审核失败' : '审核成功');
                        }
                    },
                    {
                        title: "操作",
                        key: "tb7",
                        render: (h, params) => {
                            return h(
                                "div",
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "info"
                                            },
                                            style: {
                                                marginRight: "8px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        name: "question-edit",
                                                        query: {id: params.row.id}
                                                    })
                                                }
                                            }
                                        },
                                        "查看"
                                    ),
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "primary"
                                            },
                                            on: {
                                                click: () => {
                                                    alert(params.row.id)
                                                }
                                            }
                                        },
                                        "编辑"
                                    )
                                ]
                            )
                        }
                    }
                ],
                tableData: [
                    {
                        id: '',
                        userName: '',
                        grade: '',
                        knowledge: '',
                        createTime: '',
                        valid: ''
                    }
                ],
                totalSum: 0
            }
        },

        methods: {
            changeStartTime(startTime) {
                this.searchModel.startTime = startTime;
            },
            changeEndTime(endTime) {
                this.searchModel.endTime = endTime;
            },

            // 获取年级列表
            getGradeList() {
                this.axios.get('/xmg/grade/all').then(res => {
                    if (res.data.code === 0) {
                        this.gradeList = res.data.data.list;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },

            // 查询题目列表
            doSearch() {
                this.loading = true;
                this.axios.post('/xmg/quest/list', this.searchModel).then(res => {
                    if (res.data.code === 0) {
                        this.tableData = res.data.data.list;
                        this.totalSum = res.data.data.total;
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    window.console.log(err);
                })
            },

            // 翻页
            doChange(pageIndex) {
                this.searchModel.pageIndex = pageIndex;
                this.doSearch();
            }
        },

        created() {
            this.getGradeList();
            this.doSearch();
        }
    }
</script>

<style scoped>
</style>
