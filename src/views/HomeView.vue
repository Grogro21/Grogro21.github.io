<script>
import Theme from "@/components/ThemeChoice.vue"
import UserName from "@/components/UserName.vue"
import Variant from "@/components/Variant.vue"
import ValidateButton from "@/components/ValidateButton.vue"
import GameDataManagement from "@/classes/GameDataManagement";
export default {
    data() {
        return {
            username: "",
            theme: "abstract",
            variant: "test",

        }
    },
    components: {
        Theme, UserName, Variant, ValidateButton
    },
    methods: {
        isValid() {
            // accepte les noms (avec potentiellemnt des tirets) de plus de 2 lettres chacun avec espace obligatoire entre nom et prénom
            const reg = /^(?:[a-zA-Z]{2,}(?:[-]{0,1}[a-zA-Z]{2,}){0,1}(?:[ ]){1}){1}(?:[a-zA-Z]{2,}(?:[-]{0,1}[a-zA-Z]{2,}){0,1}){1}$/
            return reg.test(this.username)
        },
        startGame() {
            if (this.isValid()) {
                GameDataManagement.storeSession(this.username,this.theme,this.variant)
                this.$router.push({ name: 'game' })
            }

        }
    }
}

</script>

<template>
    <h1>Memory</h1>
    <form action="">
        <Theme v-model:theme="theme"></Theme>
        <Variant v-model:variant="variant"></Variant>
        <UserName v-model:username="username"></UserName>
        <hr>
        <ValidateButton @submit="startGame"></ValidateButton>
    </form>

</template>
