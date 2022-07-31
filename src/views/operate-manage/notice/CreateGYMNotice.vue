<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="健身房名称" prop="gymId">
              <gym-list-dict :value.sync="ruleForm.gymId"></gym-list-dict>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间" prop="publishTime">
              <el-date-picker
                v-model="ruleForm.publishTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择发布时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告标题" prop="title">
              <el-input style="width: 918px" v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告内容" prop="content">
              <quill-editor
                ref="myTextEditor"
                v-model="ruleForm.content"
                :options="editorOption"
                style="width: 918px"
                @change="onEditorChange"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告状态" prop="content">
              <el-select v-model="ruleForm.publishStatus" placeholder="请选择" clearable>
                <el-option label="已发布" value="2"></el-option>
                <el-option label="未发布" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 公告新增/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { quillEditor } from 'vue-quill-editor'
import { addGymNotice, getGymNoticeDetail } from '@/api/operate-manage'
import { REQ_OK } from 'common/js/code'
import { gymDict } from '@/api/gym-manage'
import GymListDict from 'views/common-components/search-form/gym-list'
export default {
  name: 'CreateGYMNotice',
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
        gymId: '',
        title: '',
        publishTime: '',
        content: '',
        publishStatus: '1'
      },
      editorOption: {
        placeholder: '编辑文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote']
          ]
        }
      },
      gymDataSource: [],
      rules: {
        gymId: [
          { required: true, message: '请选择健身房名称', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择发布时间', trigger: 'change' }
        ]
      }
    }
  },
  async created () {
    this._gymDict()
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymNoticeDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    _gymDict () {
      gymDict().then((res) => {
        if (res.data.code === REQ_OK) {
          this.gymDataSource = res.data.data
        }
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymNotice(this.ruleForm).then((res) => {
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
    onEditorChange ({ html }) {
      this.content = html
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
    GymListDict,
    quillEditor
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
