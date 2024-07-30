<script>
import CardDataManagement from "@/classes/CardDataManagement.js"
export default {
    computed: {
        image() {
            return CardDataManagement.loadCard(this.card.id, this.theme)
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
    props: {
        theme: String,
        card: Object,
        nbCards: Number
    }
}
</script>

<template>
    <div>
        <img :src="image" alt="" :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }">
        <p>Nombre de clics totaux: {{ card.clics }}</p>
    </div>
</template>

<style scoped>
img {
    border: 2px solid black
}
</style>