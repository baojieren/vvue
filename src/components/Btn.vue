<template>
    <div>
        <button @click="clickBtn">{{btnName}}</button>
        <slot name="slot1" :slotCon="slotCon">
            {{slotCon.aa}}
        </slot>
    </div>
</template>

<script>
    export default {
        name: "Btn",
        props: {
            title: {
                default: '按钮默认'
            },
            ren: {},
            rr: {}
        },
        data() {
            return {
                btnName: this.title,
                slotCon: {
                    aa: "组件里定义的aa",
                    bb: "组件里定义的bb"
                }
            }
        },
        methods: {
            clickBtn() {
                this.btnName = '你好啊';
                this.$emit('clickBtn', this.btnName + this.title)
            }
        }
    }
</script>

<style scoped>

</style>
