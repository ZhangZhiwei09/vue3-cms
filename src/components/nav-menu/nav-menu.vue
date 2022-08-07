<template>
  <div id="nav-menu">
    <el-menu
      :default-active="defaultValue"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="item.type === 1">
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menu'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const userMenus = computed(() => store.state.loginStore.userMenus)
    console.log(userMenus.value, currentPath)

    const menu = pathMapToMenu(userMenus.value, currentPath)

    const defaultValue = ref(menu.id + '')
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
#nav-menu {
  height: 100%;
  background-color: #545c64;
  overflow: hidden;
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
