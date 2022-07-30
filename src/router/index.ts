import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import user from '@/views/main/system/user/user.vue'
import role from '@/views/main/system/role/role.vue'
import menu from '@/views/main/system/menu/menu.vue'
import goods from '@/views/main/product/goods/goods.vue'
import dashboard from '@/views/main/analysis/dashboard/dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    redirect: '/main/system/user',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/main/system/user',
        component: user
      },
      {
        path: '/main/system/role',
        component: role
      },
      {
        path: '/main/system/menu',
        component: menu
      },
      {
        path: '/main/product/goods',
        component: goods
      },
      {
        path: '/main/analysis/dashboard',
        component: dashboard
      }
    ]
    // children: [] -> 根据userMenus来决定 -> children
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
