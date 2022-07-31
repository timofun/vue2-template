<template>
  <div class="sidebar" style="height:100%;">
    <el-menu
      class="sidebar-el-menu"
      ref="sideBarMenu"
      :default-active="onRoutes"
      :collapse="!sidebar.opened"
      active-text-color="#12C7CB"
      unique-opened
      router>
      <div class="router-list">
        <template v-for="item in routers">
          <el-submenu :index="resolvePath(item.path, item.path)" :id="item.path" :key="item.id"
                      v-if="item.children && item.children.length">
            <template slot="title">
              <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children && subItem.children.length"
                          :index="resolvePath(item.path, subItem.path)" :key="subItem.path" :id="subItem.path">
                <template slot="title">{{ subItem.meta.title }}</template>
                <el-menu-item v-for="threeItem in subItem.children"
                              :key="threeItem.path"
                              :index="resolvePath(`${item.path}/${subItem.path}`, threeItem.path)"
                >
                  {{ threeItem.meta.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="resolvePath(item.path, subItem.path)" :key="subItem.path">
                {{ subItem.meta.title }}
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item :index="resolvePath(item.path, item.path)" :id="item.path" :key="item.path" v-else>
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'

export default {
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['routers', 'sidebar']),
    onRoutes () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    resolvePath (basePath, routePath) {
      return path.resolve(basePath, routePath)
    }
  },
  watch: {},
  components: {}
}
</script>
<style lang="stylus" scoped>
  ::-webkit-scrollbar { width: 0 !important }
  .sidebar >>> {
    display flex
    flex-direction column
    height: 100%;
    background: $color;
    z-index: 100;
    > .sidebar-el-menu.el-menu {
      display: flex;
      flex-direction: column;
      flex 1
      padding-bottom 10px
      background $color
      overflow-y scroll
      .el-menu-item {
        padding-left 54px!important
        color $color-w
        &:focus {
          background-color $color
        }
        &:hover {
          background-color $menu-active-color-hover
        }
      }
      .el-submenu {
        .el-menu.el-menu--inline {
          background: $color
        }
        .el-submenu__title {
          color: $color-w
          &:focus {
            background-color $color
          }
          &:hover {
            background-color $menu-active-color-hover
          }
        }
        &.is-active {
          .el-submenu__title {
            color: $menu-active-color
          }
        }
      }
      &::-webkit-scrollbar {
        width: 0
        height 0
      }
    }
    .svg-icon {
      margin-left 5px
      margin-right 15px
      width 14px
    }
    .el-menu--collapse {
      .el-submenu__title {
        > span, > i {
          display none
        }
      }
    }
    i {
      font-size: 16px;
      text-align: center;
      margin-right: 4px;
      color #ffffff
    }
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: $menu-width-open
  }
</style>
