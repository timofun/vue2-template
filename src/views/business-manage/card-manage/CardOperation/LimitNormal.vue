<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" width="1160px">
    <div>
      <el-form
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <div style="margin: 40px 0 25px 0">
          <el-tooltip class="item" effect="dark" content="最多添加7个时段" placement="bottom">
            <el-button type="primary" @click="handleClickAddTime">添加时段</el-button>
          </el-tooltip>
        </div>
        <template v-for="(item, index) in ruleForm.normalList">
          <div :key="index">
            <fn-split-line v-if="index > 0"></fn-split-line>
            <div class="form-item-flex">
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="星期"
                    :prop="'normalList.' + index + '.week'"
                    :rules="{
                      required: true, message: '星期不能为空', trigger: 'change'
                    }"
                  >
                    <el-checkbox-group v-model="item.week">
                      <el-checkbox label="Mon">星期一</el-checkbox>
                      <el-checkbox label="Tue">星期二</el-checkbox>
                      <el-checkbox label="Wed">星期三</el-checkbox>
                      <el-checkbox label="Thu">星期四</el-checkbox>
                      <el-checkbox label="Fri">星期五</el-checkbox>
                      <el-checkbox label="Sat">星期六</el-checkbox>
                      <el-checkbox label="Sun">星期日</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="时段" class="isCurd"
                    :prop="'normalList.' + index + '.times'"
                    :rules="{
                      validator: timeRangeValidate, trigger: 'change'
                    }"
                  >
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
              <el-tooltip class="item" effect="dark" content="删除整个时段" placement="bottom" v-if="index > 0">
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
 * @Description 预约时段-普通日期新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
export default {
  name: 'LimitNormal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '设置时间'
    },
    normalList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    const check = (rule, value, callback) => {
      if (value && value.length) {
        let isEmpty = false
        value.forEach(item => {
          if (!item.timeRange) isEmpty = true
        })
        if (isEmpty) {
          callback(new Error('时段值不能为空'))
        }
      }
      callback()
    }
    return {
      visible: false,
      timeRangeValidate: check,
      ruleForm: {
        normalList: [
          {
            week: ['Mon'],
            holidays: [],
            times: [
              {
                timeRange: ['08:00', '09:30']
              }
            ]
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.normalList.length) {
      this.ruleForm.normalList = JSON.parse(JSON.stringify(this.normalList))
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onSave () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('update:normalList', this.ruleForm.normalList)
          this.visible = false
        }
      })
    },
    handleClickAddTime () {
      this.ruleForm.normalList.push({
        week: ['Mon'],
        holidays: [],
        times: [
          {
            timeRange: ['08:00', '09:30']
          }
        ]
      })
    },
    handleClickRemove (index) {
      this.ruleForm.normalList.splice(index, 1)
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
    'ruleForm.normalList': {
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
