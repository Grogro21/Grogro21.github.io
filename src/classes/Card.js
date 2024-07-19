import CardState from "./CardState.js";

export default class Card {
    constructor(form) {
        this.form = form
        this.state = CardState.HIDDEN
    }

    turnCard() {
        this.state = this.state == CardState.HIDDEN ? CardState.REVEALED : CardState.HIDDEN
    }
}