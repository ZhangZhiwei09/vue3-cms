<template>
  <div>
    <pageContent :contentTableConfig="contentTableConfig" pageName="menu"></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'menu',
  components: { pageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
