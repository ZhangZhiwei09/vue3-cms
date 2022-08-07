<template>
  <div id="page-modal">
    <el-dialog v-model="dialogFormVisible" title="添加用户" destroy-on-close>
      <Form v-bind="modalDialogConfig" v-model="formData"></Form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Form from '@/base-ui/form.vue'
export default defineComponent({
  components: { Form },
  props: {
    modalDialogConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    },
    editDefaultValue: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.editDefaultValue,
      (newValue) => {
        if (props.modalDialogConfig) {
          for (const item of props.modalDialogConfig.formItems) {
            formData.value[`${item.field}`] = newValue[`${item.field}`]
          }
        }
      }
    )
    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogFormVisible.value = false
      if (Object.keys(props.editDefaultValue).length) {
        console.log()

        // 编辑
        store.dispatch('systemStore/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.editDefaultValue.id
        })
      } else {
        // 新建
        store.dispatch('systemStore/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      formData,
      dialogFormVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
