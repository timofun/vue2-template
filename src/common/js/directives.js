import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
import store from '../../store'
import { Message } from 'element-ui'
// 设置表格高度
const doResize = async (el, binding, vnode) => {
  // 获取表格Dom对象
  const { componentInstance: $table } = await vnode
  // 获取调用传递过来的数据
  const { value } = binding

  if (!$table.height) {
    throw new Error('el-$table must set the height. Such as height=100px')
  }
  // 获取距底部距离（用于展示页码等信息）
  const bottomOffset = (value && value.bottomOffset) || 30

  if (!$table) return

  // 计算列表高度并设置
  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  $table.layout.setHeight(height)
  $table.doLayout()
}

export default (Vue) => {
  // 聚焦
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
  // 防抖
  Vue.directive('debounce', {
    inserted: function (el, binding) {
      const [fn, event = 'click', time = 300] = binding.value
      let timer
      el.addEventListener(event, () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => fn(), time)
      })
    }
  })
  // 节流
  Vue.directive('throttle', {
    inserted: function (el, binding) {
      let timer
      let last
      const interval = 1000
      el.addEventListener('click', () => {
        const now = +new Date()
        if (last && now - last < interval) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            last = now
            binding.value()
          }, interval)
        } else {
          last = now
          binding.value()
        }
      })
    }
  })
  // 拖拽
  Vue.directive('drag', {
    inserted: function (el, binding) {
      const currentBindElWidth = el.clientWidth
      let firstTime = ''
      let lastTime = ''
      el.onmousedown = function (ev) {
        firstTime = new Date().getTime()
        const disX = ev.clientX - el.offsetLeft
        const disY = ev.clientY - el.offsetTop
        event.preventDefault()
        document.onmousemove = function (ev) {
          el.setAttribute('data-flag', 'false')
          const l = ev.clientX - disX
          const t = ev.clientY - disY
          if (l <= 0) {
            el.style.left = '0'
          } else if (l > window.document.body.clientWidth - currentBindElWidth) {
            // 判断指令中是否绑定了函数
            if (binding.expression) {
              // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
              binding.value('in')
            }
            el.style.left = window.document.body.clientWidth - currentBindElWidth + 'px'
          } else {
            if (binding.expression) {
              // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
              binding.value('out')
            }
            el.style.left = l + 'px'
          }
          if (t < 20) {
            el.style.top = '20px'
          } else if (t > window.document.body.clientHeight - 62) {
            el.style.top = window.document.body.clientHeight - 82 + 'px'
          } else {
            el.style.top = t + 'px'
          }
        }
        document.onmouseup = function () {
          // onmouseup 时的时间，并计算差值
          lastTime = new Date().getTime()
          // console.log('onmouseup', lastTime - firstTime)
          if ((lastTime - firstTime) < 150) {
            el.setAttribute('data-flag', 'true')
          }
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
  // 在元素外部处理事件
  Vue.directive('outside', {
    inserted: function (el, binding) {
      function clickHandler (e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e)
        }
      }

      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = clickHandler
      document.addEventListener('click', clickHandler)
    },
    // 初始化指令
    bind (el, binding, vnode) {
    },
    update () {
    },
    unbind (el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    }
  })
  // 聚焦
  Vue.directive('adaptive', {
    // 初始化设置
    bind (el, binding, vnode) {
      // 设置resize监听方法
      el.resizeListener = async () => {
        await doResize(el, binding, vnode)
      }
      // 绑定监听方法到addResizeListener
      addResizeListener(window.document.body, el.resizeListener)
      addResizeListener(el, el.resizeListener)
    },
    // 绑定默认高度
    async inserted (el, binding, vnode) {
      // 如果需要监听更多dom变化时，也重新计算table高度，那么可以传入watchResizeId
      const { value } = binding
      if (value && value.watchResizeId && value.watchResizeId.length) {
        value.watchResizeId.forEach(item => {
          addResizeListener(document.getElementById(item), el.resizeListener)
        })
      }
      await doResize(el, binding, vnode)
    },
    // 销毁时设置
    unbind (el) {
      // 移除resize监听
      removeResizeListener(el, el.resizeListener)
    }
  })
  // 按钮权限
  Vue.directive('btn-auth', {
    inserted: function (el, binding, vnode) {
      function clickHandler (e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target) && binding.expression) {
          if (binding.value && binding.value.auth) {
            if (store.getters.buttonPower.length && !store.getters.buttonPower.includes(binding.value.auth)) {
              Message.error('暂无操作权限~')
            } else {
              const that = vnode.context
              that[binding.arg](...binding.value.handleType)
            }
          }
        }
      }

      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueBtnAuth__ = clickHandler
      document.addEventListener('click', clickHandler)
    },
    unbind (el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueBtnAuth__)
      delete el.__vueBtnAuth__
    }
  })
  // 只能输入数字
  Vue.directive('enterNumber', {
    inserted: function (el) {
      el.addEventListener('keypress', function (e) {
        e = e || window.event
        const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
        const re = /\d/
        if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
      })
    }
  })
  // 输入数字范围
  Vue.directive('enterNumberRange', {
    inserted (el, vDir, vNode) {
      // vDir.value 有指令的参数
      let content
      // 设置输入框的值,触发input事件,改变v-model绑定的值
      const setVal = val => {
        if (vNode.componentInstance) {
          // 如果是自定义组件就触发自定义组件的input事件
          vNode.componentInstance.$emit('input', val)
        } else {
          // 如果是原生组件就触发原生组件的input事件
          el.value = val
          el.dispatchEvent(new Event('input'))
        }
      }
      // 按键按下=>只允许输入 数字/小数点/减号
      el.addEventListener('keypress', event => {
        const e = event || window.event
        const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
        const re = /\d|\.|-/
        content = e.target.value
        // 定义方法,阻止输入
        function preventInput () {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput()
        } else if (content.indexOf('.') > 0 && inputKey === '.') {
          // 已有小数点,再次输入小数点
          preventInput()
        }
      })
      // 按键弹起=>并限制最大最小
      el.addEventListener('keyup', event => {
        const e = event || window.event
        content = parseFloat(e.target.value)
        if (!content) {
          content = 0.00
        }
        let argMax = ''
        let argMin = ''
        if (vDir.value) {
          argMax = parseFloat(vDir.value.max)
          argMin = parseFloat(vDir.value.min)
        }
        if (argMax !== undefined && content > argMax) {
          setVal(argMax)
          content = argMax
        }
        if (argMin !== undefined && content < argMin) {
          setVal(argMin)
          content = argMin
        }
      })
      // 失去焦点=>保留指定位小数
      el.addEventListener('focusout', event => { // 此处会在 el-input 的 @change 后执行
        const e = event || window.event
        content = parseFloat(e.target.value)
        if (!content) {
          content = 0.00
        }
        let argPrecision = 0// 默认保留至整数
        if (vDir.value.precision) {
          argPrecision = parseFloat(vDir.value.precision)
        }
        e.target.value = content.toFixed(argPrecision)
        setVal(e.target.value)
        // -- callback写法1
        // vNode.data.model.callback = ()=>{
        //     e.target.value = content.toFixed(argPrecision)
        // }
        // vNode.data.model.callback();
        // -- callback 写法2
        // vNode.data.model.callback(
        //     e.target.value = content.toFixed(argPrecision)
        // )
      })
    }
  })
}


