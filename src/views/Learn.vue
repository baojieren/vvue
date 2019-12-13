<template>
    <div>
        <svg width="200" height="200">
            <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
        </svg>
    </div>
</template>

<script>

    export default {
        name: "Learn",
        data() {
            return {
                beShow: true,
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
                title: '按钮名称',
                rr: {
                    name: "版本"
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
.red{
    fill:red
}
</style>
