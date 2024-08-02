<script>
export default {
    props: {
        timer:Number
    },
    methods: {
        formatTimer() {
            return (this.timer / 1000 % 60 < 10 ? "0" + this.timer / 1000 % 60 : this.timer / 1000 % 60)
        }
    }
}
</script>

<template>
    <p>{{ (Math.floor(timer/1000/60)) }} min {{ this.formatTimer() }} s</p>
</template>

<style scoped>
    p{
        text-align:center;
        font-size: 2000%;
        margin:0
    }
</style>

