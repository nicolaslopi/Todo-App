<template>
    <div class="container">
        <div v-for="note in notes" class="card border-light mb-2 px-2">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title text-bold">{{ note.title }}</h5>
                    <p class="card-text">{{ note.description }}</p>
                </div>
                <div>
                    <v-icon name="fa-regular-edit" color="orange" scale="1.5" @click="handleUpdateNote(note)"></v-icon>
                    <v-icon name="md-delete" color="red" scale="1.5" @click="handleDeleteNote(note.id)"></v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

//Getters
const notes = computed(() => store.getters["notes/getNotes"]);

//Definición de emits
const emits = defineEmits(['openUpdateDialog', 'openSnackbar'])

const handleUpdateNote = async (data) => {
    emits('openUpdateDialog', data)
}

const handleDeleteNote = (id) => {
    const response = store.dispatch('notes/deleteNote', id)
}

</script>

<style scoped lang="scss"></style>
