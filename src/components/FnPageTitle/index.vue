<template>
  <div class="fn-page-title-wrapper">{{title}}</div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/23 12:49 上午
 */
export default {
  name: 'FnPageTitle',
  props: {
    title: {
      type: String,
      default: '首页'
    }
  },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {},
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fn-page-title-wrapper {
  margin 30px 0
  padding-left 18px
  height 44px
  line-height 44px
  font-size 16px
  font-weight 600;
  color: #2C3B5B;
  background: #F6F7FA;
}
</style>
