import { ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'
type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn): any {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const editDefaultValue = ref({})

  const handleAddUser = () => {
    editDefaultValue.value = {}

    if (pageModalRef.value) {
      pageModalRef.value.dialogFormVisible = true
    }
    newCb && newCb()
  }
  const handleEditUser = (item: any) => {
    console.log(item)

    editDefaultValue.value = { ...item }

    if (pageModalRef.value) {
      pageModalRef.value.dialogFormVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, editDefaultValue, handleAddUser, handleEditUser]
}
