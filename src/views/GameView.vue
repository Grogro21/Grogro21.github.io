<script>
import Game from "@/classes/Game.js"
import GameDataManagement from "@/classes/GameDataManagement.js"
import GameBoard from "@/components/GameBoard.vue"
import WaitingScreen from "@/components/WaitingScreen.vue";
import HeaderBoard from "@/components/HeaderBoard.vue";
import EndingScreen from "@/components/EndingScreen.vue"
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
        GameBoard, WaitingScreen, HeaderBoard, EndingScreen
    },
    async mounted() {
        const userData = GameDataManagement.loadSession()
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
        <HeaderBoard v-if="game.currentLevel != null && !game.isFinished && game.betweenTimerRunning == false" :game="game"></HeaderBoard>
        <GameBoard :game="game" v-if="game.betweenTimerRunning == false && !game.isFinished"></GameBoard>
        <WaitingScreen v-if="game.betweenTimerRunning != false && !game.isFinished" :timer="game.betweenLevelsTimer">
        </WaitingScreen>
        <EndingScreen v-if="game.isFinished" :game="game"></EndingScreen>
    </div>
</template>