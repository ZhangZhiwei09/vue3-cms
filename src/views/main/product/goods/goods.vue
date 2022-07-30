<template>
  <div>
    <pageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '¥' + scope.row.newPrice }}</template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: { pageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="scss"></style>
