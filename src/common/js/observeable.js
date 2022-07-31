// 组件共享状态
import Vue from 'vue'

// 弹窗loading
export const dialogLoading = Vue.observable({
  show: false
})

export const dialogMutation = {
  changeState (bol) {
    dialogLoading.show = bol
  }
}
