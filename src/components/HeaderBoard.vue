<script>
import GameDataManagement from "@/classes/GameDataManagement.js"
import Game from "@/classes/Game.js";
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            variant: '',
            bestPossible: 0
        }
    },
    mounted() {
        const data = GameDataManagement.loadSession()
        this.firstName = data[0].split(" ")[0]
        this.lastName = data[0].split(" ")[1]
        this.variant = data[2] == "test" ? "Test de mémoire" : "Réapprentissage"
        this.bestPossible = this.game.currentLevel.getMinScore()
    },
    props: {
        game: Game
    },
    computed:{
        nbGuess() {
            return (this.game?.currentLevel?.nbGuess /2).toFixed(0)
        },
        timer() {
            return ((this.game?.currentLevel?.timer / 60).toFixed(0)) + " min " + ((this.game?.currentLevel?.timer % 60).toFixed(0))+ " s"
        } 
    }
}

</script>
<template>
    <h1>Memory</h1>
    <div>
        <p>Prénom: {{ firstName }}</p>
        <p>Nom: {{ lastName }}</p>
        <p>Variante: {{ variant }}</p>
        <p>temps écoulé: {{ timer }}</p>
        <p>score: {{ nbGuess }}</p>
        <p>meilleur possible: {{ bestPossible }}</p>
    </div>

</template>

<style scoped>
h1{
    margin:0;
    text-align: center;
}
div {
    display: flex;
    justify-content: space-around;
    border-bottom: solid 4px black;
    margin-bottom: 1rem;
}

</style>