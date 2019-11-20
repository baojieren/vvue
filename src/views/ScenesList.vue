<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>系列管理</BreadcrumbItem>
            <BreadcrumbItem>系列列表</BreadcrumbItem>
        </Breadcrumb>

        <div class="global-content-box">
            <div class="search-area">
                <Form ref="searchModel" :model="searchModel" :inline="true" label-position="right" :label-width="80">
                    <Button type="info" @click="toCreatePage">
                        <Icon type="md-add"/>
                        新增
                    </Button>
                    <FormItem label="系列名称:">
                        <Input v-model="searchModel.title" style="width: 200px;" @keydown.enter.native="doSearch"
                               placeholder="支持模糊搜索" clearable/>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="searchModel.valid" style="width:200px">
                            <Option v-for="item in validValue" :value="item.value" :key="item.value">{{ item.title }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="doSearch">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="table-area">
                <Table :loading="loading" border :columns="tableColumns" :data="tableData"></Table>
                <div class="global-pager">
                    <Page :total="totalSum" show-total @on-change="doChangePage" :current="searchModel.pageIndex"
                          :page-size="searchModel.pageSize" size="small"/>
                </div>
            </div>
        </div>

        <!--模态框-->
        <Modal
                v-model="validModal"
                title=" "
                @on-ok="doValidModalOk">
            <pre style="text-align: center">{{validModalText}}</pre>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "scenesList",
        data() {
            return {
                loading: false,
                totalSum: 0,
                searchModel: {
                    title: '',
                    valid: null,
                    pageSize: 10,
                    pageIndex: 1
                },
                tableColumns: [
                    {
                        title: '系列名称',
                        key: 'title'
                    },
                    {
                        title: '图片',
                        key: 'img',
                        render: (h, params) => {
                            return h("img",
                                {
                                    attrs: {
                                        src: params.row.img[0]
                                    },
                                    'class': {
                                        'global-table-img': true
                                    }
                                });
                        }
                    },
                    {
                        title: '备注',
                        key: 'remake'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: "操作",
                        key: "tb5",
                        render: (h, params) => {
                            return h(
                                "div",
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: params.row.valid === 0 ? "default" : "error"
                                            },
                                            style: {
                                                marginRight: "8px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.validModal = true;
                                                    this.doValidItemId = params.row.id;
                                                    this.doValidItemValid = params.row.valid === 0 ? 1 : 0;
                                                    let s = params.row.valid === 0 ? "下架 " : "上架 ";
                                                    this.validModalText = "确定 " + s + params.row.title + "?";
                                                }
                                            }
                                        },
                                        params.row.valid === 0 ? "上架" : "下架"
                                    ),
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "primary"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        name: "scenes-edit",
                                                        query: {id: params.row.id}
                                                    })
                                                }
                                            }
                                        },
                                        "查看"
                                    )
                                ]
                            )
                        }
                    }
                ],
                tableData: [
                    {
                        title: '',
                        remake: '',
                        img: [],
                        createTime: ''
                    }
                ],
                validModal: false,
                validModalText: "",
                // 上架下架的id
                doValidItemId: null,
                doValidItemValid: null,
                // 上架下架的值
                validValue: [
                    {
                        title: "下架",
                        value: 0
                    },
                    {
                        title: "上架",
                        value: 1
                    }
                ],
            }
        },

        methods: {
            // 跳转到新增页面
            toCreatePage() {
                this.$router.push({name: 'scenes-edit'})
            },

            // 查询系列列表
            doSearch() {
                this.loading = true;
                this.axios.post('/jiaju/scenes/list', this.searchModel).then(res => {
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
            doChangePage(pageIndex) {
                this.searchModel.pageIndex = pageIndex;
                this.doSearch();
            },

            // 上下架确认框点击ok
            doValidModalOk() {
                this.axios.get("/jiaju/scenes/valid",
                    {
                        params: {id: this.doValidItemId, valid: this.doValidItemValid}
                    }).then(res => {
                    if (res.data.code === 0) {
                        this.$Message.success(res.data.msg);
                        this.doSearch();
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    window.console.log(err);
                })
            }
        },

        created() {
            this.doSearch();
        }
    }
</script>

<style scoped>
</style>
