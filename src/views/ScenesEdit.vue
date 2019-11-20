<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>系列管理</BreadcrumbItem>
            <BreadcrumbItem>系列编辑</BreadcrumbItem>
        </Breadcrumb>

        <div class="global-content-box">
            <Form :model="saveScenesFormData" label-position="right" :label-width="100">
                <FormItem label="系列名称:">
                    <Input v-model="saveScenesFormData.title" style="width: 200px" placeholder="请输入系列名称"/>
                </FormItem>
                <FormItem label="系列备注:">
                    <Input v-model="saveScenesFormData.remake" style="width: 200px" placeholder="请输入系列备注"/>
                </FormItem>
                <FormItem label="系列图片:">
                    <div class="uploadImg">
                        <div class="demo-upload-list" v-for="item in uploadList" :key="item.uid">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>

                        <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                type="drag"
                                :action="imgUpdateData.domain"
                                :data="imgUpdateData"
                                style="display: inline-block;width:260px;;">
                            <div style="width: 260px;height:255px;line-height: 260px;">
                                <Icon type="ios-cloud-upload" size="50"></Icon>
                            </div>
                        </Upload>

                        <Modal :title="modalImgName" v-model="modalVisible" footer-hide fullscreen>
                            <img :src="modalImgUrl" v-if="modalVisible" style="max-width: 95vw;">
                        </Modal>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="doSaveScenes('saveScenesFormData')">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import baseConfig from '@/utils/baseConfig.js'

    export default {
        data() {
            return {
                defaultList: [],
                modalImgName: '',
                modalImgUrl: '',
                modalVisible: false,
                uploadList: [],
                imgUpdateData: {
                    key: "",
                    token: "",
                    domain: 'http://upload-z2.qiniup.com'
                },

                // 保存系列的表单数据
                saveScenesFormData: {
                    id: null,
                    title: '',
                    remake: '',
                    imgUrlList: []
                }
            }
        },

        methods: {
            handleView(file) {
                this.modalImgName = file.name;
                this.modalImgUrl = file.url;
                this.modalVisible = true;
            },

            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },

            handleSuccess(res, file) {
                if (res.key) {
                    file.url = baseConfig.baseImgUrl + res.key;
                }
            },

            handleFormatError() {
                this.$Notice.error({
                    title: '目前仅支持 jpg, png, jpeg 格式'
                });
            },

            handleMaxSize() {
                this.$Notice.error({
                    title: '文件最大支持10M'
                });
            },

            handleBeforeUpload(file) {
                const check = this.uploadList.length > 5;
                if (check) {
                    this.$Notice.error({
                        title: '最大支持5张图片'
                    });
                    return false;
                }
                // 拿上传图片token
                this.axios.get("/jiaju/img/token", {
                    params: {fileName: file.name}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.imgUpdateData.key = res.data.data.key;
                        this.imgUpdateData.token = res.data.data.token;
                        this.$refs.upload.post(file);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$Message.error(err.data.msg)
                });
                return false;
            },

            // 保存系列信息
            doSaveScenes() {
                if (this.uploadList.length < 1) {
                    this.$Message.error("必须搞张图片才行");
                    return false;
                }
                this.saveScenesFormData.imgUrlList = this.uploadList.map(img => img.url);
                window.console.log(this.saveScenesFormData);
                this.axios.post(this.$route.query.id ? "/jiaju/scenes/update" : "/jiaju/scenes/save", this.saveScenesFormData).then(res => {
                    if (res.data.code === 0) {
                        this.$Message.info(res.data.msg);
                        this.$router.push({name: "scenes-list"})
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            },

            // 查询详情
            doQueryDetail(id) {
                this.axios.get("jiaju/scenes/one", {params: {id: id}}).then(res => {
                    if (res.data.code === 0) {
                        this.saveScenesFormData.id = res.data.data.id;
                        this.saveScenesFormData.title = res.data.data.title;
                        this.saveScenesFormData.remake = res.data.data.remake;
                        this.defaultList = res.data.data.img.map(item => {
                            return {url: item}
                        });
                        this.$nextTick(() => {
                            this.uploadList = this.$refs.upload.fileList;
                        });
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    window.console.log(err);
                })
            }
        },

        created() {
            if (this.$route.query.id) {
                this.doQueryDetail(this.$route.query.id);
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>

<style>
    .demo-upload-list {
        display: inline-block;
        width: 260px;
        height: 260px;
        text-align: center;
        line-height: 260px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 50px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
