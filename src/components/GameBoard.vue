<script>
import Game from "@/classes/Game.js";
import CardItem from "@/components/CardItem.vue";
export default {

    computed: {
        cardset() {
            return this.game.currentLevel.cardSet.cardSet
        },
        currentSelection() {
            return this.game.currentLevel.cardSet.currentSelection
        },
    },
    components: {
        CardItem
    },
    props: {
        game: Game
    },
    methods: {
        async selectCard(position) {
            await this.game.play(position)
            
            
        }
    }
}
</script>

<template>
    <div v-if="game?.currentLevel != null">
        <figure v-for="card of cardset" :key="card.id">
            <CardItem :card="card" :nbCards="game.currentLevel.nbCards" :theme="game.theme" @selectCard="selectCard" />
        </figure>

    </div>

</template>

<style scoped>
div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 auto;
    width: fit-content;
}

figure {
    margin: 0;
}
</style>