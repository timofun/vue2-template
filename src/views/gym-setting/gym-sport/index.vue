<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10"
                   v-btn-auth:handleClickAdd="{handleType: ['add'], auth: 'gym_sport_add'}"
        >新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sportName" label="名称" align="center"/>
        <el-table-column prop="sell" label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              active-value="1"
              inactive-value="2"
              @change="handleChangeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="130px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../gym-manage/7.png" alt="详情"
                   @click="handleClickAdd('detail', scope.row)">
              <img
                class="table-btn-img" src="../gym-manage/6.png" alt="编辑"
                v-btn-auth:handleClickAdd="{handleType: ['edit', scope.row], auth: 'gym_sport_edit'}"
              >
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-g-y-m-sport v-if="addVisible" :dialog-visible.sync="addVisible" :title="title" :type="gymSportType" :id="gymSportCurrId" @success="onSuccess"></create-g-y-m-sport>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 运动配置项
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { editGymSport, gymSportPage } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import CreateGYMSport from './CreateGYMSport'
export default {
  name: 'GymSport',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '健身房添加',
      gymSportType: 'add',
      gymSportCurrId: '',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'sportName',
            label: '名称',
            type: 'wd',
            value: '',
            placeholder: '请输入名称查询'
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
      gymSportPage(this.query, params).then(res => {
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
      if (item) {
        this.gymSportCurrId = item.id
        this.title = type === 'edit' ? '编辑运动项' : '运动项详情'
      } else {
        this.title = '新增运动项'
      }
      this.gymSportType = type
      this.addVisible = true
    },
    handleChangeStatus (row) {
      console.log(row)
      editGymSport({ ...row }).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
        } else {
          row.status = !row.status
        }
      })
    },
    onSuccess () {
      this.$refs.tableRef.refresh()
    }
  },
  watch: {},
  components: {
    CreateGYMSport
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
