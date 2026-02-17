<template>
    <h1>Perfil</h1>
    Nombre: {{ perfil.name }}
    <br>
    Correo: {{ perfil.email }}
    <br>

    <button @click="funSalir()">SALIR</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import authService from '../../../services/auth.service';
import { useRouter } from 'vue-router';
import Login from '../../auth/Login.vue';
    const perfil = ref({})
    const router = useRouter()
 
    onMounted(() => {
        getPerfil()
    })

    async function getPerfil(){
        const { data } = await authService.perfil()
        perfil.value = data
    }

    async function funSalir(){
        await authService.logout()
        localStorage.removeItem('access_token');
        router.push({name: 'Login'})
    }


</script>