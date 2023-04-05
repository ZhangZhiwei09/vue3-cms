# 项目收获总结~

## 模块化 vuex

```
import { Module } from 'vuex'

const loginModule:Module<S，R>{
//S当前store的类型，R根store的类型
    namespaced: true,
}
```

## 解决 vuex 刷新丢失数据的方法

在 main 入口函数调用 store 的方法，该方法将检查 localstorage 的数据执行

```js
import { setupStore } from './store'
setupStore()
```

```js
export function setupStore() {
  store.dispatch('loginStore/loadLocalLogin')
}
```

```js
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
```

## 双向绑定:避免单向数据流，不应该更改父组件传递过来的数据，而是子组件传递信息给父组件，让父组件修改数据

```js
const formData = ref({ ...props.modelValue }) //将传递过来的数据浅拷贝一份，而不是直接修改传递过来的数据

watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  {
    deep: true
  }
)
```

## 模块化的 store 如何调用根 store 下的方法？

```js
dispatch('getInitialDataAction', null, { root: true })
```

## 封装分页组件:数据总数（dataCount)传给子组件，通过 v-model:page='pageInfo'双向绑定子组件属性

```js
//父组件
<template>
 <pagination :dataCount="dataCount" v-model:page="pageInfo"></pagination>
</template>

const dataCount = 10//假如数据10
const pageInfo = ref({ currentPage: 1, pageSize: 6 })//当前页，每个展示的数据
watch(pageInfo, () => getPageData())//watch监听属性
//分页请求数据以及调用
const getPageData = (queryInfo: any = {}) => {
      store.dispatch('systemStore/getPageListAction', {
        pageUrl: '/users/list',
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
getPageData()
```

```js
<template>
  <el-pagination
    :page-sizes="[3, 6, 9]"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    layout="sizes, prev, pager, next, jumper"
    :total="dataCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dataCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emit: ['update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>


## 动态添加路由

通过 require.context()遍历包含所有路由映射关系的文件夹，设置为 true 为递归遍历，routeFiles.keys()就返回一个被处理的请求的数组，再遍历将所有的映射关系存在到总路由数组（allRoutes），接下来通过递归的方式将接口传入的路由地址与总路由数组一一比较，包含在内在添加入需要展示的路由数组（routes)，在通过 addRoute 添加

```js
import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [] //需要展示的路由数组
  const allRoutes: RouteRecordRaw[] = [] //全部数组关系
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
```

```js
import router from '@/router'

const routes = mapMenusToRoutes(userMenus)

routes.forEach((route) => {
  router.addRoute('main', route)
})
```
