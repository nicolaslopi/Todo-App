<template>
    <div class="d-flex flex-column justify-space-around" style="margin-top: 100px;">
        <div v-if="hasError" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error }}
            <button class="btn btn-outline btn-close" @click="hasError = null"></button>
        </div>
        <div class="">
            <div class="card shadow py-4" style="height: 500px;">
                <div class="card-body">
                    <h1 class="text-center mt-3 mb-4">Inicio de sesión</h1>
                    <Form @formSubmitted="loginUser" :error="error"></Form>
                    <div class="text-center mt-3">
                        <RouterLink class="fs-5 color-text-link" style="width: 48%;" :to="{ name: 'register' }">
                            Registrate
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { RouterLink } from "vue-router";
import Form from "../../components/auth/LoginForm.vue";
import { useStore, mapActions, mapGetters } from 'vuex';
import { ref, computed } from "vue";
import router from "../../router";

const module = 'auth'
const store = useStore()
const error = computed(() => store.getters[`${module}/getError`])
const token = computed(() => store.getters[`${module}/getToken`])
const hasError = ref(false)

const loginUser = async (credentials) => {

    const response = await store.dispatch(`${module}/login`, credentials)

    if (response === false) {
        hasError.value = true
    } else {
        hasError.value = false
        router.push({ name: 'dashboard' })
    }
}
</script>

<style scoped lang="scss">
.color-text-link {
    color: $primary-color;

    &:hover {
        color: scale-color($color: #000, $lightness: 50%)
    }
}

button {
    background-color: $primary-color;
    color: white;
}
</style>

