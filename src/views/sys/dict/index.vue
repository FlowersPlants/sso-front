<template>
  <div id="user-container">
    <div style="margin-bottom:20px;">
      <el-select style="width: 160px"
        v-model="search.type"
        @change="handleSearch"
        placeholder="请选择">
        <el-option v-for="(type, index) in typeList"
          :key="index"
          :label="type"
          :value="type">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left:10px;" @click="resetSearch()">刷新</el-button>
      <el-button type="success" style="margin-left:10px;" @click="openCreate()">新增</el-button>
    </div>

    <el-table :data="dictList" border>
      <el-table-column prop="type" label="字典类别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="value" label="字典值"></el-table-column>
      <el-table-column prop="label" label="标签名称"></el-table-column>
      <el-table-column prop="sort" label="排序号"></el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="props">
          <el-button size="small" type="primary" title="编辑" @click="openEdit(props.row)" icon="el-icon-edit" circle></el-button>
          <el-button size="small" type="danger" title="删除" @click="handleDelete(props.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :current-page="pagination.current"
      @current-change="currentChange">
    </el-pagination>

    <el-dialog :title="dialogTitle(dialogStatus)" :visible.sync="isDialogVisible" width="60%">
      <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
        <el-form-item prop="type" label="类别">
          <el-input ref="type" v-model="form.type" placeholder="类别"></el-input>
        </el-form-item>
        <el-form-item prop="value" label="值">
          <el-input v-model="form.value" placeholder="值"></el-input>
        </el-form-item>
        <el-form-item prop="label" label="标签">
          <el-input v-model="form.label" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="排序号">
          <el-input v-model="form.sort" placeholder="排序号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="el-dialog-footer">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dict } from '@/utils/sys/dict'
import { findPage, insert, update, deleteById } from './api'
export default {
  data () {
    return {
      search: {
        type: undefined
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      dialogStatus: 'view',
      isDialogVisible: false,
      rules: {
        type: [
          { required: true, message: '请输入字典类别', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ]
      }, // 表单校验规则
      form: {
        id: undefined,
        type: undefined,
        label: undefined,
        value: undefined,
        sort: 10 // 排序号默认为10
      },
      dictList: [],
      typeList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.loadDictList()
      this.loadTypeList()
    },
    loadDictList () {
      findPage({
        type: this.search.type,
        current: this.pagination.current,
        pageSize: this.pagination.pageSize
      }).then(({data}) => {
        this.dictList = data.records
        this.pagination.current = Number(data.current)
        this.pagination.pageSize = Number(data.size)
        this.pagination.total = Number(data.total)
      })
    },
    loadTypeList () {
      const list = dict.getDictList()
      // es6 数组去重Array.from(new Set(array))
      this.typeList = Array.from(new Set(list.map(e => e.type)))
    },

    openCreate () {
      this.isDialogVisible = true
      this.dialogStatus = 'create'
      this.resetForm()

      this.$nextTick(() => {
        this.$refs.type.focus()
        this.$refs.form.clearValidate()
      })
    },
    openEdit (row) {
      this.isDialogVisible = true
      this.dialogStatus = 'edit'
      this.form = Object.assign({}, row)
      // 上行代码等同 this.form = { ...row }

      this.$nextTick(() => {
        this.$refs.type.focus()
        this.$refs.form.clearValidate()
      })
    },

    handleSearch () {
      this.pagination.current = 1
      this.loadDictList()
    },
    handleSave () {
      if (this.dialogStatus === 'create') {
        insert(this.form).then(() => {
          this.$notify({
            type: 'success',
            message: '新增成功'
          })
          this.isDialogVisible = false
          this.init()
        }).catch((e) => {
          console.error('新增字典错误 => {}', e)
          this.$notify({
            type: 'error',
            message: '新增失败'
          })
        })
      } else if (this.dialogStatus === 'edit') {
        update(this.form).then(() => {
          this.$notify({
            type: 'success',
            message: '更新成功'
          })
          this.isDialogVisible = false
          this.init()
        }).catch((e) => {
          console.error('更新字典信息错误 => {}', e)
          this.$notify({
            type: 'error',
            message: '更新失败'
          })
        })
      }
    },
    handleDelete (row) {
      this.$confirm('确定删除该记录吗？', '提示', {
        configmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById({id: row.id}).then(() => {
          this.init()
          this.$notify({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.handleSave()
        } else {
          return false
        }
      })
    },

    resetForm () {
      this.form = {
        id: undefined,
        type: undefined,
        label: undefined,
        value: undefined,
        sort: 10 // 排序号默认为10
      }
    },
    resetSearch () {
      this.search = {
        type: undefined
      }
      this.pagination = {
        current: 1,
        pageSize: 10,
        total: 0
      }
      this.init()
    },

    currentChange (current) {
      this.pagination.current = current
      this.init()
    },

    dialogTitle (status) {
      let map = {
        'create': '新建',
        'edit': '修改',
        'view': '查看'
      }
      return map[status] || '查看'
    }
  }
}
</script>
