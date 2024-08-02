<script>
export default {
    props: ["theme"],
    emits: ['update:theme']
}
</script>

<template>
    <div>
        <label for="theme">Sélectionner le thème des images qui vont apparaitre :</label>
        <select name="theme" id="theme" @input="$emit('update:theme', $event.target.value)">
            <option value="abstract">Abstrait</option>
            <option value="cards">Personnages</option>
            <option value="colors">Couleurs</option>
            <option value="pokemon">Pokemon</option>
        </select>
    </div>
</template>

<style scoped>
label {
    margin-right: 1rem;
}

div {
    margin-bottom: 15rem;

}

div>* {
    font-size: xx-large;
}
</style>