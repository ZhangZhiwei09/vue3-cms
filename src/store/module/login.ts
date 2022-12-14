import { Module } from 'vuex'
import { ILoginState } from '../type/login'
import { IRootState } from '../type/index'
import { mapMenusToRoutes } from '@/utils/map-menu'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/mockhttp/login/login'

import router from '@/router'
import localCache from '@/utils/cache'
const loginStore: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮的权限
      // const permissions = mapMenusToPermissions(userMenus)
      // state.permissions = permissions
    }
  },
  actions: {
    async LoginAction({ commit, dispatch }, payload) {
      const loginResult = await accountLoginRequest(payload)

      const { id, token } = loginResult.data

      commit('changeToken', token)
      localCache.setCache('token', token)
      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息

      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)

      const userInfo = userInfoResult.data

      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 4.跳到首页
      router.push('/main')

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)

      console.log(userMenusResult)

      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginStore
