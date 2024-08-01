<script>
import Game from '@/classes/Game.js';
import GameDataManagement from '@/classes/GameDataManagement.js';
import CardStat from './CardStat.vue';

export default {
    data() {
        return {
            userName: " ",
            startTime: null,
            totalTime: 0,
            totalGuess: 0,
            globalSuccessRate: 0,
            theme: "",
            levels: [],
            cards: [],
            id: 1,
            concatenatedPairs: []
        }
    },
    components: {
        CardStat
    },
    props: {
        game: Game,

    },
    methods: {
        concatenatePairs() {
            const realLevels = []
            console.log(this.levels.length)
            for (let id = 0; id < this.levels.length; id++) {
                
                const finalCardset = []
                this.levels[id].clics.forEach(cardToCheck => {
                    
                    if (finalCardset.length == 0) {
                        finalCardset.push({ "name": cardToCheck.name, "clics": cardToCheck.clics })
                    }
                    const idToCopy = finalCardset.findIndex((card) => { return card.name == cardToCheck.name })
                    if (idToCopy >= 0) {
                        finalCardset[idToCopy].clics = Math.max(finalCardset[idToCopy].clics, cardToCheck.clics)
                    }
                    if (idToCopy < 0) {
                        finalCardset.push(cardToCheck)
                    }
        
                });
                realLevels.push(finalCardset)
            }
            return realLevels
        }
    },
    computed: {
        
    },
    mounted() {
        const userStats = GameDataManagement.readUserData()
        this.userName = userStats.userName
        this.startTime = userStats.startTime
        this.totalTime = userStats.totalTime
        this.totalGuess = userStats.totalGuess
        this.globalSuccessRate = userStats.globalSuccessRate
        this.cards = userStats.cards
        this.levels = userStats.levels
        this.concatenatedPairs = this.concatenatePairs()
    }
}
</script>
<template>
    <h1>Bravo !!!</h1>
    <div id="global">
        <h2>Résultats Globaux</h2>
        <p>Joueur : {{ userName }}!</p>
        <p>Commencé le {{ new Date(startTime).toLocaleString() }}</p>
        <p>Fini en : {{ (+totalTime).toFixed(2) }}s</p>
        <p>Taux de réussite global : {{ (+globalSuccessRate).toFixed(2) }}%</p>
    </div>
    <h2>Résultats pour chaque niveau</h2>
    <div id="levelContainer">
        <div id="level" v-for="(level, id) in levels" :key="id">
            <h3>Niveau {{ id + 1 }}</h3>
            <div id="scores">
                <p>Temps : {{ (+level.time).toFixed(2) }}s</p>
                <p>Meilleur score possible : {{ level.bestScore }}</p>
                <p>Taux de réussite : {{ (+level.successRate).toFixed(2) }}%</p>
            </div>
            <div id="cardContainer">
                <div id="card" v-for="card in concatenatedPairs[id]" :key="card.name">
                    <CardStat :card="card" :nbCards="game.pastLevels[id].nbCards" :theme="game.theme" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1,
h2 {
    text-align: center;
    margin-bottom: 1rem;
}

h2 {
    width: 100%;

    margin-top: 1rem;
}

#global {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border: solid 5px var(--border-color)
}

#levelContainer {
    margin-top: 1rem;
}

#cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;
}

#level {
    padding-left: 2rem;
    background-color: var(--resultat-bg);
    color: var(--resultat-text)
}

h3{
    text-align: center;
    margin-top:1rem
}
#scores{
    display: flex;
    gap:2rem;
    justify-content: center;
    margin-bottom:1rem
}
</style>