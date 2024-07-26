<script>
import Game from "@/classes/Game.js"
import GameDataManagement from "@/classes/GameDataManagement.js"
import GameBoard from "@/components/GameBoard.vue"
import WaitingScreen from "@/components/WaitingScreen.vue";
export default {
    data() {
        return {
            game: null,
            theme: "",
            variant: "",
            userName: ""
        }
    },
    components: {
        GameBoard, WaitingScreen
    },
    async beforeCreate() {
        const userData = await GameDataManagement.loadSession()
        this.userName = userData[0]
        this.theme = userData[1]
        this.variant = userData[2]
        this.game = new Game(this.theme, this.variant, this.userName)
        await this.game.genCardSet()
        this.game.nextLevel()
    }
}
</script>
<template>
    <div v-if="game != null">
        <GameBoard :game="game" v-if="game.betweenTimerRunning == false"></GameBoard>
        <WaitingScreen v-else :timer="game.betweenLevelsTimer"></WaitingScreen>
    </div>
</template>