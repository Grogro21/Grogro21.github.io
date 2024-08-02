import CardState from "./CardState.js";


export default class Level {
    constructor(cardSet, nbCards, id) {
        this.cardSet = cardSet
        this.timer = 0
        this.isFinished = false
        this.timerRunning = null
        this.nbCards = nbCards
        this.nbGuess = 0
        this.idLevel = id
        this.levelClics = []
        this.cardSet.cardSet.forEach(card => {
            this.levelClics.push({"name":card.name,"clics":card.clicCounter})
        });
        this.hideEverything()
    }

    hideEverything() {
        this.cardSet.cardSet.forEach(card => {
            card.state = CardState.HIDDEN
        });
    }
    startTimer() {
        this.timerRunning = setInterval(() => this.timer += 0.1, 100)
    }

    stopTimer() {
        clearInterval(this.timerRunning)
        this.timerRunning = null
    }

    getMinScore() {
        return this.nbCards
    }

    selectCard(selectedPosition) {
        return this.cardSet.selectCard(selectedPosition)
    }

    async guess(position) {
        if (this.timerRunning == null) {
            this.startTimer()
        }
        const isPair = await this.cardSet.guessPair(position)
        if (isPair != "noIncrement") {
            this.nbGuess++
        }
        if (isPair) {
            return true
        }

        return false
    }

    shuffleLevelCardSet() {

        this.cardSet.shuffleSet()
    }
    endLevel() {
        for (const card of this.cardSet.cardSet) {
            if (card.state == CardState.HIDDEN) {
                return false
            }
        }

        for (const i in this.levelClics) {
            this.levelClics[i].clics = this.cardSet.cardSet[i].clicCounter - this.levelClics[i].clics
        }
            
        this.stopTimer()
        this.isFinished = true
        return true
    }

    calcSuccessRate() {
        return 100 - ((this.nbGuess / 2 - this.getMinScore()) / (this.nbGuess / 2) * 100).toFixed(1)
    }
}