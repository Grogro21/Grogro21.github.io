export default class CardDataManagement{
    static loadCard(card, theme) {
        return '/pictures/' + theme + '/' + card.shape
    }

    static loadQmark() {
        return '/pictures/Qmark.png'
    }
}