<script>
export default {
    props: ["username"],
    emits: ['update:username']
}
</script>

<template>
    <div>
        <label for="username">Saisissez votre prénom et votre nom :</label>
        <input type="text" id="username" autocomplete="off" :value="username"
            @input="$emit('update:username', $event.target.value)">
    </div>
</template>

<style scoped>
label {
    margin-right: 1rem;
}

div>* {
    font-size: xx-large;
}
</style>
