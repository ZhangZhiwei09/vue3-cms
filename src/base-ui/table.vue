<template>
  <el-table :data="dataList" style="width: 100%" v-bind="childrenProps">
    <template v-for="propItem in propList" :key="propItem.prop">
      <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface IPropList {
  label: string
  minWidth: string | number
  prop: string
  slotName?: string
}
export default defineComponent({
  props: {
    dataList: { type: Array, require: true },
    propList: { type: Array as PropType<IPropList[]>, required: true },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>

<style scoped lang="less"></style>
