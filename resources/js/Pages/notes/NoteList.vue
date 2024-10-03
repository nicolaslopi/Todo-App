<template>
    <div class="container">
        <h1 class="text-center mb-4">Notas</h1>
        <div class="d-flex justify-content-between">
            <button class="btn mb-3" @click="openCreateDialog">Añadir nota</button>
        </div>
        <div class="card bg-card">
            <div class="card-body" style="height: auto">
                <List v-if="notes.length !== 0" @openUpdateDialog="openUpdateDialog" @handleDeleted="handleFormSubmitted" @handleError="openSnackbar"></List>
                <div v-else class="d-flex justify-content-center align-items-center" style="height: 200px;"><h1>No hay notas...   </h1></div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn mt-3" @click="handlePagination('prev')">Anterior</button>
            <button class="btn mt-3" @click="handlePagination('next')">Siguente</button>
        </div>
    </div>

    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card max-width="600" prepend-icon="mdi-update">
            <v-card-text>
                <h2 class="text-center">{{ formAction === 'create' ? 'Creación de nota' : 'Edición de nota' }}</h2>
                <Form @formSubmitted="handleFormSubmitted" @closeDialog="closeDialog" :noteInfo="noteToEdit"
                    :formAction="formAction"></Form>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.state" :timeout="timeout" :color="snackbar.success?'green':'red'" class="text-center">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import List from "../../components/notes/List.vue";
import Form from "../../components/notes/Form.vue";

//store vuex
const store = useStore();

//Getters
const pagination = computed(() => store.getters['notes/pagination'])
const notes = computed(() => store.getters['notes/getNotes'])

const page = ref(0)
const formAction = ref('')
const noteToEdit = ref(null)
const dialog = ref(false)
const snackbar = reactive({
    state: false,
    text: '',
    success: null
})
const timeout = 2000

const handleFetchNotes = async () => {
    const response = await store.dispatch("notes/fetchNotes");
};

const handleFetchLabels = async () => {
    const response = await store.dispatch("notes/fetchLabels");
}

const handlePagination = async (data) => {

    const currentPage = pagination.currentPage
    if (data === 'prev') {
        if (pagination.prevPage !== null) { page.value = parseInt(currentPage - 1) }
        else return
    }
    if (data === 'next') {
        if (pagination.nextPage !== null) { page.value = parseInt(currentPage + 1) }
        else return
    }

    const response = await store.dispatch("notes/paginationNotes", page.value)
}

const openCreateDialog = () => {

    formAction.value = 'create'
    dialog.value = true
    handleFetchLabels()

}

const openUpdateDialog = (data) => {
    noteToEdit.value = data
    formAction.value = 'update'
    handleFetchLabels()
    dialog.value = true
}

const closeDialog = () => {
    dialog.value = false
}

const openSnackbar = (data) => {
    snackbar.state = true
    snackbar.text = data.message
    snackbar.success = data.success
}

const handleFormSubmitted = (data) => {
    closeDialog()
    openSnackbar(data)
}

onMounted(async () => {
    await handleFetchNotes();
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
