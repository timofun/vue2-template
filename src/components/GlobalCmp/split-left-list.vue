<template>
  <div class="split-left-list_container">
    <ul class="left-list">
      <li class="list-item"
          :class="{'active': currentIndex === item[optionKey]}"
          v-for="(item, index) in data"
          :key="index"
          @click.stop="handleClick(item)"
      >
        <span class="name">{{item[titleKey]}}</span>
        <div class="template-list-option" v-if="showOption">
          <slot :item="item">
            <span @click.stop="handleShow(item)">查看</span>
            <span @click.stop="handleEdit(item)">编辑</span>
            <span @click.stop="handleDel(item)">删除</span>
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
/**
  * @Author QINGYU FAN
  * @Version
  * @Description
  * @date 2019/9/21 10:06
  */
export default {
  name: 'split-left-list',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    titleKey: {
      type: String,
      default: 'name'
    },
    showOption: {
      type: Boolean,
      default: true
    },
    defaultSelect: {
      type: [String, Number],
      default: 0
    },
    optionKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  created () {
    // this.currentIndex = this.defaultIndex
  },
  mounted () {
  },
  computed: {},
  methods: {
    // 点击
    handleClick (item) {
      this.currentIndex = item[this.optionKey]
      this.$emit('handleClick', item)
    },
    // 查看
    handleShow (item) {
      this.$emit('handleShow', item)
    },
    // 编辑
    handleEdit (item) {
      this.$emit('handleEdit', item)
    },
    // 删除
    handleDel (item) {
      this.$emit('handleDel', item)
    }
  },
  watch: {
    data: {
      handler () {
        this.currentIndex = this.defaultSelect
      }
    }
  },
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/variable.styl"
  .split-left-list_container
    height: 68vh;
    overflow: auto;
    .left-list
      .list-item
        padding 8px 24px
        font-size 0
        color $color-text
        .name
          display: inline-block;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 136px;
          font-size 14px
        .template-list-option
          display: inline-block;
          float: right;
          font-size: 12px;
          line-height: 19px
          visibility: hidden;
        &:hover, &.active
          cursor pointer
          background-color: #f3f6fb
          color $color
          .template-list-option
            visibility: visible;
            span
              margin-right  10px
              &:lastchild
                margin-right 0
</style>
