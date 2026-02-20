<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Admin',
        items: [
            {
                label: 'Administrador',
                icon: 'pi pi-fw pi-home',
                to: '/admin'
            },
            {
                label: 'Mi Perfil',
                icon: 'pi pi-fw pi-user',
                to: '/admin/perfil'
            }
        ]
    },
    {
        label: 'Gestion Seguridad',
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-id-card',
                to: '/admin/usuario'
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-check-square',
                to: '/admin/role'
            },
            {
                label: 'Datos Personales',
                icon: 'pi pi-fw pi-check-square',
                to: '/admin/persona'
            }
        ]
    },
    {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-prime',
        items: [
            {
                label: 'Categoria',
                icon: 'pi pi-fw pi-eye',
                to: '/admin/categoria'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-globe',
                target: '/admin/productos'
            }
        ]
    },
    {
        label: 'Gestion Pedidos',
        icon: 'pi pi-fw pi-prime',
        items: [
            {
                label: 'Pedidos',
                icon: 'pi pi-fw pi-table',
                to: '/admin/pedidos'
            },
            {
                label: 'Nuevo Pedido',
                icon: 'pi pi-fw pi-box',
                target: '/admin/nuevo Pedido'
            },
            {
                label: 'Clientes',
                icon: 'pi pi-fw pi-users',
                target: '/admin/nuevo Pedido'
            }
        ]
    },
    
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     path: '/pages',
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             path: '/auth',
    //             items: [
    //                 {
    //                     label: 'Login',
    //                     icon: 'pi pi-fw pi-sign-in',
    //                     to: '/auth/login'
    //                 },
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         }
    //     ]
    // },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
