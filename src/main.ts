import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { mockXHR } from '@/mock/index'
// import { mockXHR ,mockXHR2} from "@/mock/index";
// 判断开发环境
if (process.env.NODE_ENV == 'mock') {
  mockXHR()
  // mockXHR2();
}
import './assets/css/base.less'
// 导入请求拦截器
import { setupStore } from './store'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
setupStore()

app
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')
