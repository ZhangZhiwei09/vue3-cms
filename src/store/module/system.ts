import { Module } from 'vuex'
import { IRootState } from '../type/index'
import { ISystemState } from '../type/system'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/mockhttp/main/system/system'
const systemStore: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      console.log(pageUrl, payload)

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data

      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deleteUserAction({ dispatch }, payload: any) {
      const { pageName, id } = payload

      // const pageUrl = `/${pageName}/${id}`

      await deletePageData(pageName, id)
      //删除完再重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      //创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log(newData)

      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      console.log(payload)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, {
        editData,
        id
      })

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemStore
