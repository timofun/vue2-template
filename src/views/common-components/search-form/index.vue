<template>
  <div class="search-form-wrapper" id="search-form-wrapper">
    <el-form :model="searchForm" ref="searchForm" :label-width="labelWidth" label-position="right">
      <div :style="{height: isMore ? 'auto' : '36px'}" class="search-content">
        <template v-for="(item, index) in searchForm.componentsNodeArray">
          <template v-if="index < getCurrentShowItemLength()">
            <el-form-item :label="item.label" :prop="'componentsNodeArray.' + index + '.value'" :key="item.key">
              <component
                :is="componentsMap(item.type)"
                :value.sync="item.value"
                :county-id="countyId"
                :placeholder="item.placeholder"
                @on-change-county="onChangeCounty"
              ></component>
            </el-form-item>
          </template>
        </template>
        <div class='el-form-item' style="margin-left: auto">
          <div style="display: flex; justify-content: flex-end;width: 100%">
            <div>
              <el-button
                style="padding: 7px 15px"
                class="mg-r-10" type="primary" @click="handleSearch" icon="el-icon-search">搜索</el-button>
            </div>
            <div>
              <el-button
                style="padding: 7px 15px;background-color: #0c908f;color: #ffffff"
                @click="handleReset" icon="el-icon-refresh">重置</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import DateRange from './date-range'
import Keyword from './Keyword'
import GYMList from './gym-list'
import DateMonth from './date-month'
import CardType from './card-type'
import CardStatus from './card-status'
import CardTimeType from './card-time-type'
import BusinessModel from './business-model'
import County from './county'
import Street from './street'
import PayStatus from './pay-status'
import StreetCascader from './street-cascader'
/**
 * @Author QINGYU FAN
 * @Version
 * @Description 报表搜索form组件
 * @date 2021/4/17 15:03
 */
export default {
  props: {
    searchForm: {
      type: Object,
      default: () => {
        return {
          componentsNodeArray: []
        }
      }
    },
    labelWidth: {
      type: String,
      default: '90px'
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      isMore: true,
      countyId: '',
      catchForm: []
    }
  },
  created () {
    this.catchForm = JSON.parse(JSON.stringify(this.searchForm.componentsNodeArray))
  },
  mounted () {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
    }
  },
  methods: {
    onChangeCounty (value) {
      this.countyId = value
    },
    // 搜索
    handleSearch () {
      this.$emit('search', this.searchForm.componentsNodeArray)
    },
    // 重置
    handleReset () {
      this.$refs.searchForm.resetFields()
      this.searchForm.componentsNodeArray.forEach(item => {
        this.catchForm.forEach(i => {
          if (item.type === i.type) {
            item.value = i.value
          }
        })
      })
      this.$emit('reset')
    },
    // 获取当前展示搜索条件长度
    getCurrentShowItemLength () {
      if (!this.isMore) {
        let currentShowItemLength
        const width = this.screenWidth
        if (width > 1600) {
          currentShowItemLength = 3
        } else if (width > 1060) {
          currentShowItemLength = 2
        } else if (width > 768) {
          currentShowItemLength = 1
        } else {
          currentShowItemLength = 0
        }
        return currentShowItemLength
      }
      return this.searchForm.componentsNodeArray.length
    },
    // 搜索控件map
    componentsMap (type) {
      switch (type) {
        case 'date-range':
          return DateRange
        case 'date-month':
          return DateMonth
        case 'wd':
          return Keyword
        case 'gym-list':
          return GYMList
        case 'card-type':
          return CardType
        case 'card-status':
          return CardStatus
        case 'card-time-type':
          return CardTimeType
        case 'business-model':
          return BusinessModel
        case 'county':
          return County
        case 'street':
          return Street
        case 'street-cascader':
          return StreetCascader
        case 'pay-status':
          return PayStatus
      }
    }
  },
  components: {
    PayStatus,
    DateRange,
    Keyword,
    GYMList,
    CardType,
    CardStatus,
    CardTimeType,
    BusinessModel,
    County,
    Street,
    StreetCascader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search-form-wrapper >>>
    .search-content
      display: flex
      flex-flow: row wrap;
      justify-content flex-end
      > .el-form-item {
        padding-right 15px
        box-sizing border-box
        .el-select, .el-input {
          width 100%
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
          width 100%
        }
      }
  @media (min-width: 768px)
    .el-form-item {
      flex: 0 0 50%;
      max-width: 50%;
    }

  @media (min-width: 1060px)
    .el-form-item {
      flex: 0 0 33.33333333%;
      max-width: 33.33333333%;
    }

  @media (min-width: 1600px)
    .el-form-item {
      display: block;
      flex: 0 0 25%;
      max-width: 25%;
    }
</style>
