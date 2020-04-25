import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: '首页',
          component: () => import('../components/pages/Welcome.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/users',
          name: '用户管理',
          component: () => import('../components/pages/Users.vue'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/roles',
          name: '角色列表',
          component: () => import('../components/pages/404.vue')
        }
      ]
    },
    {
      path: '*',
      component: () => import('../components/pages/404.vue')
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 重定义页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 用户直接访问登录页面，直接放行
  if (to.path === '/login') return next()
  // 判断是否登陆
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login') // 没有登录，强制跳转到登录页面，路由重定向
  next()
})

export default router
