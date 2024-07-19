import CardState from "./CardState.js";

export default class Card{
    constructor(forme) {
        this.forme = forme
        this.state=CardState.HIDDEN
    }

    turnCard() {
        this.etat= this.etat==CardState.HIDDEN? CardState.REVEALED : CardState.HIDDEN
    }
}