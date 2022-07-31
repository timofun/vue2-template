<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="110px">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="健身房名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入健身房名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运动项目" prop="sportId">
              <el-select v-model="ruleForm.sportId" placeholder="请选择" multiple clearable>
                <el-option
                  v-for="item in sportDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="区县" prop="county">
              <el-select v-model="ruleForm.county" placeholder="请选择" clearable @change="onChangeCounty">
                <el-option
                  v-for="item in areaDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="街道" prop="street">
              <el-select v-model="ruleForm.street" placeholder="请先选择区县" clearable>
                <el-option
                  v-for="item in addressDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input style="width: 918px" v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="地图类型" prop="mapType">
              <el-select v-model="ruleForm.mapType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in mapTypeDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-popover
                v-model="showMap"
                placement="right"
                width="400"
                trigger="manual"
              >
                <iframe id="mapPage" width="100%" height="600px" frameborder=0
                        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=QHPBZ-PNOK4-2GLU3-XYTX6-H4AWK-OLFRN&referer=myapp">
                </iframe>
                <el-button
                  slot="reference" type="primary" @click="showMap = !showMap">
                  地图坐标拾取</el-button>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="ruleForm.gis.longitude"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="ruleForm.gis.latitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="营业时间" prop="hours">
              <template v-for="(hour, index) in ruleForm.hours">
                <div :key="index" class="form-item-flex">
                  <el-input class="hours-item-input"
                            style="width: 918px"
                            v-model="ruleForm.hours[index]"
                            placeholder="请输入营业时间：如工作日09:30至17:30"
                  ></el-input>
                  <template v-if="type !== 'detail'">
                    <el-tooltip class="item" effect="dark" content="时间最多添加5条" placement="bottom" v-if="index === 0">
                      <i class="el-icon-circle-plus" @click="handleClickAddHour"></i>
                    </el-tooltip>
                    <i class="el-icon-remove" @click="handleClickRemoveHour(index)" v-else></i>
                  </template>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contacts">
              <el-input v-model="ruleForm.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" maxLength="11" v-enter-number></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="经营模式" prop="businessModel">
              <el-select v-model="ruleForm.businessModel" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessModelDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健身房面积" prop="area">
              <el-input v-model="ruleForm.area" v-enter-number></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="缩略图" prop="name">
              <fn-img-upload
                :url.sync="ruleForm.thumbnail"
                :image-max-num="1" :multiple="false"
                tips-text="缩略图"
              >
              </fn-img-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="banner" prop="name">
              <fn-img-upload :url.sync="ruleForm.banner" :image-max-num="9" multiple></fn-img-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="场馆介绍" prop="description">
              <quill-editor
                v-model="ruleForm.description"
                :options="editorOption"
                style="width: 918px"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="健身房免责声明" prop="disclaimer">
              <quill-editor
                ref="myTextEditor"
                v-model="ruleForm.disclaimer"
                :options="editorOption"
                style="width: 918px"
                @ready="onEditorReady1($event)"
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
 * @Description 健身房新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { quillEditor } from 'vue-quill-editor'
import { addGym, getGymDetail, gymSportDict, editGym } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import { areaDictDataMixin } from '@/common/mixins/dict'
import { dictDataType } from '@/api/common'
import { dialogMutation } from '@/common/js/observeable'
export default {
  name: 'CreateGYM',
  mixins: [areaDictDataMixin],
  props: {
    gymVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    title: {
      type: String,
      default: '健身房添加'
    },
    gymId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        name: '',
        sportId: [],
        county: '',
        street: '',
        address: '',
        mapType: '',
        gis: {
          latitude: '',
          longitude: ''
        },
        hours: [''],
        contacts: '',
        phone: '',
        businessModel: '',
        area: '',
        description: '',
        banner: [],
        thumbnail: '',
        disclaimer: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      showMap: false,
      editorOption: {
        placeholder: '编辑内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote']
          ]
        }
      },
      sportDictData: [],
      businessModelDictData: [],
      mapTypeDictData: []
    }
  },
  async created () {
    this.visible = this.gymVisible
    dialogMutation.changeState(true)
  },
  mounted () {
    this._gymSportDict()
    this._businessDictData()
    this._MapTypeDictData()
    window.addEventListener('message', (event) => {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      const loc = event.data
      if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        this.ruleForm.gis.latitude = loc.latlng.lat
        this.ruleForm.gis.longitude = loc.latlng.lng
        this.showMap = false
      }
    }, false)
  },
  computed: {},
  methods: {
    handleClickAddHour () {
      if (this.ruleForm.hours.length === 5) {
        return
      }
      this.ruleForm.hours.push('')
    },
    handleClickRemoveHour (index) {
      this.ruleForm.hours.splice(index, 1)
    },
    onEditorReady1 (editor) {
      editor.container.style.height = `${260}px`
    },
    async onEditorReady (editor) { // 富文本准备时的事件
      editor.container.style.height = `${260}px`
      editor.enable(false)
      if (this.type !== 'add') {
        const { data } = await getGymDetail(this.gymId)
        Object.keys(this.ruleForm).forEach(item => {
          this.ruleForm[item] = data.data[item]
        })
      }
      if (this.type === 'detail') {
        editor.enable(false)
      } else {
        this.$nextTick(() => {
          editor.enable(true)
          editor.blur()
        })
      }
      dialogMutation.changeState(false)
    },
    _gymSportDict () {
      gymSportDict().then(({ data }) => {
        if (data.code === REQ_OK) {
          this.sportDictData = data.data
        }
      })
    },
    _businessDictData () {
      dictDataType('business_model').then(({ data }) => {
        if (data.code === REQ_OK) {
          this.businessModelDictData = data.data
        }
      })
    },
    _MapTypeDictData () {
      dictDataType('map_type').then(({ data }) => {
        if (data.code === REQ_OK) {
          this.mapTypeDictData = data.data
        }
      })
    },
    onChangeCounty (value) {
      this.getAddressDict(value)
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'edit') {
            editGym({ id: this.gymId, ...this.ruleForm }).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else {
            addGym(this.ruleForm).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          }
        }
      })
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:gymVisible', this.visible)
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
.hours-item-input {
  & + .hours-item-input {
    margin-top 10px
  }
}
</style>
