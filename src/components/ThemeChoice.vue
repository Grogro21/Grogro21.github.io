<script>
export default {
    props: ["theme"],
    emits: ['update:theme']
}
</script>

<template>
    <label for="theme">Sélectionner le thème à utiliser :</label>
    <select name="theme" id="theme" @input="$emit('update:theme', $event.target.value)">
        <option value="abstract">Abstrait</option>
        <option value="cards">Personnages</option>
        <option value="colors">Couleurs</option>
    </select>
</template>
