<script>
export default {
    props: ["variant"],
    emits: ['update:variant']
}
</script>

<template>
    <div>
        <label for="variant">Sélectionner le type de jeu :</label>
        <select name="variant" id="variant" @input="$emit('update:variant', $event.target.value)">
            <option value="test">Test de mémoire</option>
            <option value="relearn">Réapprentissage</option>
        </select>
    </div>
</template>

<style scoped>
label {
    margin-right: 1rem;
}

div {
    margin-bottom: 10rem;
}

div>* {
    font-size: xx-large;
}
</style>