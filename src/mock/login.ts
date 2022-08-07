import Mock from 'mockjs'
export default [
  {
    url: '/mock/login',
    type: 'post',
    response: (option: any) => {
      const $name = JSON.parse(option.body).name
      console.log($name)

      if ($name === 'admin') {
        return Mock.mock({
          code: 200,
          data: {
            id: 1,
            name: 'admin',
            token:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NTkyNzE1MTgsImV4cCI6MTY2MTg2MzUxOH0.BvdEov8SJp5wBhPfjxBZ0MCX-O8Mg_yQOxD94fVI0Kod0_ReBPOBaFpzQBPdolGzbbqfFdD0aikf4vA5O9wD8q79QbTu4PyFFs9uZOYFGM07glChJPBhZoRdgXM58BZ8W201tR9AruxmMoX5ko-CJ1OXga5J4LbBG4agM30qbmM'
          }
        })
      } else if ($name === 'test') {
        return Mock.mock({
          code: 200,
          data: {
            id: 4,
            name: 'test',
            token:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NTkyNzE1MTgsImV4cCI6MTY2MTg2MzUxOH0.BvdEov8SJp5wBhPfjxBZ0MCX-O8Mg_yQOxD94fVI0Kod0_ReBPOBaFpzQBPdolGzbbqfFdD0aikf4vA5O9wD8q79QbTu4PyFFs9uZOYFGM07glChJPBhZoRdgXM58BZ8W201tR9AruxmMoX5ko-CJ1OXga5J4LbBG4agM30qbmM'
          }
        })
      } else {
        return Mock.mock({
          code: 400,
          message: '未提交参数'
        })
      }
    }
  }
]
