<template>
  <div class="main">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="210px"><navMenu /></el-aside>
      <el-container>
        <el-header><navHeader /> </el-header>
        <!-- 主体 -->
        <el-main> <router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navMenu from '@/components/nav-menu/nav-menu.vue'
import navHeader from '@/components/nav-header/nav-header.vue'

export default defineComponent({
  components: { navMenu, navHeader }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-header {
  display: flex;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
