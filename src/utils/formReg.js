/**
 * @Author QINGYU FAN
 * @Version
 * @Description 验证
 * @date ${date}
 */
const customRegExp = { // 验证
  sortNum (rule, value, callback) { // 2-30位，可包含字母，数字（0-9十个数字）
    const v = value.toString().trim()
    const flag = /^[0-9]{1,5}$/.test(v)
    if (v === '0' || (v && !flag)) {
      if (callback) callback(new Error('请输入1-99999之间整数'))
    } else {
      callback()
    }
  },
  allCode (rule, value, callback) { // 2-30位，可包含字母，数字（0-9十个数字）
    const v = value.toString().trim()
    const flag = /^[A-Z0-9]{1,8}$/.test(v)
    if (v && !flag) {
      if (callback) callback(new Error('请输入1-8位,可包含大写字母,数字'))
    } else {
      callback()
    }
  },
  pureName (rule, value, callback) { // 可以验证少数民族名
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('填写内容为2位以上中文!'))
    } else {
      callback()
    }
  },
  pureCN (rule, value, callback) { // 纯中文
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5]+$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('填写内容为纯中文!'))
    } else {
      callback()
    }
  },
  pureEN (rule, value, callback) { // 纯英文
    const v = value.toString().trim()
    const flag = /^[A-Za-z]+$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('填写内容为纯英文!'))
    } else {
      callback()
    }
  },
  pureNumber: function (rule, value, callback) {
    const v = value.toString().trim()
    const flag = (/^\+?[1-9][0-9]*$/.test(v))
    if (!flag) {
      if (callback) callback(new Error('填写内容必须为纯数字!'))
    } else {
      callback()
    }
  },
  passwordReg (rule, value, callback) { // 密码
    const v = value.toString().trim()
    const flag = /^[a-zA-Z0-9_`~!@#$%^&*()（）\-_+={[\]}?:;'"|<,.>/]{6,20}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('密码格式错误'))
    } else {
      callback()
    }
  },
  usernameReg (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5a-zA-Z0-9]{2,10}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('\n' + '用户名格式错误(2-10位,可包含中文,数字,字母)'))
    } else {
      callback()
    }
  },
  employeenameReg (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5a-zA-Z](.*?){0,13}[\u4E00-\u9FA5a-zA-Z0-9]$/.test(v)
    const flag1 = /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9.\-_]{0,13}[\u4E00-\u9FA5a-zA-Z0-9]$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('\n' + '2-15位(以中英文开头，中英文或数字结尾)'))
    } else if (!flag1) {
      if (callback) callback(new Error('\n' + '中间只可以包含（.-_）'))
    } else {
      callback()
    }
  },
  companyReg (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5a-zA-Z0-9_()（）\-_]{2,30}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('\n' + '组织名称格式错误(2-30位,可包含中文,数字,字母,-,_,括号)'))
    } else {
      callback()
    }
  },
  nameReg (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5a-zA-Z0-9_`~!@#$%^&*()（）\-_+={[\]}?:;'"|<,.>/]{2,10}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('2-10位,可包含中文,数字,字母,符号'))
    } else {
      callback()
    }
  },
  phoneReg (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^1[3-9]\d{9}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('手机号格式不正确'))
    } else {
      callback()
    }
  },
  verifyReg (rule, value, callback) { // 验证码 4位
    const v = value.toString().trim()
    const flag = /^\d{4}$/gi.test(v)
    if (!flag) {
      if (callback) callback(new Error('验证码只能由数字组成'))
    } else {
      callback()
    }
  },
  notEmpty: function (rule, value, callback) {
    const v = value.toString().trim()
    let flag = true
    if (v.length < 1) {
      flag = false
      if (callback) {
        if (callback) callback(new Error('填写内容不能为空!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
    return flag
  },
  withinST: function (rule, value, callback) { // 6-20位置
    const v = value.toString().trim()
    let flag = true
    if (v.length < 6 || v.length > 20) {
      flag = false
      if (callback) {
        if (callback) callback(new Error('填写内容6-20位!'))
      } else {
        callback()
      }
    }
    return flag
  },
  emailReg: function (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('邮箱格式不正确!'))
    } else {
      callback()
    }
  },
  identityReg: function (rule, value, callback) {
    const v = value.toString().trim()
    const flag = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v)
    if (!flag) {
      if (callback) callback(new Error('身份证号不合法'))
    } else {
      callback()
    }
  },
  bankReg: function (rule, value, callback) {
    const v = value.toString().trim()
    const strBank = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
    let flag = true
    if (!(/^[0-9]{16,19}$/.test(v))) {
      flag = false
      if (callback) callback(new Error('银行卡为16-19位的纯数字!'))
    } else if (strBank.indexOf(v.substring(0, 2)) === -1) {
      flag = false
      if (callback) callback(new Error('银行卡号开头6位不符合规范!'))
    }
    return flag
  },
  floatNum: function (rule, value, callback) { //  输入内容为小数位不超过2位的数值
    const v = value.toString().trim()
    const flag = /^\d{0,10}\.{0,1}(\d{1,2})?$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('请输入小数位不超过2位的数值!'))
    } else {
      callback()
    }
  },
  // 新增角色
  roleNameReg: (rule, value, callback) => {
    const v = value.toString().trim()
    const flag = /^[\u4E00-\u9FA5a-zA-Z0-9]{2,10}$/.test(v)
    if (!flag) {
      if (callback) callback(new Error('\n' + '名称格式错误(2-10位,可包含中文,数字,字母)'))
    } else {
      callback()
    }
  },
  // 金额
  validateMoney: (rule, value, callback) => {
    const reg = new RegExp('(^\\d+$|^\\d+\\.?\\d{1,2}$)')
    if (!reg.test(value)) {
      if (callback) callback(new Error('\n' + '请输入正确的金额（保留小数点后两位）'))
    } else {
      callback()
    }
  }
}

export default customRegExp
