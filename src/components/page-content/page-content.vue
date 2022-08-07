<template>
  <div id="page-content">
    <div class="addBtn">
      <el-button type="primary" @click="handleAddUser"> 新建用户 </el-button>
    </div>
    <Table :dataList="dataList" v-bind="contentTableConfig">
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启动' : '禁用'
        }}</el-button>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button size="small" type="primary" @click="handleEditClick(scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <template #createAt="scope">
        <span>{{ formatDate(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatDate(scope.row.updateAt) }}</span>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </Table>
  </div>
  <div class="footer" v-if="showFooter">
    <pagination :dataCount="dataCount" v-model:page="pageInfo"></pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import Table from '@/base-ui/table.vue'
import formatDate from '@/utils/formatDate'
import pagination from '@/base-ui/pagination.vue'
export default defineComponent({
  components: { Table, pagination },
  emits: ['addUserClick', 'editUserClick'],
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    let dialogVisible = ref(false)
    const dataList = computed(() => store.getters[`systemStore/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`systemStore/pageListCount`](props.pageName))

    //获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })
    //判断是否显示分页
    const showFooter = props.contentTableConfig?.showFooter ?? true

    const pageInfo = ref({ currentPage: 1, pageSize: 6 })
    watch(pageInfo, () => getPageData())
    //获取数据
    const getPageData = (queryInfo: any = {}) => {
      console.log(queryInfo)

      store.dispatch('systemStore/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          queryInfo
        }
      })
    }
    getPageData()
    //新建用户
    const handleAddUser = () => {
      emit('addUserClick')
    }
    //编辑用户
    const handleEditClick = (item: any) => {
      emit('editUserClick', item)
    }
    //删除用户
    const handleDeleteClick = (item: any) => {
      store.dispatch('systemStore/deleteUserAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    return {
      dialogVisible,
      pageInfo,
      dataList,
      dataCount,
      otherPropSlots,
      showFooter,
      getPageData,
      formatDate,
      handleAddUser,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
#page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.addBtn {
  text-align: right;
  margin-bottom: 10px;
}
.el-image {
  width: 100%;
  height: 200px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
