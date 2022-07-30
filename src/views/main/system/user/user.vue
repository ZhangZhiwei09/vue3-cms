<template>
  <div id="user">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleQueryClick"
    ></pageSearch>
    <pageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @addUserClick="handleAddUser"
      @editUserClick="handleEditUser"
    ></pageContent>
    <pageModal
      ref="pageModalRef"
      :modalDialogConfig="modalConfigRef"
      :editDefaultValue="editDefaultValue"
      pageName="users"
    ></pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalDialogConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  components: { pageSearch, pageContent, pageModal },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalDialogConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalDialogConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
    }
    const [pageModalRef, editDefaultValue, handleAddUser, handleEditUser] = usePageModal(
      newCallback,
      editCallback
    )
    // 2.动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalDialogConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalDialogConfig.formItems.find((item) => item.field === 'roleId')
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalDialogConfig
    })

    return {
      pageModalRef,
      editDefaultValue,
      searchFormConfig,
      contentTableConfig,
      modalDialogConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleAddUser,
      handleEditUser,
      newCallback,
      editCallback,
      modalConfigRef
    }
  }
})
</script>

<style scoped lang="less">
#user {
  background-color: #ffffff;
}
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.handle-btns {
  display: flex;
}
</style>
