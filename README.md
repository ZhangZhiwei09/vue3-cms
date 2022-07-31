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

## 双向绑定:为避免单向数据流，不应该更改父组件传递过来的数据，而是子组件传递信息给父组件，让父组件修改数据

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
 
```

## props 接受列表数据循环时，循环的 item 显示对象的类型为 unknown

解决方法：因为 Array 中可以放任何数据类型，所以要告知数据中各子项的数据类型

```js
import { defineComponent, PropType } from 'vue'
interface IPropList {
  label: string
  minWidth: string | number
  prop: string
  slotName?: string
}
propList: { type: Array as PropType<IPropList[]>, required: true }
```
