<template>
  <div>
    <Form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Form from '@/base-ui/form.vue'

export default defineComponent({
  components: { Form },
  emits: ['resetBtnClick', 'searchBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    //当用户点击重置
    const handleResetClick = () => {
      for (const item in formData.value) {
        formData.value[item] = ''
      }
      emit('resetBtnClick')
    }
    //当用户搜索
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleSearchClick }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
