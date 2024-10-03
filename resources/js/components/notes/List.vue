<template>
    <div class="container">
        <div v-for="note in notes" class="card border-light mb-2 px-2">
            <div class="card-body d-flex justify-content-between">
                <div class="d-flex flex-column">
                    <h5 class="card-title text-bold mr-8 mt-2 mb-4">{{ note.title }}</h5>
                    <p class="">{{ note.description }}</p>
                    <p class="" style="color: dimgray;">{{formatDate(note.created_at) }}</p>
                </div>
                <div class="d-flex align-items-start">
                    <v-chip-group column>
                    <v-chip v-for="label in note.labels" :key="label.id">
                        <span style="font-size: 12px;">{{ label.name }}</span>
                    </v-chip>
                </v-chip-group>
                </div>
                <div class="d-flex align-items-center">
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
const emit = defineEmits(['openUpdateDialog', 'handleDeleted', 'handleError'])

const handleUpdateNote = async (data) => {
    emit('openUpdateDialog', data)
}

const handleDeleteNote = (id) => {
    const response = store.dispatch('notes/deleteNote', id)
    if(response){
        emit('handleDeleted', {success: true, message: 'Eliminado exitosamente'})
    }else {
        emit('handleError', {success: false, message: 'Ha ocurrido un error'})
    }
}

function formatDate(createdAt) {
    const date = new Date(createdAt);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = String(date.getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año

    return `${hours}:${minutes}, ${day}/${month}/${year}`;
}

</script>

<style scoped lang="scss"></style>
