<template>
    <div class="container">
        <h1 class="text-center mb-4">Notas</h1>
        <div class="d-flex justify-content-between">
            <button class="btn mb-3" @click="handleFetchLabels">Añadir nota</button>
            <button class="btn mb-3">Filtrar</button>
        </div>
        <div class="card bg-card">
            <div class="card-body" style="height: auto">
                <List @openUpdateDialog="openUpdateDialog"></List>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn mt-3" @click="handlePagination('prev')">Anterior</button>
            <button class="btn mt-3" @click="handlePagination('next')">Siguente</button>
        </div>
    </div>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="600" prepend-icon="mdi-update">
            <v-card-text>
                <h2 class="text-center">Creación de nota</h2>
                <Form @formSubmitted="closeDialog" :noteInfo="noteToEdit" :formAction="formAction"></Form>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import List from "../../components/notes/List.vue";
import Form from "../../components/notes/Form.vue";

//store vuex
const store = useStore();

//Getters
const pagination = computed(()=>store.getters['notes/pagination'])

const dialog = ref(false)
const page = ref(0)
const formAction = ref('')
const noteToEdit = ref(null)

const handleFetchNotes = async () => {
    const response = await store.dispatch("notes/fetchNotes");
};

const handleFetchLabels = async () => {
    const response = await store.dispatch("notes/fetchLabels");
    if(response){
        formAction.value = 'create'
        openDialog()
    }
}

const handlePagination = async (data) => {

    const currentPage = pagination.currentPage
    console.log(currentPage);
    if(data === 'prev'){
        if(pagination.prevPage !== null) {page.value = parseInt(currentPage-1)}
        else return
    }
    if(data === 'next'){
        if(pagination.nextPage !== null) {page.value = parseInt(currentPage+1)}
        else return
    }

    console.log('page', page.value);
    const response = await store.dispatch("notes/paginationNotes", page.value)
}

const openDialog = () => {
    dialog.value = true
}

const openUpdateDialog = async (data) => {
    noteToEdit.value = data
    await handleFetchLabels()
    formAction.value = 'update'
}

const closeDialog = () => {
    dialog.value = false
}

onMounted(async () => {
    await handleFetchNotes();
    console.log(pagination.value);
});

</script>

<style scoped lang="scss">
button {
    background-color: $primary-color;
    color: white;

    &:hover {
        color: white;
        background-color: scale-color($color: $primary-color, $lightness: 10%)
    }
}

.bg-card {
    background-color: scale-color($color: $primary-color, $lightness: 90%);
    border-color: scale-color($color: $primary-color, $lightness: 90%);
}
</style>
