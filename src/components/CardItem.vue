<script>
import Card from "@/classes/Card.js";
import CardState from "@/classes/CardState.js"
import CardDataManagement from "@/classes/CardDataManagement.js"
export default {
    computed: {
        // image() {
        //     return this.card.state == CardState.HIDDEN ? CardDataManagement.loadQmark() : CardDataManagement.loadCard(this.card.name, this.theme)
        // },
        cardSize() {
            if (this.nbCards < 12) {
                return 24
            }
            if (this.nbCards < 18) {
                return 19
            }
            if (this.nbCards < 22) {
                return 15
            }
            return 13


        },
        isFound() {
            return this.card.state == CardState.FOUND
        },
        isHidden() {
            return this.card.state == CardState.HIDDEN
        },
        VisibleImage() {
            return CardDataManagement.loadCard(this.card.name, this.theme)
        },
        HiddenImage() {
            return CardDataManagement.loadQmark()
        },
        realRotation() {
            if (this.card.state == CardState.HIDDEN) {
                return 0
            }
            return 180
        }
    },
    methods: {

        selectCard() {
            
            this.$emit('selectCard', this.card.position)
        }
    },
    props: {
        theme: String,
        card: Card,
        nbCards: Number
    }
}
</script>

<template>
    <div class="flip-box" :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }">
        <div class="flip-box-inner" :style="{ 'transform': 'rotateY(' + realRotation + 'deg)' }">
            <div class="flip-box-front">
                <img :src="HiddenImage" alt="" :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }"
                    @click="selectCard">
            </div>
            <div class="flip-box-back">
                <img :src="VisibleImage" :class="{ found: isFound }"  alt=""
                    :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }">
            </div>
        </div>
    </div>
    <!-- <img :class="{ found: isFound }" :src="image" alt="" @click="selectCard"
        :style="{ 'width': cardSize + 'rem', 'height': cardSize + 'rem' }"> -->
</template>

<style scoped>
img {
    border: 4px solid black;
    transition: transform .5s;
}

.found {
    border: 4px solid var(--clr-border-found);
}

.flip-box {
    background-color: transparent;
    perspective: 1000px;
}

.flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.flip-box .flip-box-inner {
    transform: rotateY(0deg);
}

.flip-box-front,
.flip-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
}

.flip-box-back {
    transform: rotateY(180deg);
}
</style>