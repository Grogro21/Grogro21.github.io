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
        }
    },
    components: {
        CardItem
    },
    props: {
        game: Game
    },
    methods: {
        selectCard(position) {
            this.game.currentLevel.cardSet.selectCard(position)

        }
    }
}
</script>

<template>
    <div v-if="game?.currentLevel != null">
        <figure v-for="card of cardset" :key="card.id">
            <CardItem :card="card" :theme="game.theme" @selectCard="selectCard" />
        </figure>

    </div>

</template>

<style scoped>
div {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    margin: 0 auto;
    width: fit-content;
}

figure {
    margin: 0;
}
</style>