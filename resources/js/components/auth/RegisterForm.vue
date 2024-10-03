<template>
    <div class="container pt-2" style="width: 500px;">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="name" v-model="name" v-bind="nameAttrs"/>
                <span class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="text" class="form-control" id="email" v-model="email" v-bind="emailAttrs"/>
                <span class="text-danger">{{ errors.email }}</span>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password" v-bind="passwordAttrs"/>
                <span class="text-danger">{{ errors.password }}</span>
            </div>
            <div class="text-center">
                <button type="submit" class="btn mt-4 text-white fs-5" style="width: 50%;">Registrar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import axios from 'axios'
import { useForm } from "vee-validate";
import * as yup from 'yup';

// Definición del esquema de validación con Yup
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

// Inicializació del formulario con useForm
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema
});

//Definición de campos usando defineField
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

//// Definicion de emits
const emit = defineEmits(['formSubmitted'])

//Función para manejar el envío del formulario
const onSubmit = handleSubmit(values => {
    emit('formSubmitted', values)
})

</script>

<style scoped lang="scss">
button{
    background-color: $primary-color;
    &:hover{
        background-color: scale-color($color: $primary-color, $lightness: 10%)
    }
}
</style>
