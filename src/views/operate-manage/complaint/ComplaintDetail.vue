<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" :show-save="false">
    <div>
      <el-form
        :disabled="true"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="健身房名称" prop="gymName">
              <el-input v-model="ruleForm.gymName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="gymContacts">
              <el-input v-model="ruleForm.gymContacts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="场馆联系方式" prop="gymPhone">
              <el-input v-model="ruleForm.gymPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="statusText">
              <el-input v-model="ruleForm.statusText"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="securityKey">
              <el-input v-model="ruleForm.custName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式 " prop="remark">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="投诉详情" prop="reply">
              <el-input
                type="textarea"
                :rows="5"
                v-model="ruleForm.content">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="投诉照片" prop="reply">
              <el-image
                v-for="(item, index) in ruleForm.images"
                :key="index"
                style="width: 200px; height: 138px"
                :src="item"
                :preview-src-list="ruleForm.images"
                :z-index="9999"
                fit="cover"></el-image>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 投诉详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { getGymComplaintDetail } from '@/api/operate-manage'
import { REQ_OK } from '@/common/js/code'
export default {
  name: 'ComplaintDetail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加运营商'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gymListData: [],
      visible: false,
      ruleForm: {
        gymContacts: '',
        gymPhone: '',
        gymName: '',
        custName: '',
        mobile: '',
        content: '',
        images: '',
        statusText: ''
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    this.getDetail()
  },
  mounted () {
  },
  computed: {},
  methods: {
    getDetail () {
      getGymComplaintDetail(this.id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.ruleForm = {
            ...res.data.data
          }
        }
      })
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
