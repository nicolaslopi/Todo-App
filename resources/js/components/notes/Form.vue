<template>
    <div class="container pt-2" style="width: 500px;">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="title" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="title" v-model="title" v-bind="titleAttrs" />
                <span class="text-danger">{{ errors.title }}</span>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <textarea class="form-control" id="description" v-model="description" v-bind="descriptionAttrs" />
                <span class="text-danger">{{ errors.description }}</span>
            </div>
            <div class="mb-3">
                <label for="labels" class="form-label">Etiquetas</label>
                <v-select
                    v-model="selectedLabels"
                    :items="labels"
                    item-title="name"
                    item-value="id"
                    chips
                    multiple
                ></v-select>
                <span v-if="errorLabel" class="text-danger">{{ errorLabel }}</span>
            </div>
            <div class="text-center">
                <button type="submit" class="btn mt-4 text-white fs-5" style="width: 50%;">Registrar</button>
            </div>
            {{ actionForm }}
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps, computed, onMounted } from 'vue'
import axios from 'axios'
import { useForm } from "vee-validate";
import * as yup from 'yup';
import { useStore } from 'vuex';


//Definición de props
const props = defineProps({
    noteInfo: Object,
    actionForm: String
})

// Estado para las etiquetas seleccionadas
const selectedLabels = ref([])
const errorLabel = ref('')
const infoToUpdate = ref(props.noteInfo || null)

const store = useStore()

//Definición de emits
const emits = defineEmits(['formSubmitted'])


//Getters
const labels = computed(()=>store.getters['notes/getLabels'])

// Definición del esquema de validación con Yup
const schema = yup.object({
    title: yup.string().required('El nombre es obligatorio'),
    description: yup.string().required('La descripcion es obligatoria'),
});

// Inicializació del formulario con useForm
const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema
});


//Definición de campos usando defineField
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')

//Funciones para manejar el envío del formulario

const handleNoteCreate = async (data) => {
    const response = await store.dispatch('notes/createNote', data)
    if(response){
        emits('formSubmitted')
    }
}

const onSubmit = handleSubmit(values => {
    if(selectedLabels.value.length === 0){
        errorLabel.value = 'Debe seleccionar al menos 1'
    } else {
        errorLabel.value = ''
        const newValues = {...values, labels: selectedLabels.value}
        handleNoteCreate(newValues)
    }
})

onMounted(()=>{
    if(props.noteInfo){
        const info = props.noteInfo
        title.value = info.title
        description.value = info.description
        selectedLabels.value = info.labels
    }
})

</script>

<style scoped lang="scss">
button {
    background-color: $primary-color;

    &:hover {
        background-color: scale-color($color: $primary-color, $lightness: 10%)
    }
}
</style>
