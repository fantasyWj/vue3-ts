import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/context",
    children: [{
      path: '/context',
      name: 'Context',
      component: () => import(/* webpackChunkName:"Login" */ '../views/content.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:"Login" */ '../views/Login.vue'),
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/columnDetail',
    name: 'ColumnDetail',
    component: () => import(/* webpackChunkName:"Login" */ '../components/ColumnDetail.vue')
  },
  // 新建文章
  {
    path: '/createPosts',
    name: "CreatePosts",
    component: () => import(/* webpackChunkName:"Login" */ '../components/CreatePosts.vue'),
    meta: {
      requiredLogin: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.users.isLogin) {
    next({ path: "/Login" })
  } else if (to.meta.redirectAlreadyLogin && store.state.users.isLogin) {
    next('/')
  } else {
    next()
  }

})
export default router
