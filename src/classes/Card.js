import CardState from "./CardState.js";

export default class Card {
    constructor(shape, position,name) {
        this.shape = shape
        this.state = CardState.HIDDEN
        this.clicCounter = 0
        this.position = position
        this.name=name
    }

    turnCard() {
        this.state = this.state == CardState.HIDDEN  ? CardState.REVEALED : CardState.HIDDEN
    }
}