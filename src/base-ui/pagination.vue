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
  /**
   * dataCount:数据总数
   * page:{currentPage:当前页，pageSize:每页个数}
   */
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

<style scoped lang="less"></style>
