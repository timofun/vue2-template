<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave">
    <div>
      <el-form
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div style="margin: 40px 0 25px 0">
          <el-button type="primary" @click="handleClickAddTime">添加时段</el-button>
        </div>
        <template v-for="(item, index) in ruleForm.holidayList">
          <div :key="index">
            <fn-split-line v-if="index > 0"></fn-split-line>
            <div class="form-item-flex">
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="日期"
                    :prop="'holidayList.' + index + '.holidays'"
                    :rules="{
                      validator: holidaysValidate, trigger: 'change'
                    }"
                    class="isCurd">
                    <template v-for="(itemTime, itemTimeIndex) in item.holidays">
                      <div :key="itemTimeIndex" class="curd-flex-item">
                        <el-date-picker
                          v-model="itemTime.dateRange"
                          :editable="false"
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="年 / 月 / 日 "
                          end-placeholder="年 / 月 / 日 "
                        >
                        </el-date-picker>
                        <div class="btn" v-if="itemTimeIndex === 0" @click="handleAddDate(item.holidays)">
                          添加日期
                        </div>
                        <div class="btn del" v-else @click="handleDelDate(item.holidays, itemTimeIndex)">
                          删除日期
                        </div>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="时段"
                                :prop="'holidayList.' + index + '.times'"
                                :rules="{
                                  validator: timesValidate, trigger: 'change'
                                }"
                                class="isCurd">
                    <template v-for="(itemTime, itemTimeIndex) in item.times">
                      <div :key="itemTimeIndex" class="curd-flex-item">
                        <el-time-picker
                          :arrow-control="false"
                          is-range
                          format="HH:mm"
                          value-format="HH:mm"
                          v-model="itemTime.timeRange"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
                        </el-time-picker>
                        <div class="btn" v-if="itemTimeIndex === 0" @click="handleAddTime(item.times)">
                          添加时段
                        </div>
                        <div class="btn del" v-else @click="handleDelTime(item.times, itemTimeIndex)">
                          删除时段
                        </div>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-tooltip class="item" effect="dark" content="删除整个时段" placement="bottom">
                <i class="el-icon-remove" @click="handleClickRemove(index)"></i>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 预约时段-法定节日新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
export default {
  name: 'LimitHolidays',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '设置时间'
    },
    holidayList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    const checkHolidays = (rule, value, callback) => {
      if (value && value.length) {
        let isEmpty = false
        value.forEach(item => {
          if (!item.dateRange || !item.dateRange.length) isEmpty = true
        })
        if (isEmpty) {
          callback(new Error('日期值不能为空'))
        }
      }
      callback()
    }
    const checkTimes = (rule, value, callback) => {
      if (value && value.length) {
        let isEmpty = false
        value.forEach(item => {
          if (!item.timeRange || !item.timeRange.length) isEmpty = true
        })
        if (isEmpty) {
          callback(new Error('日期值不能为空'))
        }
      }
      callback()
    }
    return {
      visible: false,
      holidaysValidate: checkHolidays,
      timesValidate: checkTimes,
      ruleForm: {
        holidayList: [
          {
            week: [],
            holidays: [{
              dateRange: []
            }],
            times: [
              {
                timeRange: ['08:00', '09:30']
              }
            ]
          }
        ]
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.holidayList.length) {
      this.ruleForm.holidayList = JSON.parse(JSON.stringify(this.holidayList))
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSave () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('update:holidayList', this.ruleForm.holidayList)
          this.visible = false
        }
      })
    },
    handleClickAddTime () {
      this.ruleForm.holidayList.push({
        week: [],
        holidays: [{
          dateRange: []
        }],
        times: [
          {
            timeRange: ['08:00', '09:30']
          }
        ]
      })
    },
    handleClickRemove (index) {
      this.ruleForm.holidayList.splice(index, 1)
    },
    handleAddTime (times) {
      times.push(
        {
          timeRange: ['08:00', '09:30']
        }
      )
    },
    handleDelTime (times, index) {
      times.splice(index, 1)
    },
    handleAddDate (dates) {
      dates.push(
        {
          dateRange: []
        }
      )
    },
    handleDelDate (dates, index) {
      dates.splice(index, 1)
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:dialogVisible', this.visible)
        }
      }
    },
    'ruleForm.holidayList': {
      handler () {
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.validate()
        }
      },
      deep: true
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
