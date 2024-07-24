<script>
export default {
    props: ["username"],
    emits: ['update:username']
}
</script>

<template>
    <label for="username">Saisissez votre prénom et votre nom</label>
    <input type="text" id="username" autocomplete="off" :value="username"
        @input="$emit('update:username', $event.target.value)">
</template>