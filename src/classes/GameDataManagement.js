export default class GameDataManagement{
    static async readPicturesData(theme) {
        return await (await fetch('/src/assets/json/'+theme+'.json')).json()
    }

    storeSession() {
        
    }
}