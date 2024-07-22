import CardState from "./CardState.js";
import CardSet from "./CardSet.js"

export default class Level {
    constructor(cardSet, nbCards) {
        this.cardSet = cardSet
        this.timer = 0
        this.isFinished = false
        this.timerRunning = null
        this.nbCards = nbCards
        this.nbGuess = 0
    }

    startTimer() {
        this.timerRunning = setInterval(() => this.timer++, 1000)
    }

    stopTimer() {
        clearInterval(this.timerRunning)
        this.timerRunning = null
    }

    getMinScore() {
        return this.nbCards / 2
    }

    selectCard(selectedPosition) {
        return this.cardSet.selectCard(selectedPosition)
    }


    guess() {
        this.nbGuess++

        if (this.cardSet.guessPair()) {
            return true
        }

        return false

    }

    endLevel() {
        for (const card of this.cardSet) {
            if (card.state == CardState.HIDDEN) {
                return false
            }
        }
        this.stopTimer()
        this.isFinished = true
        return true
    }

    calcSuccessRate() {
        return 100-((this.nbGuess-this.getMinScore())/this.nbGuess*100).toFixed(1)
    }
}