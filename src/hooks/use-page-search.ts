import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  //重置按钮
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  //查询按钮
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
