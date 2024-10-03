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
            <div class="text-center d-flex justify-content-around">
                <button class="btn mt-4 fs-5 bg-grey" style="width: 40%;" @click.prevent="handleCloseDialog">Cancelar</button>
                <button type="submit" class="btn mt-4 text-white fs-5 btn-save" style="width: 40%;">Guardar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';


//Definición de props
const props = defineProps({
    noteInfo: Object,
    formAction: String
})

// Estado para las etiquetas seleccionadas
const selectedLabels = ref([])
const errorLabel = ref('')
const action = ref('')

const store = useStore()

//Definición de emits
const emit = defineEmits(['formSubmitted', 'closeDialog', 'handleErrorSubmit'])


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

const handleCreateNote = async (data) => {
    const response = await store.dispatch('notes/createNote', data)
    if(response){
        emit('formSubmitted', {success: true, message: 'Creación exitosa'})
    } else{
        emit('handleErrorSubmit', {success: false, message: 'Ha ocurrido un error'})
    }
}

const handleUpdateNote = async (data) => {
    const response = await store.dispatch('notes/updateNote', data)
    if(response){
        emit('formSubmitted', {success: true, message: 'Actualización exitosa'})
    }else{
        emit('handleErrorSubmit', {success: false, message: 'Ha ocurrido un error'})
    }
}

const onSubmit = handleSubmit(values => {
    if(selectedLabels.value.length === 0){
        errorLabel.value = 'Debe seleccionar al menos 1'
    } else {
        errorLabel.value = ''
        const newValues = {...values, labels: selectedLabels.value}
        if(props.formAction === 'create'){
            handleCreateNote(newValues)
        }else {
            handleUpdateNote({...newValues, id: props.noteInfo.id, user_id: props.noteInfo.user_id, labels: selectedLabels.value.map(item => item.id)});
        }
    }
})

const handleCloseDialog = () => {

    emit('closeDialog')
}

onMounted(()=>{

    if(props.formAction === 'update'){
        const info = props.noteInfo
        title.value = info.title
        description.value = info.description
        selectedLabels.value = info.labels
    }
})

</script>

<style scoped lang="scss">
.btn-save{
    background-color: $primary-color;

    &:hover {
        background-color: scale-color($color: $primary-color, $lightness: 10%)
    }
}
</style>
