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
            json = this.pictures.slice(0, 2)
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

    genLevel(id) {
        if (this.type == "test") {
            this.currentLevel = new Level(this.globalCardSet, 2, id)

        }
        else {
            const localCardSet = new CardSet(this.globalCardSet.cardSet.map(x => new Card(x)))
            switch (id) {
                case 1:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 4)
                    this.currentLevel = new Level(localCardSet, 2, id)
                    break;
                case 2:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 8)
                    this.currentLevel = new Level(localCardSet, 4, id)
                    break;
                case 3:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 16)
                    this.currentLevel = new Level(localCardSet, 8, id)
                    break;
                case 4:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 24)
                    this.currentLevel = new Level(localCardSet, 12, id)
                    break;
                case 5:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 32)
                    this.currentLevel = new Level(localCardSet, 16, id)
                    break;
                case 6:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 40)
                    this.currentLevel = new Level(localCardSet, 20, id)
                    break;
                case 7:
                    localCardSet.cardSet = this.globalCardSet.cardSet.slice(0, 56)
                    this.currentLevel = new Level(localCardSet, 28, id)
                    break;
                default:
                    break;
            }
            this.currentLevel.shuffleLevelCardSet()
        }
    }

    startInterLevelTimer() {
        this.betweenTimerRunning = setInterval(() => this.betweenLevelsTimer -= 1000, 1000)
    }

    stopInterLevelTimer() {
        clearInterval(this.betweenTimerRunning)
        this.betweenTimerRunning = false
    }

    nextLevel() {
        this.currentLevel?.stopTimer()
        if (this.currentLevel != null) {
            this.pastLevels.push(this.currentLevel)
        }
        if (this.pastLevels.length == 0) {

            this.genLevel(1)
            this.currentLevel.shuffleLevelCardSet()
            return
        }
        this.betweenTimerRunning = true
        this.startInterLevelTimer()
        if (this.type == "test" && this.currentLevel.idLevel + 1 == this.getNbLevels()) {
            this.betweenLevelsTimer = 2000//1_200_000
        }
        else {
            this.betweenLevelsTimer = 2_000//20_000
        }
        setTimeout(() => this.stopInterLevelTimer(), this.betweenLevelsTimer)
        this.genLevel(((this.pastLevels[this.pastLevels.length - 1].idLevel)) + 1)
        
    }

    endGame() {
        
        
        return this.currentLevel.idLevel == this.getNbLevels()
    }

    async play(position) {
        await this.currentLevel.guess(position)
        this.currentLevel.endLevel()
        if (this.currentLevel.isFinished) {
            if (!this.endGame()) {
                this.nextLevel()
                return
            }
            //fin de la game
            this.pastLevels.push(this.currentLevel)
            this.isFinished = true
            GameDataManagement.storeStats(this)
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
        return 100 - ((totalGuesses / 2 - minScore) / (totalGuesses / 2) * 100)
    }

}