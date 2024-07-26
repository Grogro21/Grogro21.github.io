export default class GameDataManagement {
    static async readPicturesData(theme) {
        return await (await fetch('/src/assets/json/' + theme + '.json')).json()
    }

    static storeSession(username, theme, variant) {
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("theme", theme)
        sessionStorage.setItem("variant", variant)
    }
    static async loadSession() {
        const username = sessionStorage.getItem("username")
        const theme = sessionStorage.getItem("theme")
        const variant = sessionStorage.getItem("variant")
        return ([username,theme,variant])
    }

    

    static storeStats() {

    }
    static readUserData() {

    }
}