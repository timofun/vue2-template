/**
 * @Author QINGYU FAN
 * @Version
 * @Description 混入
 * @date 2021/4/17 11:37
 */

// 表格分页
export const tablePaginationMixin = {
  data () {
    return {
      query: {},
      paginationObj: {
        pageNum: 1,
        pageSize: 15
      },
      total: 0,
      tableData: [],
      tableSelectedList: []
    }
  },
  methods: {
    // 复选框回调
    handleSelectionChange (val) {
      this.tableSelectedList = val
    },
    // 搜索
    handleSearch (params) {
      params.forEach(item => {
        this.query[item.key] = item.value
      })
      this.$refs.tableRef.refresh()
    },
    // 重置
    handleReset () {
      this.searchForm.componentsNodeArray.forEach(item => {
        this.query[item.key] = item.value
      })
      this.$refs.tableRef.refresh()
    }
  }
}
