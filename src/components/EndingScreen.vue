<script>
import Game from '@/classes/Game.js';
import GameDataManagement from '@/classes/GameDataManagement.js';
import CardStat from './CardStat.vue';
import CardItem from './CardItem.vue';

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
            cards: []
        }
    },
    components: {
        CardStat,CardItem
    },
    props: {
        game: Game,

    },
    computed: {
        genCardset() {
            if (this.cards.length > 0) {
                let cardDone = []
                this.cards.forEach(cardToCheck => {  
                    const idToCopy = cardDone.findIndex((card) => { return card.id == cardToCheck.id })

                    if (cardDone.length > 0 && idToCopy >= 0) {                       
                        cardDone[idToCopy].clics += cardToCheck.clics
                    }
                    else {
                        cardDone.push(cardToCheck)
                    }
                });
                return cardDone  
            }
            return null
            
        }
    },
    mounted() {
        const userStats = GameDataManagement.readUserData()
        this.userName = userStats.userName
        this.startTime = userStats.startTime
        this.totalTime = userStats.totalTime
        this.totalGuess = userStats.totalGuess
        this.globalSuccessRate = userStats.globalSuccessRate
        this.cards=userStats.cards
        this.levels = userStats.levels

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
            <p>Niveau {{ id + 1 }}</p>
            <p>Temps : {{ (+level.time).toFixed(2) }}s</p>
            <p>Meilleur score possible : {{ level.bestScore }}</p>
            <p>Taux de réussite : {{ (+level.successRate).toFixed(2) }}%</p>
            <div id="cardContainer">
                <div id="card" v-for="card in level.clics" :key="card.id">
                    {{ card }}
                </div>
            </div>
        </div>
    </div>
    <h2>Résultats par cartes</h2>
    <div id="cardContainer">
        <div id="card" v-for="card in genCardset" :key="card.id">
            <CardStat :card="card" :nbCards="game.currentLevel.nbCards" :theme="game.theme" />
        </div>
    </div>
</template>

<style scoped>
h1,h2 {
    text-align: center;
    margin-bottom: 1rem;
}

h2{
    width:100%;

    margin-top: 1rem;
}
#global {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border:solid 5px var(--border-color)
}
#levelContainer{
    margin-top:1rem;

    gap:1rem;
    display:grid;
    grid-template-columns: repeat(3,1fr);
}

#cardContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:4rem;
}

#level{
    padding-left: 2rem;
    background-color: var(--resultat-bg);
    color:var(--resultat-text)
}
</style>