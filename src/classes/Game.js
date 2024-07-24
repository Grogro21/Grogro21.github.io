import GameDataManagement from "./GameDataManagement.js"
import Level from "./Level.js"
import CardSet from "./CardSet.js"
import Card from "./Card.js"

export default class Game {
    constructor(theme, type, userName) {
        this.currentLevel = null
        this.theme = theme
        this.pictures = []
        this.type = type
        this.isFinished = false
        this.userName = userName
        this.startTime = new Date()
        this.betweenLevelsTimer = 0
        this.betweenTimerRunning = false
        this.pastLevels = []
        this.globalCardSet = []
    }



    async genCardSet() {
        this.pictures = await GameDataManagement.readPicturesData(this.theme)
        let json = ""
        if (this.type == "test") {
            json = this.pictures.slice(0, 12)
        }
        else {
            json = this.pictures.slice(0, 28)
        }

        const cardSet = []
        for (const { id, name } of json) {
            cardSet.push(new Card(id, 2 * id - 1, name))
            cardSet.push(new Card(id, id * 2, name))
        }
        this.globalCardSet = new CardSet(cardSet)

    }

    getNbLevels() {
        return this.type == "test" ? 6 : 7
    }

    genLevel() {
        if (this.type == "test") {
            this.currentLevel = new Level(this.globalCardSet, 12)

        }
        else {
            switch (this.currentLevel.idLevel) {
                case 1:
                    this.currentLevel = new Level(this.globalCardSet, 2)
                    break;
                case 2:
                    this.currentLevel = new Level(this.globalCardSet, 4)
                    break;
                case 3:
                    this.currentLevel = new Level(this.globalCardSet, 8)
                    break;
                case 4:
                    this.currentLevel = new Level(this.globalCardSet, 12)
                    break;
                case 5:
                    this.currentLevel = new Level(this.globalCardSet, 16)
                    break;
                case 6:
                    this.currentLevel = new Level(this.globalCardSet, 20)
                    break;
                case 7:
                    this.currentLevel = new Level(this.globalCardSet, 28)
                    break;
                default:
                    break;
            }
            this.currentLevel.shuffleLevelCardSet()
        }
    }

    startInterLevelTimer() {
        this.betweenTimerRunning = setInterval(() => this.betweenLevelsTimer--, 1000)
    }

    stopInterLevelTimer() {
        clearInterval(this.betweenTimerRunning)
        this.betweenTimerRunning = false
    }

    nextLevel() {
        
        if (this.pastLevels.length==0) {
            this.currentLevel = new Level(this.globalCardSet, 2)
            
            this.genLevel()
            this.currentLevel.shuffleLevelCardSet()
            return
        }
        this.pastLevels.push(this.currentLevel)
        this.genLevel()
        this.currentLevel.idLevel = ((this.pastLevels[this.pastLevels.length - 1]?.idLevel) ?? 0) + 1
        this.startInterLevelTimer()
        if (this.type == "test" && this.endGame()) {
            this.betweenLevelsTimer = 1_200_000
            setTimeout(this.stopInterLevelTimer(), 1_200_000)
            return
        }
        this.betweenLevelsTimer = 20_000
        setTimeout(this.stopInterLevelTimer(), 20_000)
    }

    endGame() {
        return this.currentLevel.idLevel == this.getNbLevels()
    }

    play() {
        this.currentLevel.guess()
        if (this.currentLevel.isFinished) {
            if (!this.endGame()) {
                this.nextLevel()
                return
            }
            this.isFinished = true
            GameDataManagement.storeStats()
        }

    }

    calcTotalTime() {
        let totalTime = 0
        this.pastLevels.forEach(level => {
            totalTime += level.timer
        });
        return totalTime
    }

    calcGlobalSuccessRate() {
        let totalGuesses = 0
        let minScore = 0
        this.pastLevels.forEach(level => {
            totalGuesses += level.nbGuess
            minScore += level.getMinScore()
        });
        return 100 - ((totalGuesses - minScore) / totalGuesses * 100)
    }

}