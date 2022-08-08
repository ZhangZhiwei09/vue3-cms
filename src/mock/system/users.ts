/* User账号
   usersListData用户列表
*/
const Users = {
  list: [
    {
      id: 1,
      name: 'admin',
      realname: 'admin',
      cellphone: 18812345678,
      enable: 1,
      createAt: '2021-01-02T10:20:26.000Z',
      updateAt: '2021-01-03T04:50:13.000Z',
      role: {
        id: 1,
        name: '超级管理员',
        intro: '所有权限',
        createAt: '2021-01-02T10:01:52.000Z',
        updateAt: '2021-01-02T10:01:52.000Z'
      },
      department: {
        id: 1,
        name: '总裁办',
        parentId: null,
        createAt: '2021-01-02T10:03:09.000Z',
        updateAt: '2021-01-05T08:25:46.000Z',
        leader: 'coderwhy'
      }
    },
    {
      id: 4,
      name: 'test',
      realname: 'test',
      cellphone: 16655552222,
      enable: 1,
      createAt: '2021-08-23T07:25:02.000Z',
      updateAt: '2021-08-23T07:25:09.000Z',
      role: {
        id: 2,
        name: '测试',
        intro: '测试',
        createAt: '2021-01-05T11:47:42.000Z',
        updateAt: '2021-01-05T11:50:11.000Z'
      },
      department: {
        id: 2,
        name: '运营部',
        parentId: 1,
        createAt: '2021-01-02T10:03:42.000Z',
        updateAt: '2021-01-05T08:25:52.000Z',
        leader: 'lucy'
      }
    }
  ]
}

const usersListData = {
  list: [
    {
      id: 177032390,
      name: 'zsdadmin',
      realname: 'zsdadmin',
      cellphone: 13975654657,
      enable: 1,
      departmentId: 3,
      roleId: 1,
      createAt: '2022-08-01T07:24:12.000Z',
      updateAt: '2022-08-01T07:24:12.000Z'
    },
    {
      id: 9,
      name: 'lyh',
      realname: '李银河',
      cellphone: 17754456666,
      enable: 1,
      departmentId: 2,
      roleId: 3,
      createAt: '2021-05-02T07:24:12.000Z',
      updateAt: '2021-08-20T04:07:23.000Z'
    },
    {
      id: 8,
      name: 'wxb',
      realname: '王小波',
      cellphone: 18855556666,
      enable: 1,
      departmentId: 2,
      roleId: 3,
      createAt: '2021-05-02T07:24:12.000Z',
      updateAt: '2021-05-02T07:26:20.000Z'
    },
    {
      id: 7,
      name: 'kobe',
      realname: 'kobe',
      cellphone: 16655556666,
      enable: 1,
      departmentId: 2,
      roleId: 3,
      createAt: '2021-05-02T07:24:12.000Z',
      updateAt: '2021-05-02T07:26:20.000Z'
    },
    {
      id: 6,
      name: 'lily',
      realname: 'lily',
      cellphone: 13355556666,
      enable: 1,
      departmentId: 2,
      roleId: 3,
      createAt: '2021-05-02T07:24:12.000Z',
      updateAt: '2021-05-02T07:26:20.000Z'
    },
    {
      id: 5,
      name: 'coderdemo',
      realname: 'demo',
      cellphone: 17766665555,
      enable: 1,
      departmentId: 5,
      roleId: 4,
      createAt: '2021-08-23T07:24:12.000Z',
      updateAt: '2021-08-23T07:24:21.000Z'
    },
    {
      id: 4,
      name: 'codertest',
      realname: 'test',
      cellphone: 16655552222,
      enable: 1,
      departmentId: 3,
      roleId: 2,
      createAt: '2021-08-23T07:25:02.000Z',
      updateAt: '2021-08-23T07:25:09.000Z'
    },
    {
      id: 3,
      name: 'lucy',
      realname: 'lucy',
      cellphone: 15566668888,
      enable: 1,
      departmentId: 1,
      roleId: 1,
      createAt: '2021-01-03T04:01:40.000Z',
      updateAt: '2021-08-09T16:09:41.000Z'
    },
    {
      id: 2,
      name: 'lilei',
      realname: 'lilei2',
      cellphone: 13322223333,
      enable: 1,
      departmentId: 1,
      roleId: 1,
      createAt: '2021-01-03T03:34:34.000Z',
      updateAt: '2021-08-20T03:02:12.000Z'
    },
    {
      id: 1,
      name: 'coderwhy',
      realname: 'coderwhy',
      cellphone: 18812345678,
      enable: 1,
      departmentId: 1,
      roleId: 1,
      createAt: '2021-01-02T10:20:26.000Z',
      updateAt: '2021-01-03T04:50:13.000Z'
    }
  ],
  totalCount: 10
}

export default [
  /*
  查询用户      /users/id    get
  创建用户      /users       post
  查询用户列表  /users/list   post查询 delete删除 patch编辑
  */
  {
    url: '/mock/users',
    type: 'get',
    response: ({ url }: any) => {
      const id = url.charAt(url.length - 1)
      const result = Users.list.find((item) => {
        return item.id == id
      })
      return {
        code: 200,
        data: result
      }
    }
  },
  {
    url: '/mock/users/list',
    type: 'post',
    response: ({ body }: any) => {
      const data = JSON.parse(body)
      const { offset, size, queryInfo } = data
      // 有查询条件并且查询条件不为空{}
      if (queryInfo && JSON.stringify(queryInfo) !== '{}') {
        const cloneData = JSON.parse(JSON.stringify(usersListData))
        const lists = cloneData.list
        const searchkeys = Object.keys(queryInfo)
        if (size) {
          const searchResult = lists
            .filter((item: any) => searchkeys.find((k) => item[k] == queryInfo[k]))
            .splice(offset, size)
          cloneData.list = searchResult
        }
        return {
          code: 200,
          message: '查询',
          data: cloneData
        }
      } else {
        const cloneList = JSON.parse(JSON.stringify(usersListData))
        cloneList.list = cloneList.list.splice(offset, size)
        return {
          code: 200,
          message: '重置',
          data: cloneList
        }
      }
    }
  },
  {
    url: '/mock/users',
    type: 'delete',
    response: (option: any) => {
      const deleteId = option.body
      usersListData.list.forEach((item, index) => {
        if (item.id === deleteId) {
          usersListData.list.splice(index, 1)
        }
      })
      return {
        code: 0,
        data: usersListData
      }
    }
  },
  {
    url: '/mock/users',
    type: 'patch',
    response: (option: any) => {
      const { editData, id } = JSON.parse(option.body)
      const index = usersListData.list.findIndex((e) => e.id === id)
      for (const item in editData) {
        usersListData.list[index][item] = editData[item]
      }
      return {
        code: 200,
        data: usersListData
      }
    }
  },
  {
    url: '/mock/users',
    type: 'post',
    response: (option: any) => {
      const id = Math.floor(Math.random() * 90 + 10)
      const newPageData = JSON.parse(option.body)
      const newUserData = {
        id: id,
        ...newPageData
      }
      usersListData.list.push(newUserData)
      usersListData.totalCount++
      return {
        code: 200,
        data: usersListData
      }
    }
  }
]
