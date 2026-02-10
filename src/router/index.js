import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/web/Inicio.vue'
import Nosotros from '../views/web/Nosotros.vue'
import Servicios from '../views/web/Servicios.vue'
import Blog from '../views/web/Blog.vue'
import Login from '../views/auth/Login.vue'
import Perfil from '../views/admin/perfil/Perfil.vue'
import Usuario from '../views/admin/usuario/Usuario.vue'

const routes = [
  { path: '/', component: Inicio },
  { path: '/nosotros', component: Nosotros },
  { path: '/servicios', component: Servicios },
  { path: '/blog', component: Blog },
  { path: '/auth/login', component: Login, name: 'Login', meta: {redirectIfAuth: true} },
  { path: '/admin/perfil', component: Perfil, name: "MiPerfil" , meta: {requireAuth: true}},
  { path: '/admin/usuario', component: Usuario, name: "MiUsuario" , meta: {requireAuth: true}},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guars
router.beforeEach((to, from, next) =>{
  const token = localStorage.getItem("access_token");

  if(to.meta.requireAuth){
    if(!token){
      return next({name: 'Login'})

    }
    return next();
  }
  if(to.meta.redirectIfAuth && token ){
    return next({name: 'MiPerfil'})
  }

  return next()
})

export default router;