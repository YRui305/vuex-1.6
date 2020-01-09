import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  // @是src目录的别名，这是VueCLI项目中特殊提供的
  component: () => import('@/views/login')
}]

const router = new VueRouter({
  routes
})

export default router
