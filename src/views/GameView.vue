<script>
import Game from "@/classes/Game.js"
import GameDataManagement from "@/classes/GameDataManagement";
import GameBoard from "@/components/GameBoard.vue"
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
        GameBoard
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
    <GameBoard :game="game"></GameBoard>
</template>