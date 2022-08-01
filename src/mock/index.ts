import Mock from 'mockjs'
const ctx = require.context('./', true, /\.ts$/)
const mocks: any = []
ctx.keys().forEach((e) => {
  if (ctx(e).default) {
    mocks.push(...ctx(e).default)
  }
})
//设置延时时间
Mock.setup({
  timeout: '200'
})

export interface MockParams {
  url: string
  type: string
  data?: any
  params?: any
  response(option?: any): Record<string, unknown>
}

export function mockXHR() {
  let i: MockParams
  console.log(mocks)
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
