<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="课程名称" prop="className">
              <el-input v-model="ruleForm.className" placeholder="请输入课程名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程时间段" prop="className">
              <template v-for="(hour, index) in ruleForm.gymClassDateList">
                <div :key="index" class="form-item-flex">
                  <el-select v-model="hour.week" placeholder="请选择星期" clearable style="width: 150px">
                    <el-option
                      v-for="item in weekTypeDictData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input
                    style="width:758px;margin-left: 10px"
                    v-model="hour.timeRange"
                    placeholder="请输入时间 如09:30至10:30"></el-input>
                  <template v-if="type !== 'detail'">
                    <i class="el-icon-circle-plus" @click="handleClickAdd" v-if="index === 0"></i>
                    <i class="el-icon-remove" @click="handleClickRemove(index)" v-else></i>
                  </template>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <quill-editor
                ref="myTextEditor"
                v-model="ruleForm.content"
                :options="editorOption"
                style="width: 918px"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 课程活动新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { editGymClass, addGymClass, getGymClass } from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
import { quillEditor } from 'vue-quill-editor'
import { dictDataType } from '@/api/common'
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
        className: '',
        content: '',
        gymClassDateList: [{
          timeRange: '',
          week: ''
        }]
      },
      rules: {
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
      weekTypeDictData: [],
      editorOption: {
        placeholder: '编辑文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote']
          ]
        }
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymClass(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
    this._deviceTypeDictData()
  },
  computed: {},
  methods: {
    _deviceTypeDictData () {
      dictDataType('week').then(({ data }) => {
        if (data.code === REQ_OK) {
          this.weekTypeDictData = data.data
        }
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymClass({ gymId: this.$route.params.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymClass({ gymId: this.$route.params.id, id: this.id, ...this.ruleForm }).then((res) => {
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
    handleClickAdd () {
      this.ruleForm.gymClassDateList.push({
        timeRange: '',
        week: ''
      })
    },
    handleClickRemove (index) {
      this.ruleForm.gymClassDateList.splice(index, 1)
    },
    onEditorReady (editor) { // 富文本准备时的事件
      editor.container.style.height = `${260}px`
      if (this.type === 'detail') {
        editor.enable(false)
      }
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
    quillEditor
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
