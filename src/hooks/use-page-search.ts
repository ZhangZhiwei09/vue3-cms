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
    Object.keys(queryInfo).forEach((e) => {
      if ((queryInfo[e] ?? '') !== '') {
        pageContentRef.value?.getPageData(queryInfo)
      }
    })
    console.log(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
