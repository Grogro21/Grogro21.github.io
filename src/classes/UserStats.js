

export default class UserStats{
    constructor(game) {
        this.userName = game.userName
        this.globalSuccessRate = +game.calcGlobalSuccessRate().toFixed(2)
        let totalTime = 0
        let totalGuess = 0
        this.levels = []
        this.cards = []
        this.nbLevels = game.pastLevels.length
        game.pastLevels.forEach(level => {
            this.levels.push({
                "guesses": level.nbGuess,
                "time": +level.timer.toFixed(2),
                "bestScore": level.getMinScore(),
                "successRate": +level.calcSuccessRate().toFixed(2),
                "nbCards": level.cardSet.cardSet.length,
                "clics": level.levelClics
            })
            totalTime += level.timer
            totalGuess += level.nbGuess
        })
        game.pastLevels[game.pastLevels.length - 1].cardSet.cardSet.forEach(card => {
            this.cards.push({
                "id": card.name,
                "clics": card.clicCounter
            })
        })
        this.totalTime = +totalTime.toFixed(2)
        this.totalGuess = totalGuess
        this.startTime = game.startTime


    }
}