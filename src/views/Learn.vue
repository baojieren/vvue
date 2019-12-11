<template>
    <div>
        <Btn :title="title" :ren="rr" :vv="ivalue" @clickBtn="changeValue">
        </Btn>
    </div>
</template>

<script>

    export default {
        name: "Learn",
        data() {
            return {
                ivalue: 1,
                icheaked: null,
                iselected: null,
                optionList: [
                    {
                        name: '湖南',
                        value: 1
                    }, {
                        name: '贵阳',
                        value: 2
                    }, {
                        name: '背景',
                        value: 3
                    }

                ],
                title:'按钮名称',
                rr:{
                    name:"版本"
                }
            }
        },
        methods: {
            changeValue(event) {
                alert(event);
                alert(this.title);
            }
        },
        computed: {},
        watch: {}
    }
</script>

<style scoped>

</style>
