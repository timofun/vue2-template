<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="content-wrapper">
      <HeadCmp></HeadCmp>
      <div class="content-box">
        <left-side/>
        <div class="content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LeftSide from './left-side'
import HeadCmp from './head'
import { mapGetters } from 'vuex'

export default {
  props: {},
  data () {
    return {
      isShowBanner: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'accountExpires'
    ])
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
  watch: {
    userInfo: {
      handler (val) {
        if (val.is_show_banner) {
          this.isShowBanner = val.is_show_banner
        }
      },
      immediate: true
    }
  },
  components: {
    LeftSide,
    HeadCmp
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-wrapper >>> {
    display flex
    flex-direction column
    .content-wrapper {
      flex 1
      position relative
      .content-box {
        display flex
        position: absolute;
        left: 0;
        right: 0;
        top: $menu-height;
        bottom: 0;
        background: #f3f6fb
        .content {
          flex 1
          margin 24px
          border-radius 10px
          background: $color-w;
          overflow-y: auto;
          -webkit-transition: .3s ease-in-out;
          transition: .3s ease-in-out;
          .index-wrapper {
            position relative
            height 100%
          }
        }
      }
    }
  }
</style>
