import Card from "./card.js";
import CardState from "./CardState.js";

export default class CardSet{
    constructor(cardset) {
        this.cardSet=cardset
    }

    turnCards(card1, card2) {
        if (card1.state == CardState.HIDDEN && card2.state == CardState.HIDDEN) {
            card1.turnCard()
            card2.turnCard()
            return true
        }
        return false
    }

    areEquals(card1, card2) {
        return card1.form==card2.form
    }

    guessPair(card1, card2) {
        if (this.turnCards(card1, card2) && this.areEquals(card1, card2)) {
            return true
        }
        else {
            card1.turnCard()
            card2.turnCard()
            return false
        }
    }

}