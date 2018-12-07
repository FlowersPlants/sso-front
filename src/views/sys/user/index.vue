<template>
  <div id="user-container">
    <div style="margin-bottom:20px;">
      <el-input style="width:200px" placeholder="请输入账号" v-model="search.keyword" @keyup.enter.native="handleSearch"></el-input>
      <el-button type="primary" style="margin-left:10px;" @click="handleSearch()">搜索</el-button>
      <el-button type="success" style="margin-left:10px;" @click="openCreate()">新增</el-button>
    </div>

    <el-table :data="userList" border>
      <el-table-column prop="account" label="用户名" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="性别" :formatter="genderFormatter"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sort" label="排序号"></el-table-column>
      <el-table-column label="状态" :formatter="statusFormatter"></el-table-column>
      <el-table-column label="出生日期" :formatter="birthdayFormatter" width="150" show-overflow-tooltip></el-table-column>
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
      <el-form :model="form" :rules="rules" ref="formData" label-position="right" label-width="100px">
        <el-form-item prop="account" label="用户名">
          <el-input v-model="form.account" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="el-dialog-footer">
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { findPage, insert, update, deleteUser } from './api'
export default {
  data () {
    return {
      search: {
        keyword: undefined
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      dialogStatus: 'view',
      isDialogVisible: false,
      rules: {
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ]
      }, // 表单校验规则
      form: {
        id: undefined,
        account: undefined,
        name: undefined,
        email: undefined,
        gender: undefined,
        birthday: undefined,
        sort: 10 // 排序号默认为10
      },
      userList: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    // 计算属性
  },
  methods: {
    init () {
      findPage({
        name: this.search.keyword,
        current: this.pagination.current,
        pageSize: this.pagination.pageSize
      }).then(res => {
        const data = res.data.data
        this.userList = data.records
        this.pagination.current = Number(data.current)
        this.pagination.pageSize = Number(data.size)
        this.pagination.total = Number(data.total)
      })
    },

    openCreate () {
      this.isDialogVisible = true
      this.dialogStatus = 'create'
      this.resetForm()

      this.$nextTick(() => this.$refs.formData.clearValidate())
    },
    openEdit (row) {
      this.isDialogVisible = true
      this.dialogStatus = 'edit'
      this.form = Object.assign({}, row)

      this.$nextTick(() => this.$refs.formData.clearValidate())
    },

    handleSearch () {
      this.pagination.current = 1
      this.init()
    },
    handleStatus (row) {
      // 更新状态
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
          console.error('新增用户错误 => {}', e)
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
          console.error('更新用户信息错误 => {}', e)
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
        deleteUser(row.id).then(() => {
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
    submitForm (formData) {
      this.$refs[formData].validate(valid => {
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
        account: undefined,
        name: undefined,
        email: undefined,
        gender: undefined,
        birthday: undefined,
        sort: 10
      }
    },
    resetSearch () {
      this.search = {
        keyword: undefined
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

    genderFormatter (row) {
      return row.gender ? '男' : '女'
    },
    birthdayFormatter (row) {
      return row.birthday ? parseTime(row.birthday, '{y}-{m}-{d}') : '无'
    },
    statusFormatter (row) {
      let map = {
        '0': '正常',
        '1': '删除',
        '2': '停用',
        '3': '冻结'
      }
      return map[row.status] || '停用'
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
