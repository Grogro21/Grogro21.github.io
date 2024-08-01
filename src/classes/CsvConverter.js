import GameDataManagement from "./GameDataManagement"
import { Parser } from '@json2csv/plainjs';
export default class CsvConverter{
    static convertToCSV() {
        const json = GameDataManagement.readUserData()
        this.convertlevelStatToCsv(json)
        delete json.cards
        delete json.levels
        const csv = new Parser().parse(json)
        console.log(csv)
        this.convertCardsStatsToCSV()

    }
    static convertlevelStatToCsv(json) {
        json.levels.forEach(level => {
            delete level.clics
            const csv = new Parser().parse(level)
            console.log(csv)
        });
    }
    static convertCardsStatsToCSV() {
        const json = GameDataManagement.readUserData().cards
        const csv = new Parser().parse(json)
        console.log(csv)
    }
}