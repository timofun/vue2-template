<template>
  <div class="jc-split-layer">
    <div class="left-container">
      <slot name="left">
      </slot>
    </div>
    <div class="right-container" :style="{padding: rightPadding}">
      <slot name="right">
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'FnSplitLayer',
  props: {
    rightPadding: {
      type: String,
      default: '24px'
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
  .jc-split-layer
    display flex
    width 100%
    height 100%
    overflow hidden
    .left-container
      flex 0 0 350px
      padding 24px
      width 350px
      border-right 2px solid #f1f4f9
      box-sizing border-box
    .right-container
      width calc(100% - 350px)
      min-width 700px
      box-sizing border-box
      overflow auto
</style>
