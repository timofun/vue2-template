<template>
  <div class="gym-card-operation-wrapper pd-30">
    <fn-bread-crumb :is-button="pageName !== 'CardDetail'" @save="onSave"/>
    <fn-page-title :title="$route.meta.title"/>
    <div>
      <el-form
        :disabled="pageName === 'CardDetail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8" class="row-text-align-left">
            <el-form-item label="健身房" prop="gymId">
              <g-y-m-list :value.sync="ruleForm.gymId" @on-change-gym="onChangeGYM"></g-y-m-list>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="category-item">
          01 基本信息
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="会员卡名称" prop="cardName">
              <el-input v-model="ruleForm.cardName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="cardType">
              <card-type :value.sync="ruleForm.cardType"></card-type>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营商" prop="servicerId">
              <el-select v-model="ruleForm.servicerId" clearable>
                <el-option
                  v-for="item in gymServicerDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="售价" prop="price">
              <el-input v-model="ruleForm.price" clearable v-enter-number-range="{ min: 0, max: 99999, precision: 2}">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="category-item">
          02 核销配置
        </div>
        <el-row :gutter="20" v-if="ruleForm.cardType === '2'">
          <el-col :span="8">
            <el-form-item label="包含次数" prop="useTimes">
              <el-input v-model="ruleForm.useTimes" clearable v-enter-number-range="{ min: 0, max: 99999, precision: 0}">
                <span slot="suffix">次</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="有效期"
              prop="isValidityRange"
              :rules="{
                validator: validityRangeValidate
              }"
            >
              <el-radio-group v-model="ruleForm.isValidityRange">
                <el-radio :label="true">
                  <span class="radio-title">有效期</span>
                  <el-date-picker
                    v-model="ruleForm.validityRange"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-radio>
                <el-radio :label="false">
                  <span class="radio-title">购买后</span>
                  <el-input style="width: 200px" v-model="ruleForm.validityAfter"
                            v-enter-number-range="{ min: 0, max: 99999, precision: 0}">
                    <span slot="suffix">天</span>
                  </el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="单日限次" prop="isDayLimit">
              <el-radio-group v-model="ruleForm.isDayLimit">
                <el-radio :label="false">
                  <span class="radio-title">不限</span>
                  <el-date-picker
                    style="visibility: hidden"
                    v-model="ruleForm.validityRange"
                    type="daterange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-radio>
                <el-radio :label="true">
                  <span class="radio-title">限制</span>
                  <el-input
                    style="width: 200px" v-model="ruleForm.dayLimit"
                    v-enter-number-range="{ min: 0, max: 9999999, precision: 0}">
                    <span slot="suffix">次</span>
                  </el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="category-item">
          03 购买限制
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="发售张数" prop="isSaleLimit">
              <el-radio-group v-model="ruleForm.isSaleLimit">
                <el-radio :label="false">
                  <span class="radio-title">不限</span>
                  <el-date-picker
                    style="visibility: hidden"
                    v-model="ruleForm.validityRange"
                    type="daterange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-radio>
                <el-radio :label="true">
                  <span class="radio-title">限制</span>
                  <el-input
                    style="width: 200px" v-model="ruleForm.saleLimit"
                            v-enter-number-range="{ min: 0, max: 99999, precision: 0}">
                    <span slot="suffix">张</span>
                  </el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="限制购买次数" prop="isBuyLimit">
              <el-radio-group v-model="ruleForm.isBuyLimit">
                <el-radio :label="false">
                  <span class="radio-title">不限</span>
                  <el-date-picker
                    style="visibility: hidden"
                    v-model="ruleForm.validityRange"
                    type="daterange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-radio>
                <el-radio :label="true">
                  <span class="radio-title">限制</span>
                  <el-input
                    style="width: 200px" v-model="ruleForm.buyLimit"
                            v-enter-number-range="{ min: 0, max: 99999, precision: 0}">
                    <span slot="suffix">次</span>
                  </el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="category-item">
          04 可使用时间
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="使用时间"
              prop="limitTime"
              :rules="{
                validator: normalListValidate
              }"
            >
              <el-radio-group v-model="ruleForm.limitTime">
                <el-radio :label="false">
                  <span class="radio-title">不限</span>
                </el-radio>
                <el-radio :label="true">
                  <span class="mg-r-10">限制时间</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="ruleForm.limitTime">
          <el-col :span="24" class="no-float">
            <el-form-item
              label="日常时间"
              prop="normalList"
            >
              <el-button type="primary" @click="normalVisible = true">设置时间</el-button>
            </el-form-item>
          </el-col>
          <div class="normalList-container">
            <div class="normalList-header">
              <span class="header-left">星期</span>
              <span class="header-right">时段</span>
            </div>
            <ul class="normalList-list">
              <li class="normalList-item" v-for="(item, index) in ruleForm.normalList" :key="index">
                <div class="week-list">
                  <span v-for="weekItem in item.week" :key="weekItem" class="week-item">
                    {{weekItem | formatWeek }}
                  </span>
                </div>
                <div class="time-list">
                  <span v-for="(time, timeIndex) in item.times" :key="timeIndex" class="time-item">
                    {{time.timeRange ? time.timeRange.join('-') : ''}}
                  </span>
                </div>
                <div class="time-remove">
                  <i class="el-icon-remove" @click="handleClickRemove('normalList', index)" v-if="pageName !== 'detail'"></i>
                </div>
              </li>
            </ul>
          </div>
        </el-row>
        <el-row :gutter="20" v-if="ruleForm.limitTime">
          <el-col :span="24">
            <el-form-item label="特殊节日时间" prop="holidayList">
              <el-button type="primary" @click="holidaysVisible = true">设置时间</el-button>
            </el-form-item>
          </el-col>
          <div class="normalList-container">
            <div class="normalList-header">
              <span class="header-left">时间</span>
              <span class="header-right">时段</span>
            </div>
            <ul class="normalList-list">
              <li class="normalList-item" v-for="(item, index) in ruleForm.holidayList" :key="index">
                <div class="week-list">
                  <span v-for="(holiday, holidayIndex) in item.holidays" :key="holidayIndex" class="week-item">
                    {{holiday.dateRange ? holiday.dateRange.join('~') : ''}}
                  </span>
                </div>
                <div class="time-list">
                  <span  v-for="(time, timeIndex) in item.times" :key="timeIndex" class="time-item">
                    {{time.timeRange ? time.timeRange.join('-') : ''}}
                  </span>
                </div>
                <div class="time-remove">
                  <i class="el-icon-remove" @click="handleClickRemove('holidayList', index)" v-if="pageName !== 'detail'"></i>
                </div>
              </li>
            </ul>
          </div>
        </el-row>
        <div class="category-item">
          05 使用须知
        </div>
        <quill-editor
          ref="myTextEditor"
          v-model="ruleForm.instructions"
          :options="editorOption"
          style="width: 918px"
          @ready="onEditorReady($event)"
        ></quill-editor>
      </el-form>
    </div>
    <limit-holidays v-if="holidaysVisible" :dialog-visible.sync="holidaysVisible" :holidayList.sync="ruleForm.holidayList"/>
    <limit-normal v-if="normalVisible" :dialog-visible.sync="normalVisible" :normalList.sync="ruleForm.normalList"/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 会员卡操作
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { quillEditor } from 'vue-quill-editor'
import { tablePaginationMixin } from '@/common/mixins/table'
import { gymServicerDict } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import GYMList from '@/views/common-components/search-form/gym-list'
import CardType from '@/views/common-components/search-form/card-type'
import { addGymCard, editGymCard, getGymCardDetail } from '@/api/business-manage'
import LimitHolidays from 'views/business-manage/card-manage/CardOperation/LimitHolidays'
import LimitNormal from 'views/business-manage/card-manage/CardOperation/LimitNormal'
export default {
  name: 'GymAC',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    const checkNormalList = (rule, value, callback) => {
      if (value && !this.ruleForm.normalList.length && !this.ruleForm.holidayList.length) {
        callback(new Error('日常时间和特殊节日时间不能同时为空'))
      }
      callback()
    }
    const checkValidityRange = (rule, value, callback) => {
      if (value && ((this.ruleForm.validityRange && !this.ruleForm.validityRange.length) || !this.ruleForm.validityRange)) {
        callback(new Error('有效期不能为空'))
      }
      callback()
    }
    return {
      normalListValidate: checkNormalList,
      validityRangeValidate: checkValidityRange,
      ruleForm: {
        gymId: '',
        cardName: '',
        cardType: '',
        servicerId: '',
        price: '',
        isValidityRange: true,
        validityRange: [],
        validityAfter: 0,
        isDayLimit: false,
        dayLimit: 0,
        isSaleLimit: false,
        saleLimit: 0,
        isBuyLimit: false,
        buyLimit: 0,
        limitTime: false,
        instructions: '',
        useTimes: 0,
        normalList: [],
        holidayList: []
      },
      rules: {
        gymId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cardName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        servicerId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      normalVisible: false,
      holidaysVisible: false,
      editorOption: {
        placeholder: '编辑文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote']
          ]
        }
      },
      gymServicerDictData: [],
      cardTypeDictData: [],
      pageName: '',
      id: ''
    }
  },
  created () {
    const { name, params } = this.$route
    this.pageName = name
    if (params.id) {
      this.id = params.id
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    onChangeGYM (value) {
      this._gymServicerDict(value)
    },
    _gymServicerDict (gymId) {
      gymServicerDict(gymId).then((res) => {
        if (res.data.code === REQ_OK) {
          this.gymServicerDictData = res.data.data
        }
      })
    },
    handleClickAdd () {

    },
    onSave () {
      this.$refs.ruleForm.validate(value => {
        if (value) {
          if (!this.ruleForm.limitTime) {
            this.ruleForm.holidayList = []
            this.ruleForm.normalList = []
          }
          if (this.pageName === 'CardAdd') {
            addGymCard(this.ruleForm).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$bus.$emit('cardListRefresh')
                this.$router.push({
                  path: '/business/card'
                })
              }
            })
          } else {
            editGymCard(this.ruleForm).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$bus.$emit('cardListRefresh')
                this.$router.push({
                  path: '/business/card'
                })
              }
            })
          }
        }
      })
    },
    handleClickRemove (type, index) {
      this.ruleForm[type].splice(index, 1)
    },
    async onEditorReady (editor) { // 富文本准备时的事件
      editor.container.style.height = `${260}px`
      editor.enable(false)
      if (this.pageName !== 'CardAdd') {
        const { data } = await getGymCardDetail(this.id)
        this.ruleForm = {
          ...data.data
        }
      }
      if (this.type === 'detail') {
        editor.enable(false)
      } else {
        this.$nextTick(() => {
          editor.enable(true)
          editor.blur()
        })
      }
    }
  },
  watch: {
    'ruleForm.isValidityRange': {
      handler (val) {
        if (val) {
          this.ruleForm.validityAfter = 0
        } else {
          this.ruleForm.validityRange = []
        }
      },
      deep: true
    },
    'ruleForm.isDayLimit': {
      handler (val) {
        if (!val) {
          this.ruleForm.dayLimit = 0
        }
      },
      deep: true
    },
    'ruleForm.isSaleLimit': {
      handler (val) {
        if (!val) {
          this.ruleForm.saleLimit = 0
        }
      },
      deep: true
    },
    'ruleForm.isBuyLimit': {
      handler (val) {
        if (!val) {
          this.ruleForm.buyLimit = 0
        }
      },
      deep: true
    },
    'ruleForm.holidayList': {
      handler (val) {
        if (this.pageName !== 'CardDetail' && this.ruleForm.limitTime && val.length) {
          this.$nextTick(() => {
            this.$refs.ruleForm.validateField('limitTime')
          })
        }
      },
      deep: true
    },
    'ruleForm.normalList': {
      handler (val) {
        if (this.pageName !== 'CardDetail' && this.ruleForm.limitTime && val.length) {
          this.$nextTick(() => {
            this.$refs.ruleForm.validateField('limitTime')
          })
        }
      },
      deep: true
    }
  },
  components: {
    LimitNormal,
    LimitHolidays,
    GYMList,
    quillEditor,
    CardType
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.gym-card-operation-wrapper {
  position absolute;
  top: 0;
  left 0;
  right 0;
  bottom 0;
  overflow-y auto
  background-color $color-w
  z-index 10
  .category-item {
    padding-bottom 12px
    margin-bottom 25px
    font-size 14px
    font-weight bold
    color $color-text-title
    border-bottom 1px solid $color-border-split
  }
  .radio-title {
    display: inline-block;
    margin-right 5px
    width: 45px;
    text-align-last: justify;
    text-align: justify;
    text-justify: distribute-all-lines;
  }
  .normalList-container {
    margin-left 10px
    margin-bottom 40px
    .normalList-header {
      display flex
      align-items center
      padding 0 25px
      height 48px
      font-size 14px
      font-weight bold;
      color #1a1a1a
      background-color #F6F7FA
      box-sizing border-box
      .header-left {
        flex 2
      }
      .header-right {
        flex 3
      }
    }
    .normalList-list {
      .normalList-item {
        display flex
        align-items center
        padding 0 25px
        height 70px
        font-size 14px
        color #4d4d4d
        border-bottom 1px solid #f5f5f5
        .week-list {
          flex 2
          .week-item + .week-item{
            margin-left 20px
          }
        }
        .time-list {
          display flex
          flex-wrap wrap
          flex 3
          .time-item {
            flex 0 0 140px
          }
        }
      }
    }
  }
  .no-float {
    float none
  }
  .el-icon-remove {
    font-size 16px
    color red
    cursor pointer
  }
}
</style>
