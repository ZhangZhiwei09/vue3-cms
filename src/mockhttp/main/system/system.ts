import request from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string, id: number) {
  return request.delete<IDataType>({
    url: url,
    data: id
  })
}

export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url: url,
    data: editData
  })
}
