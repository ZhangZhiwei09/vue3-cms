<template>
  <div id="nav-header">
    <breadcrumd :breadcrumbs="breadcrumbs"></breadcrumd>
    <userInfo></userInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import breadcrumd from '@/base-ui/breadcrumb.vue'
import userInfo from './userInfo.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menu'
export default defineComponent({
  name: 'nav-header',
  components: { breadcrumd, userInfo },
  setup() {
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginStore.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
#nav-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 20px;
}
</style>
