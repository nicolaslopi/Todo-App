import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../Pages/HomePage.vue'
import Login from '../Pages/auth/Login.vue'
import Register from '../Pages/auth/Register.vue'
import Dashboard from '../Pages/Dashboard.vue'
import { useStore } from 'vuex';
import { computed } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: HomePage
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: HomePage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
    const store = useStore()
    const isAuth = computed(() => store.getters['auth/getToken']);

    if((to.meta.requireAuth) && (!isAuth.value)){
      next({name:'home'})
    } else {
      next()
    }
})

export default router
