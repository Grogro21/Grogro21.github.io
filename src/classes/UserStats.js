

export default class UserStats{
    constructor(game) {
        this.userName = game.userName
        this.globalSuccessRate = game.calcGlobalSuccessRate()
        let totalTime = 0
        let totalGuess = 0
        this.levels = []
        this.cards = []
        this.nbLevels = game.pastLevels.length
        game.pastLevels.forEach(level => {
            this.levels.push({
                "guesses": level.nbGuess,
                "time": level.timer,
                "bestScore": level.getMinScore(),
                "successRate": level.calcSuccessRate(),
                "nbCards": level.cardSet.cardSet.length,
                "clics": level.clics
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
        this.totalTime = totalTime
        this.totalGuess = totalGuess
        this.startTime = game.startTime


    }
}