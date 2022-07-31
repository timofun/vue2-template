<template>
  <div class="fn-table-wrapper">
    <el-table
      ref="elTable"
      :data="tableData"
      height="100px"
      v-loading="loading"
      tooltip-effect="dark"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
      @sort-change="handleSortChange"
      :header-cell-style="{height: '48px', background: '#f6f7fa', fontSize: '13px', padding: '0', color: '#333333', textAlign: 'center'}"
      :row-style="{fontSize: '13px', color: '#666666'}"
      :row-key="rowKey"
      :indent="14"
      :class="{'el-table-tree': isTree}"
      :expand-row-keys="expands"
      :row-class-name="tableRowClassName"
      v-adaptive="{bottomOffset, watchResizeId}"
    >
      <slot></slot>
      <template slot="empty">
<!--        <jc-img-empty></jc-img-empty>-->
        <p style="font-size: 16px;line-height: 3">~ 暂无数据 ~</p>
      </template>
    </el-table>
    <div class="pagination-container" v-if="showPagination">
      <slot name="statistics">
        <div></div>
      </slot>
      <el-pagination
        :pager-count="pageInfo.count"
        :page-sizes="pageInfo.pageSizes"
        :total="total"
        :page-size="pageInfo.pageSize"
        :current-page.sync="pageInfo.pageNum"
        background
        :layout="pageInfo.layout"
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <fn-dialog :title="`已选择（${selectedNum}）`" v-if="selectedVisible" :visible.sync="selectedVisible" width="1000px" height="75vh" cancel-text="关闭" :show-save="false">
      <fn-table-base ref="multipleTable" :tableData="multipleSelection" height="calc(75vh - 60px)" :total="selectedNum" :show-count="false" :show-pagination="false" :init-get-data="false">
        <el-table-column
          label="操作"
          width="80"
          fixed="left"
          align="center"
          class-name="action-bar"
        >
          <template slot-scope="scope">
            <el-button type="text" class="operation-item" @click="handleMoveOut(scope.row)">移除</el-button>
          </template>
        </el-table-column>
        <slot name="dialog"></slot>
      </fn-table-base>
    </fn-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageData: {
      type: Object,
      default: () => {
        return {
          limit: 20,
          page: 1
        }
      }
    },
    total: {
      type: Number,
      default: 0
    },
    showCount: {
      type: Boolean,
      default: true
    },
    bottomOffset: {
      type: Number,
      default: 115
    },
    watchResizeId: {
      type: Array,
      default: () => {
        return []
      }
    },
    isTree: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: [String, Number],
      default: 'id'
    },
    isHighLight: {
      type: Boolean,
      default: false
    },
    initGetData: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageInfo: {
        count: 5,
        pageNum: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      loading: false,
      selectedNum: 0,
      multipleSelection: [],
      expandRowKeys: [],
      selectedVisible: false,
      expands: [],
      currentHeight: '',
      currentRow: ''
    }
  },
  created () {
    this.pageInfo = { ...this.pageInfo, ...this.pageData }
    if (this.initGetData) {
      this._getTableData()
    }
  },
  mounted () {
    // 手动改变如果table-tree内容高度超过table高度，就出现滚动条
    setTimeout(() => {
      if (this.isTree && document.getElementsByClassName('el-table__body') && document.getElementsByClassName('el-table__body').length) {
        if (this.isTree && document.getElementsByClassName('el-table__body')[0].offsetHeight > document.getElementsByClassName('el-table__body-wrapper')[0].offsetHeight) {
          document.getElementsByClassName('el-table__body-wrapper')[0].style.overflowY = 'scroll'
        }
      }
    }, 700)
  },
  computed: {
    currentPageInfo () {
      const { pageSize, pageNum } = this.pageInfo
      return { pageSize, pageNum }
    }
  },
  methods: {
    // 跳转到某一页
    handleCurrentChange (val) {
      this.pageInfo.pageNum = val
      this._getTableData()
      this.$emit('handleCurrentChange',
        {
          ...this.currentPageInfo
        },
        () => {
          this.loading = false
        }
      )
    },
    // 切换一页展示多少条
    handleSizeChange (val) {
      this.pageInfo.pageSize = val
      this.pageInfo.page = 1
      this._getTableData()
      this.$emit('handleSizeChange',
        {
          ...this.currentPageInfo
        },
        () => {
          this.loading = false
        }
      )
    },
    // 获取数据
    _getTableData () {
      this.loading = true
      this.$emit('getTableData',
        {
          ...this.currentPageInfo
        },
        () => {
          this.loading = false
        }
      )
    },
    // 刷新数据
    refresh () {
      this.pageInfo.pageNum = 1
      this._getTableData()
    },
    // 高亮某行
    tableRowClassName ({ row, rowIndex }) {
      if (!this.isHighLight) return ''
      if (row.isHighLight) {
        return 'warning-row'
      }
      return ''
    },
    // 模拟点击事件，默认展开
    expandAll () {
      const els = document.getElementsByClassName('el-table__expand-icon')
      for (let i = 0; i < els.length; i++) {
        els[i].click()
      }
    },
    // 点击当前行
    handleRowClick (row, column, event) {
      if (this.currentRow === JSON.stringify(row)) {
        this.currentRow = ''
        this.$refs.elTable.setCurrentRow()
        this.$emit('handleRowClick', { row: row, isCurrent: false })
      } else {
        this.currentRow = JSON.stringify(row)
        this.$emit('handleRowClick', { row: row, isCurrent: true })
      }
    },
    // 复选框回调
    handleSelectionChange (val) {
      this.selectedNum = val.length
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 排序
    handleSortChange (col) {
      this.$emit('sortChange', col)
    },
    // 展开回调
    expandChange (row, expandedRows) {
      if (expandedRows.length) {
        this.expands = []
        if (row) {
          this.expands.push(row.pd_no)
          this.$emit('expandChange', row)
        }
      } else {
        this.expands = []
      }
    },
    // 点击已选择
    handleClickSelected () {
      if (this.multipleSelection && !this.multipleSelection.length) {
        return this.$message.warning('暂未选择任何数据')
      }
      this.selectedVisible = true
    },
    // 切换某一行选中状态
    toggleRowSelection (row) {
      this.$refs.elTable.toggleRowSelection(row)
    },
    // 设置选中某一行
    setCurrentRow (row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    // 移出选中行
    handleMoveOut (row) {
      this.$refs.elTable.toggleRowSelection(row)
    },
    // 清空选中
    clearSelection () {
      this.$refs.elTable.clearSelection()
    }
  },
  watch: {
    tableData: {
      handler () {
        this.$nextTick(() => {
          if (this.isTree) {
            this.expandAll()
            this.$refs.elTable.doLayout()
          }
        })
      },
      deep: true
    }
  },
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fn-table-wrapper >>> {
    position relative

    .el-table {
      .warning-row {
        background: oldlace;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
    .el-select {
      width: auto
    }
    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
      padding 0 10px
    }
    .table-cell-highlight {
      color: $color;
      cursor: pointer;

      &:hover {
        cursor: pointer;
      }
    }
    .pagination-container {
      display flex
      justify-content space-between
      .el-pagination {
        padding: 20px 0 20px 0
      }
    }
    .action-bar {
      .operation-item {
        display inline-block
        padding 0
        margin 0
        font-weight 400
      }
      div + div {
        &::before {
          content: "";
          margin: 0 8px;
          display: inline-block;
          height: 0.9em;
          width: 1px;
          vertical-align: middle;
          position: relative;
          top: -0.06em;
          line-height: 1.5;
          background: #e8e8e8;
        }
      }
      button + button {
        &::before {
          content: "";
          margin: 0 8px;
          display: inline-block;
          height: 0.9em;
          width: 1px;
          vertical-align: middle;
          position: relative;
          top: -0.06em;
          line-height: 1.5;
          background: #e8e8e8;
        }
      }
      .el-dropdown::before {
        content: "";
        margin: 0 5px 0 8px;
        display: inline-block;
        height: 0.9em;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -0.06em;
        line-height: 1.5;
        background: #e8e8e8;
      }
    }
  }
  .statistics-container {
    display flex
    align-items center
    font-size 14px
    color #2C3B5B
    span {
      display inline-block
      margin-right 28px
    }
  }
</style>
