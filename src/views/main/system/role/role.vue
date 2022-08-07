<template>
  <div id="role">
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @addUserClick="handleAddUser"
      @editUserClick="handleEditUser"
    ></pageContent>
    <pageModal
      ref="pageModalRef"
      :modalDialogConfig="modalDialogConfig"
      :editDefaultValue="editDefaultValue"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="treeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { contentTableConfig } from './config/content.config'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { usePageModal } from '@/hooks/use-page-modal'
import { modalDialogConfig } from './config/modal.config'
import { menuMapLeafKeys } from '@/utils/map-menu'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: { pageContent, pageModal },
  setup() {
    const store = useStore()
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)

      nextTick(() => {
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, editDefaultValue, handleAddUser, handleEditUser] = usePageModal(
      undefined,
      editCallback
    )

    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      modalDialogConfig,
      pageModalRef,
      editDefaultValue,
      handleAddUser,
      handleEditUser,
      menus,
      handleCheckChange,
      otherInfo,
      treeRef
    }
  }
})
</script>

<style scoped lang="scss"></style>
