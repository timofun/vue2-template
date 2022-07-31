<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <slot>
      <div v-if="isButton">
        <el-button style="background-color: #849AAE;color: #ffffff" @click="handleCancel" class="approval">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSave">确认</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
// import pathToRegexp from 'path-to-regexp'
export default {
  name: 'FnBreadCrumb',
  props: {
    isButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      levelList: null,
      loading: false
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
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // only show routes with meta.title
      this.levelList = this.$route.matched.filter(item => item.meta && item.meta.title)
    },
    handleLink (item) {
      const { path } = item
      this.$router.push(path)
    },
    handleSave () {
      this.$emit('save')
    },
    handleCancel () {
      this.$router.back()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="stylus" scoped>
.breadcrumb-wrapper {
  display flex
  align-items center
  justify-content space-between
  .el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    .no-redirect {
      color: #1a1a1a;
      font-weight 600;
      cursor: text;
    }
  }
}
</style>
