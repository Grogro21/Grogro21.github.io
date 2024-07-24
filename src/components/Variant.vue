<script>
export default {
    props: ["variant"],
    emits: ['update:variant']
}
</script>

<template>
    <label for="variant">Sélectionner le thème à utiliser :</label>
    <select name="variant" id="variant" @input="$emit('update:variant', $event.target.value)">
        <option value="test">Test de mémoire</option>
        <option value="relearn">Réapprentissage</option>
    </select>
</template>