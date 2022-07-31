<template>
  <div class="card-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10" @click="handleClickAdd('card-add')">添加会员卡</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="cardName" label="会员卡名称" align="center" min-width="150px"/>
        <el-table-column :show-overflow-tooltip="true" prop="street" label="类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.cardType === '2' ? '次卡' : '期间卡'}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="price" label="售价" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="address" label="有效期" align="center" min-width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.validityStart}}-{{scope.row.validityEnd}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="businessModelText" label="时段限制" align="center" width="110px">
          <template slot-scope="scope">
            <span>{{scope.row.limitTime ? '限制' : '不限制'}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" align="center" width="160px"/>
        <el-table-column :show-overflow-tooltip="true" prop="servicerName" label="运营商" align="center" width="110px"/>
        <el-table-column prop="sell" label="是否上架" align="center" width="110px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.onSale"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="true"
              :inactive-value="false"
              @change="handleChangeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情"
                   @click="handleClickAdd('card-detail', scope.row)"
              >
              <img class="table-btn-img" src="../../gym-setting/gym-manage/6.png" alt="编辑"
                   @click="handleClickAdd('card-edit', scope.row)"
              >
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除"
                   @click="handleClickAdd('del', scope.row)"
              >
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-g-y-m v-if="addVisible" :gym-visible.sync="addVisible" :title="title" :type="gymType" :gym-id="gymCurrId"></create-g-y-m>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 卡管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { editGymCardSale, gymCardPage } from '@/api/business-manage'
import { REQ_OK } from '@/common/js/code'
import CreateGYM from '@/views/gym-setting/gym-manage/CreateGYM'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '健身房添加',
      gymType: 'add',
      gymCurrId: '',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'gymId',
            label: '健身房名称',
            type: 'gym-list',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'cardName',
            label: '会员卡',
            type: 'wd',
            value: '',
            placeholder: '请搜索'
          },
          {
            key: 'cardType',
            label: '类型',
            type: 'card-type',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'servicerName',
            label: '运营商',
            type: 'wd',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'limitTime',
            label: '时段限制',
            type: 'card-time-type',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'onSale',
            label: '状态',
            type: 'card-status',
            value: '',
            placeholder: '全部'
          }
        ]
      }
    }
  },
  created () {
    this.$bus.$on('cardListRefresh', () => {
      this.$refs.tableRef.refresh()
    })
  },
  mounted () {
  },
  computed: {},
  methods: {
    _getTableList (params, done) {
      gymCardPage(this.query, params).then(res => {
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
        this.$router.push(`/business/card/${type}/${item.id}`)
      } else {
        this.$router.push(`/business/card/${type}`)
      }
    },
    handleChangeStatus (row, type) {
      editGymCardSale({ ...row }).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
        } else {
          row.status = !row.status
        }
      })
    }
  },
  watch: {},
  components: {
    CreateGYM

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.card-manage-wrapper {
  position relative
}
</style>
