import { ILoginState } from './login'
import { ISystemState } from './system'
import { IDashboardState } from './analysis'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  loginStore: ILoginState
  systemStore: ISystemState
  dashboardStore: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
