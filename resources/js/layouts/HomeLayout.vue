<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container">
                <a class="navbar-brand text-white" href="#">Todo app</a>
                <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="collapsed = !collapsed">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <button class="btn btn-link nav-link text-white" style="text-decoration:none" @click="handleLogout">Iniciar sesión
                                <v-icon name="md-logout-twotone"></v-icon>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="py-4">
            <slot name="main"></slot>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useStore } from "vuex";
import router from "../router";
import { ref } from 'vue'

const module = 'auth'
const store = useStore()
const collapsed = ref(false)

const handleLogout = async () => {
    const response = await store.dispatch(`${module}/logout`)

    if (response) {
        router.push({ name: 'home' })
    }
}

</script>

<style scoped lang="scss">
nav {
    background-color: $primary-color;
}
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
