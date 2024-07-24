<script>
import Card from "@/classes/Card.js";
import CardState from "@/classes/CardState.js"
import CardDataManagement from "@/classes/CardDataManagement.js"
export default {
    computed: {
        image() {
            return this.card.state == CardState.HIDDEN ? CardDataManagement.loadQmark() : CardDataManagement.loadCard(this.card, this.theme)
        }
    },
    methods: {
        getImage() {
            CardDataManagement.loadCard(this.card, this.theme)
        },
        selectCard() {
            this.$emit('selectCard',this.position)
        }
    },
    props: {
        theme: String,
        card:Card
    }
}
</script>

<template>
    <img :src="image" alt="" @click="selectCard">
</template>

<style scoped>
    img{
        width:12rem;
        height: 12rem;
    }
</style>