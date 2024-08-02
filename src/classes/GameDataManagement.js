import UserStats from "@/classes/UserStats.js"

export default class GameDataManagement {
    static async readPicturesData(theme) {
        return await (await fetch('/json/' + theme + '.json')).json()
    }

    static storeSession(username, theme, variant) {
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("theme", theme)
        sessionStorage.setItem("variant", variant)
    }
    static loadSession() {
        const username = sessionStorage.getItem("username")
        const theme = sessionStorage.getItem("theme")
        const variant = sessionStorage.getItem("variant")
        return ([username, theme, variant])
    }

    static storeStats(game) {
        JSON.stringify(new UserStats(game))
        localStorage.setItem("stats", JSON.stringify(new UserStats(game)))
    }

    static readUserData() {
        return JSON.parse(localStorage.getItem("stats"))
    }
}