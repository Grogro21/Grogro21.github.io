export default class CardDataManagement{

    static loadCard(name, theme) {

        return '/pictures/' + theme + '/' + name
    }

    static loadQmark() {
        return '/pictures/Qmark.png'
    }
}