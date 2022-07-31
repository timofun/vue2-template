<template>
  <div class="title-content-left">
    <div>
      <i class="el-icon-menu"></i>
      <span class="text">{{text}}</span>
    </div>
    <slot>
      <div @click="handleClick" v-if="showAdd" class="add-icon">
        <el-button type="text">
          <i class="el-icon-plus" style="margin-right: 8px"></i>新增
        </el-button>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TitleContentLeft',
  props: {
    text: {
      type: String,
      default: ''
    },
    showAdd: {
      type: Boolean,
      default: true
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
  methods: {
    handleClick () {
      this.$emit('handleClick')
    }
  },
  watch: {},
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/variable.styl"
  .title-content-left >>>
    height 36px
    line-height 36px
    margin-bottom: 20px;
    font-size: 19px;
    font-weight: 600;
    color: #333;
    align-items: center;
    display: flex;
    justify-content space-between
    .el-icon-menu
      color: #777777;
      margin-top -2px
    .text
      margin-left 5px
      font-size 16px
    .add-icon
      .el-button
        padding 0
        font-size 14px
</style>
