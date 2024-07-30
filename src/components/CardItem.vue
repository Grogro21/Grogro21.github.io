<script>
import Card from "@/classes/Card.js";
import CardState from "@/classes/CardState.js"
import CardDataManagement from "@/classes/CardDataManagement.js"
export default {
    computed: {
        image() {
            return this.card.state == CardState.HIDDEN ? CardDataManagement.loadQmark() : CardDataManagement.loadCard(this.card.name, this.theme)
        },
        cardSize() {
            if (this.nbCards < 12) {
                return 24
            }
            if (this.nbCards < 18) {
                return 19
            }
            if (this.nbCards < 22) {
                return 15
            }
            return 13
            
            
        }
    },
    methods: {
       
        selectCard() {
            this.$emit('selectCard',this.card.position)
        }
    },
    props: {
        theme: String,
        card: Card,
        nbCards:Number
    }
}
</script>

<template>
    <img :src="image" alt="" @click="selectCard" :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }">
</template>

<style scoped>
    img{     
        border:2px solid black
    }
</style>