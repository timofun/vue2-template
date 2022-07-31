<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="时段名称" prop="name">
              <el-input v-model="ruleForm.name" :placeholder="phText"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择日期" prop="status">
              <el-date-picker
                v-model="ruleForm.dateRange"
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
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin: 40px 0 25px 0">
          <span style="display: inline-block;margin-right: 15px;font-size: 14px;font-weight: bold;color: #4d4d4d">
            可预约时间段</span>
          <el-tooltip class="item" effect="dark" content="最多添加7个时段" placement="bottom">
            <el-button type="primary" @click="handleClickAddTime">添加</el-button>
          </el-tooltip>
        </div>
        <template v-for="(item, index) in ruleForm.appointmentRange">
          <div :key="index">
            <fn-split-line v-if="index > 0"></fn-split-line>
            <div class="form-item-flex">
              <el-row>
                <el-col :span="24" v-if="holidayType === '1'">
                  <el-form-item label="星期" prop="sportName">
                    <el-checkbox-group v-model="item.week">
                      <el-checkbox label="Mon" :disabled="getWeekDisabled('Mon', index)">星期一</el-checkbox>
                      <el-checkbox label="Tue" :disabled="getWeekDisabled('Tue', index)">星期二</el-checkbox>
                      <el-checkbox label="Wed" :disabled="getWeekDisabled('Wed', index)">星期三</el-checkbox>
                      <el-checkbox label="Thu" :disabled="getWeekDisabled('Thu', index)">星期四</el-checkbox>
                      <el-checkbox label="Fri" :disabled="getWeekDisabled('Fri', index)">星期五</el-checkbox>
                      <el-checkbox label="Sat" :disabled="getWeekDisabled('Sat', index)">星期六</el-checkbox>
                      <el-checkbox label="Sun" :disabled="getWeekDisabled('Sun', index)">星期日</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="时段" prop="sportName" class="isCurd">
                    <template v-for="(itemTime, itemTimeIndex) in item.times">
                      <div :key="itemTimeIndex" class="curd-flex-item">
                        <el-time-picker
                          :key="itemTimeIndex"
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
                        <template v-if="type !== 'detail'">
                          <div class="btn" v-if="itemTimeIndex === 0" @click="handleAddTime(item.times)">
                            添加时段
                          </div>
                          <div class="btn del" v-else @click="handleDelTime(item.times, itemTimeIndex)">
                            删除时段
                          </div>
                        </template>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="119" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="是否限制人数" prop="isNumLimit">
                    <el-radio-group v-model="item.isNumLimit">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="row-text-align-right" v-if="item.isNumLimit">
                  <el-form-item label="输入人数" prop="numLimit">
                    <el-input v-model="item.numLimit" placeholder="请输入">
                      <span slot="suffix" style="margin-right: 20px">人</span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <i class="el-icon-remove" @click="handleClickRemove(index)" v-if="type !== 'detail' && index > 0"></i>
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
import { addGymAppointment, editGymAppointment, getGymAppointmentDetail } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
export default {
  name: 'CreateGYMAppointment',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    title: {
      type: String,
      default: '添加预约时段'
    },
    id: {
      type: String,
      default: ''
    },
    holidayType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        name: '',
        dateRange: [],
        appointmentRange: [
          {
            isNumLimit: false,
            week: [],
            numLimit: 0,
            times: [
              {
                timeRange: ['00:00', '23:59']
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
    if (this.type !== 'add') {
      const { data } = await getGymAppointmentDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
  },
  computed: {
    phText () {
      return this.holidayType === '1' ? '请输入名称 例如:淡季 旺季或夏季 冬季' : '请输入节假日名称 例如 春节'
    }
  },
  methods: {
    getWeekDisabled (week, index) {
      let disabled = false
      this.ruleForm.appointmentRange.map((item, i) => {
        if (i !== index && item.week.includes(week)) {
          disabled = true
        }
      })
      return disabled
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const otherParams = {
            type: this.holidayType, gymId: this.$route.params.id
          }
          if (this.type === 'add') {
            addGymAppointment({ ...otherParams, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymAppointment({ ...otherParams, id: this.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          }
        }
      })
    },
    handleClickAddTime () {
      if (this.ruleForm.appointmentRange.length > 6) return
      this.ruleForm.appointmentRange.push({
        isNumLimit: false,
        week: [],
        numLimit: 0,
        times: [
          {
            timeRange: ['00:00', '23:59']
          }
        ]
      })
    },
    handleClickRemove (index) {
      this.ruleForm.appointmentRange.splice(index, 1)
    },
    handleAddTime (times) {
      times.push(
        {
          timeRange: ['00:00', '23:59']
        }
      )
    },
    handleDelTime (times, index) {
      times.splice(index, 1)
    },
    onEditorChange ({ html }) {
      this.content = html
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:dialogVisible', this.visible)
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
