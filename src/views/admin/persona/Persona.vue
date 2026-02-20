<template>
    <div class="card">

        <Button icon="pi pi-plus" label="Nueva persona" class="m-2" @click="openDialog()"></Button>


        <DataTable :value="personas" tableStyle="min-width: 50rem">
            <Column field="id" header="Id"></Column>
            <Column field="nombres" header="NOMBRES"></Column>
            <Column field="apellidos" header="APELLIDOS"></Column>
            <Column header="USUARIO">
                <template #body="slotProps">
                    <div v-if="slotProps.data.user">
                        <strong>CORREO: {{ slotProps.data.user.email }}</strong><br>
                        <small >Creado en: {{ slotProps.data.user?.created_at }}</small>
                    </div>
                    <div v-else>
                        SIN CUENTA DE USUARIO
                        <Button icon="pi pi-plus" severity="info" rounded class="m-2" @click="openDialog()"></Button>
                    </div>
                </template>
            </Column>

            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visible" modal header="Datos Personales" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Asigna Datos Personales.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Nombres</label>
                <InputText id="username" class="flex-auto" autocomplete="off" v-model="persona.nombres"/>
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="apellidos" class="font-semibold w-24">Apellidos</label>
                <InputText id="apellidos" class="flex-auto" autocomplete="off" v-model="persona.apellidos"/>
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="ci" class="font-semibold w-24">Ci</label>
                <InputText id="ci" class="flex-auto" autocomplete="off" v-model="persona.ci"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Guardar" @click="funGuardarPersona()"></Button>
            </div>
        </Dialog>

    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import personaService from '../../../services/persona.service';

    const personas = ref([]);
    const visible = ref(false)
    const persona = ref({})

    onMounted(() => {
        getPersonas()
    })

    async function getPersonas() {
        const { data } = await personaService.getPersonas()
        personas.value = data
    }

    function openDialog(){
        visible.value = true
    }

    async function funGuardarPersona(){
        const { data } = await personaService.guardarPersona(persona.value)
        getPersonas()
        visible.value = false

    }

</script>