<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="区域名称" prop="areaName">
              <el-input v-model="ruleForm.areaName" placeholder="请输入区域名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积" prop="area">
              <el-input v-model="ruleForm.area" placeholder="请输入占地面积"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin: 40px 0 25px 0">
          <span style="display: inline-block;margin-right: 36px;font-size: 14px;font-weight: bold;color: #4d4d4d">
            设备添加</span>
          <el-button type="primary" @click="handleClickAdd">添加</el-button>
        </div>
        <template v-for="(item, index) in ruleForm.devices">
          <div :key="index">
            <fn-split-line v-if="index > 0"></fn-split-line>
            <div class="form-item-flex">
              <el-row :gutter="119" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="设备名称" prop="deviceName">
                    <el-input v-model="item.deviceName" placeholder="请输入设备名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备数量" prop="deviceCaptcha">
                    <el-input-number
                      placeholder="请输入设备数量"
                      :controls="false"
                      v-model="item.deviceNum" controls-position="right" :min="1"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="119" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="设备单位" prop="deviceUnit">
                    <el-input v-model="item.deviceUnit" placeholder="请输入设备单位"></el-input>
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
 * @Description 硬件设备新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import {
  getGymRegion, addGymRegion, editGymRegion
} from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
export default {
  name: 'CreateGYMSport',
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
      default: '添加'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        area: '',
        areaName: '',
        devices: [{
          deviceName: '',
          deviceNum: 1,
          deviceUnit: ''
        }]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      deviceTypeDictData: []
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymRegion(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleClickAdd () {
      this.ruleForm.devices.push({
        deviceName: '',
        deviceNum: 1,
        deviceUnit: ''
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymRegion({ gymId: this.$route.params.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymRegion({ gymId: this.$route.params.id, id: this.id, ...this.ruleForm }).then((res) => {
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
    handleClickRemove (index) {
      this.ruleForm.devices.splice(index, 1)
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
