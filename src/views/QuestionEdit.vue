<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>题目</BreadcrumbItem>
            <BreadcrumbItem>题目详情</BreadcrumbItem>
        </Breadcrumb>

        <div class="global-content-box">
            {{questionInfo.questionData.questionTextFirst}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuestionEdit",
        data() {
            return {
                questionInfo: {
                    questionData: {questionTextFirst: ""}
                }
            }
        },
        methods: {
            getQuestionInfo() {
                this.axios.get("xmg/quest/one",
                    {
                        params: {id: this.$route.query.id}
                    }).then(res => {
                    window.console.log(res.data.data);
                    this.questionInfo = res.data.data;
                })
            }
        },
        created() {
            this.getQuestionInfo();
        }
    }
</script>

<style scoped>

</style>
