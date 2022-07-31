<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
<!--    <fn-button-header>-->
<!--      <div slot="left">-->
<!--        <el-button type="primary" class="mg-r-10" @click="handleClickAdd('add')">导出</el-button>-->
<!--      </div>-->
<!--    </fn-button-header>-->
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="orderCode" label="订单号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房名称" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="cardNum" label="卡号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="cardName" label="卡名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="cardType" label="卡类型" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="businessModelText" label="有效时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="orderTime" label="购卡时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="fullName" label="购卡人" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="identityCard" label="身份证号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系电话" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="payTime" label="付款时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="payType" label="支付方式" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="payMoney" label="支付金额" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="refundTime" label="退款时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="refundMoney" label="退款金额" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="updateByText" label="操作人" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="orderStatusText" label="状态" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="130px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img v-if="scope.row.orderStatus === '2'" class="table-btn-img" src="./2.png" alt="退款" @click="handleClickRefund(scope.row)">
              <img class="table-btn-img"
                   src="../../gym-setting/gym-manage/7.png" alt="详情" @click="handleClickDetail(scope.row)">
              <img v-if="scope.row.orderStatus !== '2'" class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除"
                   @click="handleClickDel(scope.row.id, _delOrder)"
              >
            </span>
          </template>
        </el-table-column>
        <div slot="statistics" class="statistics-container">
          <span>总订单：{{statistics.total}}</span>
          <span>待支付订单：{{statistics.onPay}}</span>
          <span>已支付订单：{{statistics.payed}}</span>
          <span>已取消订单：{{statistics.cancel}}</span>
          <span>退款订单：{{statistics.refund}}</span>
        </div>
      </fn-table-base>
    </div>
    <order-detail v-if="detailVisible" :dialog-visible.sync="detailVisible" :id="currId" @success="onSuccess"/>
    <refund v-if="refundVisible" :dialog-visible.sync="refundVisible" :id="currId"/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 订单管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { delGymOrder, getGymOrderStatistics, gymOrderPage } from '@/api/business-manage'
import { REQ_OK } from '@/common/js/code'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import OrderDetail from 'views/business-manage/order-manage/OrderDetail'
import Refund from 'views/business-manage/order-manage/Refund'
import { delFunctionMixin } from 'common/mixins/common'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      detailVisible: false,
      refundVisible: false,
      currId: '',
      statistics: {
        cancel: 12,
        onPay: 0,
        payed: 1,
        refund: 0,
        total: 13
      },
      searchForm: {
        componentsNodeArray: [
          {
            key: 'cardType',
            label: '卡类型',
            type: 'card-type',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'gymId',
            label: '健身房名称',
            type: 'gym-list',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'name',
            label: '姓名',
            type: 'wd',
            value: '',
            placeholder: '请输入姓名查询'
          },
          {
            key: 'identityCard',
            label: '身份证号',
            type: 'wd',
            value: '',
            placeholder: '请输入身份证号查询'
          },
          {
            key: 'orderStatus',
            label: '支付状态',
            type: 'pay-status',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'payTime',
            label: '付款时间',
            type: 'date-range',
            value: []
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
      gymOrderPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
          getGymOrderStatistics().then((res1) => {
            if (res1.data.code === REQ_OK) {
              this.statistics = {
                ...res1.data.data
              }
            }
          })
        }
      })['finally'](() => {
        done()
      })
    },
    handleClickRefund (item) {
      this.currId = item.orderCode
      this.refundVisible = true
    },
    handleClickDetail (item) {
      this.currId = item.id
      this.detailVisible = true
    },
    _delOrder (id) {
      delGymOrder([id]).then((res) => {
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
    Refund,
    OrderDetail
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
