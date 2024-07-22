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
        this.pastLevels = []
        this.globalCardSet = []
    }

    getNbLevels() {
        return this.type = "test" ? 6 : 7
    }

    genCardSet(size, theme) {
        this.pictures = GameDataManagement.readPicturesData(theme)
        const json = this.pictures.slice(0, size)
        const cardSet = []
        for (const id of json) {
            cardSet.push(id)
        }
        const l = cardset.length
        for (let index = 0; index < l; index++) {
            cardset.push(index + 1)
        }
        this.globalCardSet = new CardSet()

    }

    genLevel() {
        if (this.type = "test") {
            this.currentLevel = new Level(genCardSet(12), 12)

        }
    }

    nextLevel() {
        this.pastLevels.push(this.currentLevel)

    }

}