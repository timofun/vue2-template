import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message } from 'element-ui'
import components from './common/js/components' // 自己封装的全局组件
import directives from './common/js/directives' // 自定义指令
import * as filters from './filters' // 全局filter
import './common/css/index.css'
import './common/css/index.styl'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './icons' // icon
import customRegExp from './utils/formReg' // 表单验证
import './permission' // 权限
import JsEncrypt from 'jsencrypt' // 加密库
// import 'element-ui/lib/theme-chalk/index.css'
/**
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
class DonMessage {
  success (options, single = true) {
    this[showMessage]('success', options, single)
  }

  warning (options, single = true) {
    this[showMessage]('warning', options, single)
  }

  info (options, single = true) {
    this[showMessage]('info', options, single)
  }

  error (options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage] (type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

// 命名根据需要，DonMessage只是在项目中使用
Vue.prototype.$message = new DonMessage()
Vue.use(require('vue-wechat-title'))
// RSA encrypt
Vue.prototype.$jsEncrypt = new JsEncrypt()
// 全局form验证
Vue.prototype.$Regs = customRegExp
// 关闭productionTip
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(ElementUI)
Vue.use(components)
Vue.use(directives)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
