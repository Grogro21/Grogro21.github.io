import CardState from "./CardState.js";

export default class CardSet {
    constructor(cardset) {
        this.cardSet = cardset
        this.currentSelection = []
    }

    selectCard(selectedPosition) {
        if (this.currentSelection.length < 2) {
            for (const card of this.cardSet) {
                if (card.position == selectedPosition) {
                    if (card.state == CardState.REVEALED || !this.currentSelection.find((card) => card.position = selectedPosition)) {
                        return false
                    }
                    card.turnCard()
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

    guessPair() {
        this.currentSelection[0].clicCounter++
        this.currentSelection[1].clicCounter++

        if (this.areEquals()) { //c'est une paire
            this.currentSelection=[]
            return true
        }
        //raté! on retourne les cartes
        this.currentSelection[0].turnCard()
        this.currentSelection[1].turnCard()
        this.currentSelection = []
        return false

    }

    shuffleSet() {
        this.cardSet.sort(() => Math.random() - 0.5);
    }

    resetSet() {
        for (const card of this.cardSet) {
            card.state = CardState.HIDDEN
        }
    }
}