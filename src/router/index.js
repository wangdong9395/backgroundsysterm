import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import UserList from '../components/UserList'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, children: [{ path: '/users', component: UserList }] }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  const token = sessionStorage.getItem('token')
  if (!token) {
    next('/login')
    return false
  }
  next()
})
export default router
