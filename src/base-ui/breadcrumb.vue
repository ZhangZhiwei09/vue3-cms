<template>
  <div id="breadcrumd">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface IBreadcrumb {
  name: string
  path?: string
}

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  }
})
</script>

<style scoped lang="less">
.el-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
