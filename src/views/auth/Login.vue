<template>
    <h1>Login</h1>
    <label for="">Ingrese correo</label>
    <input type="text" v-model="credenciales.email"><br><br>
    <label for="">Ingrese contraseña</label>
    <input type="password" v-model="credenciales.password">
    <br><br>
    <button @click="funIngresar()">Ingresar</button>
    <br>
    {{ credenciales }}
    {{ respuesta }}
</template>

<script setup>
    import { ref } from 'vue';
    import authService from '../../services/auth.service';

    const credenciales = ref({email: "", password: ""});
    const respuesta = ref();

    async function funIngresar() {
        const { data } = await authService.login(credenciales.value);

        respuesta.value = data;
    }
</script>