import CardState from "./CardState.js";
import SelectState from "./SelectState.js";

export default class CardSet {
    constructor(cardset) {
        this.cardSet = cardset
        this.currentSelection = []
        this.selectionState = SelectState.PENDING
    }

    selectCard(selectedPosition) {

        if (this.currentSelection.length < 2) {
            for (const card of this.cardSet) {
                if (card.position == selectedPosition) {
                    if (card.state == CardState.REVEALED || this.currentSelection.find((card) => card.position == selectedPosition)) {
                        return false
                    }
                    card.turnCard()
                    card.clicCounter++
                    this.currentSelection.push(card)
                    return true
                }
            }
        }
        return false
    }

    areEquals() {
        return this.currentSelection[0].shape == this.currentSelection[1].shape
    }

    hideCards() {
        this.currentSelection[0].turnCard()
        this.currentSelection[1].turnCard()
    }

    async guessPair(position) {
        if (!this.selectCard(position)) {
            return
        }
        if (this.currentSelection.length != 2) {
            this.selectionState = CardState.PENDING
            return
        }
        this.currentSelection[0].clicCounter++
        this.currentSelection[1].clicCounter++

        if (this.areEquals()) { //c'est une paire
            this.currentSelection = []
            this.selectionState = CardState.MATCH
            return true
        }
        //raté! on retourne les cartes
        
        this.selectionState = CardState.DIFF

        await new Promise(res => setTimeout(res, 800));
        this.hideCards()
        this.currentSelection = []
        return false

    }

    shuffleSet() {

        this.cardSet.sort(() => Math.random() - 0.5);
        for (let index = 0; index < this.cardSet.length; index++) {
            this.cardSet[index].position = index + 1
        }
    }

    resetSet() {
        for (const card of this.cardSet) {
            card.state = CardState.HIDDEN
        }
    }
}