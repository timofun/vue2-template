<template>
  <div class="gym-access-control-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10" @click="handleClickAdd('add')">新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="className" label="课程名称" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../7.png" alt="详情" @click="handleClickAdd('detail', scope.row)">
              <img class="table-btn-img" src="../6.png" alt="编辑" @click="handleClickAdd('edit', scope.row)">
              <img class="table-btn-img" src="../8.png" alt="删除" @click="handleClickDel(scope.row.id, _del)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-g-y-m-equipment v-if="addVisible" :dialog-visible.sync="addVisible" :title="title" :type="visibleType" :id="currId" @success="onSuccess"></create-g-y-m-equipment>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 课程活动
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { delGymClass, gymClassPage } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import CreateGYMEquipment from './CreateGYMCourse'
import { delFunctionMixin } from 'common/mixins/common'
export default {
  name: 'GymCourse',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '添加课程活动',
      visibleType: 'add',
      currId: '',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'className',
            label: '课程名称',
            type: 'wd',
            value: '',
            placeholder: '请输入课程名称'
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    _getTableList (params, done) {
      gymClassPage({ gymId: this.$route.params.id, ...this.query }, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    handleClickAdd (type, item) {
      this.visibleType = type
      if (item) {
        this.currId = item.id
        this.title = type === 'edit' ? '编辑课程活动' : '课程活动详情'
      }
      this.addVisible = true
    },
    _del (id) {
      delGymClass(id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
          this.$refs.tableRef.refresh()
        }
      })
    },
    onSuccess () {
      this.$refs.tableRef.refresh()
    }
  },
  watch: {},
  components: {
    CreateGYMEquipment
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.gym-access-control-wrapper {
  position absolute;
  top: 0;
  left 0;
  right 0;
  bottom 0;
  background-color $color-w
  z-index 10
}
</style>
