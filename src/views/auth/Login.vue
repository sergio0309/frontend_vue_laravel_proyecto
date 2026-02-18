<template>
    <h1>Login</h1>
    <label for="">Ingrese correo</label>
    <input type="text" v-model="credenciales.email" border="1"><br>
    {{ errors.email }}
    <br><br>

    <label for="">Ingrese contraseña</label>
    <input type="password" v-model="credenciales.password" border="1"><br> 
    {{ errors.password }}

    <br><br>
    <button @click="funIngresar()">Ingresar</button>
    <br>
    {{ credenciales }}
    {{ respuesta }}
</template>

<script setup>
    import { ref } from 'vue';
    import authService from '../../services/auth.service';
import { useRouter } from 'vue-router';

    const credenciales = ref({email: "", password: ""});
    const respuesta = ref();
    const errors = ref({})
    const router = useRouter()

    async function funIngresar() {

        try {
            const res= await authService.login(credenciales.value);
    
            respuesta.value = res.data;

            localStorage.setItem('access_token', res.data.access_token)

            //redireccionar
            router.push({name: 'MiPerfil'})


        } catch (error) {
            if (error.response) {
                // El backend respondió con error (401, 403, 500, etc.)
                respuesta.value = error.response.data
                console.error('Error response1:', error.response?.data?.errors)
                errors.value = error.response?.data?.errors
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta
                respuesta.value = 'No se pudo conectar con el servidor'
                console.error('Error request:', error.request)
            } else {
                // Error al configurar la petición
                respuesta.value = error.message
                console.error('Error message:', error.message)
            }
            
        }
    }
</script>