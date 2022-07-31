// 后端的公钥key
const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmHeJDPH81ZAsC4uvUI9ZhxIIJHaxQ83caN8Oz3WyNk3O++ScFfTD9t8b5HpP/fRUdCiOUag32rKF4CDE2qkIzCpLVor1LZuwh8S4e6hc1EaofvP6TokFzhQFuAO0L+rtB1GnSI75M59BHTbt80Wmp2fSLvtoLYBq+/8twSnm4xQIDAQAB' +
  '-----END PUBLIC KEY-----'

// 加密
export const generateKeyMixin = {
  methods: {
    // 加密方法
    RSAencrypt (pwd) {
      // 实例化jsEncrypt对象
      const jse = this.$jsEncrypt
      // 设置公钥
      jse.setPublicKey(PUBLIC_KEY)
      // 解密
      return jse.encrypt(pwd)
    },
    // 解密方法
    RSAdecrypt (pwd) {
      const jse = this.$jsEncrypt
      jse.setPrivateKey('')
      return jse.decrypt(pwd)
    }
  }
}

export const delFunctionMixin = {
  methods: {
    handleClickDel (id, fn, text = '确认删除吗, 是否继续?') {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fn(id)
      })['catch'](() => {
      })
    }
  }
}
