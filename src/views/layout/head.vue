<template>
  <div class="header-wrapper">
    <el-container style="height: 100%;">
      <el-header id="headBox">
        <el-row type="flex" justify="space-between">
          <div class="left-flex">
            <div :class="[!collapse ? 'header-box header-box-open' : 'header-box']">
              <img src="./logo-title.png" alt="" style="margin-right: 20px;width: 140px;height: 35px" v-if="!collapse"/>
              <i :class="[!collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" @click="collapseChange"></i>
            </div>
            <div class="header-title">
              欢迎进入杭州市体育局百姓健身房智慧管理系统
            </div>
          </div>
          <div class="right-flex">
            <div class="right-item">
              <div class="help" @click="handleHrefHelp">
                操作手册
              </div>
              <div class="person">
                你好，{{userInfo.name}}
                <span class="logout" @click="handleLogout">
                  退出系统
                </span>
              </div>
            </div>
          </div>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {},
  data () {
    return {
      infoWidth: '320px',
      collapse: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'routers',
      'sidebar'
    ]),
    onRoutes () {
      return this.$route.path
    }
  },
  created () {
    // 判断是否展开左侧导航
    if (!this.sidebar.opened) {
      this.changeIcon()
    }
  },
  mounted () {
    // 屏幕宽度小于900时  左侧收起
    if (document.body.clientWidth < 900) {
      this.collapseChange()
    }
  },
  methods: {
    collapseChange () {
      this.changeIcon()
      this.$store.dispatch('ToggleSideBar').then(item => {})
    },
    changeIcon () {
      this.collapse = !this.collapse
    },
    handleHrefHelp () {
      window.open('https://docs.qq.com/doc/DSkVobE5BQXhReGlD', '_blank')
    },
    handleLogout () {
      setTimeout(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }, 800)
    },
    getBreadcrumb () {
      // only show routes with meta.title
      // const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    }
  },
  watch: {
    $route: {
      handler (route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
          return
        }
        this.getBreadcrumb()
      },
      immediate: true
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.header-wrapper {
  margin:0 -20px;
  height: $menu-height;
  min-width: 500px
  #headBox{
    background: $color;
    height: 100%;
    z-index: 100 !important;
    .left-flex {
      display flex
      .header-box, .header-title {
        display flex
        align-items center
        justify-content flex-end
        width $menu-width-open
        height $menu-height
        font-size 24px
        background-color $color
        color $color-w
        transition: all .2s
      }
      .header-box {
        padding-right 24px
        width $menu-width-close
        box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.25);
        box-sizing border-box
        &.header-box-open {
          width $menu-width-open
        }
        i {
          font-size 14px
          &:hover {
            cursor pointer
          }
        }
      }
      .header-title {
        margin-left 50px
        width auto
        font-size 14px
      }
    }
    .right-flex {
      display flex
      padding-right 20px
      .right-item {
        display: flex;
        align-items: center;
        font-size 14px;
        color #333333
        i {
          width: 30px;
          color: #777777;
          font-size: 20px;
        }
        .new {
          position: absolute;
          top: 20px;
          left: 18px;
          width: 7px;
          height: 7px;
          background-color: #fb4949;
          border-radius: 50%;
        }
        .help {
          margin-right 43px;
          color $color-w
          &:hover {
            cursor pointer
          }
        }
        .person {
          display flex
          align-items center
          color $color-w
          .logout {
            margin-left 43px
            &:hover {
              cursor pointer
            }
          }
        }
      }
    }
  }
}
</style>
