<template>
  <div id="role-container">
    <div style="margin-bottom:20px;">
      <el-input style="width:200px" placeholder="请输入角色名称" v-model="search.keyword" @keyup.enter.native="handleSearch"></el-input>
      <el-button type="primary" style="margin-left:10px;" @click="handleSearch()">搜索</el-button>
      <el-button type="success" style="margin-left:10px;" @click="openCreate()">新增</el-button>
    </div>

    <el-table :data="roleList" border>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="enname" label="英文名称"></el-table-column>
      <el-table-column prop="type" label="类别" :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="sort" label="排序号" width="80"></el-table-column>
      <el-table-column label="状态" :formatter="statusFormatter" width="100"></el-table-column>
      <el-table-column label="操作" fixed="right" width="210">
        <template slot-scope="props">
          <!-- <svg-icon icon-class="user">用户</svg-icon> -->
          <el-button size="small" type="success" title="成员用户" @click="openAuthUser(props.row)" icon="el-icon-error" circle></el-button>
          <el-button size="small" type="warning" title="授权" @click="openAuth(props.row)" icon="el-icon-warning" circle></el-button>
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
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="enname" label="英文名称">
          <el-input v-model="form.enname" placeholder="英文名称"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类别">
          <el-select v-model="form.type" placeholder="请选择类别" style="width: 100%;">
            <el-option value="2" label="系统管理员"></el-option>
            <el-option value="3" label="普通管理员"></el-option>
            <el-option value="4" label="普通用户"></el-option>
            <!-- <el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="el-dialog-footer">
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="授权" :visible.sync="isAuthDialogVisible" width="60%">
      <el-scrollbar style="height: 100%; width: 100%;">
        <el-tree style="min-height: 200px;"
          show-checkbox
          default-expand-all
          :data="treeData"
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="defaultCheckedKeys"
          highlight-current
          ref="menuTree">
        </el-tree>
      </el-scrollbar>
      <div slot="footer" class="el-dialog-footer">
        <el-button type="primary" @click="submitAuth()">保存</el-button>
        <el-button @click="isAuthDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTree, getAuthMenuByRoleId } from '../menu/api'
import { findPage, insert, insertRoleMenu, update, deleteRole } from './api'
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
        enname: [
          { required: true, message: '请角色英文名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ]
      }, // 表单校验规则
      form: {
        id: undefined,
        name: undefined,
        enname: undefined,
        type: undefined,
        sort: 10 // 排序号默认为10
      },
      roleList: [],

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: undefined, // 树数据
      defaultCheckedKeys: [],
      isAuthDialogVisible: false,
      roleDto: {
        menuIds: [],
        id: undefined
      }
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
        this.roleList = data.records
        this.pagination.current = Number(data.current)
        this.pagination.pageSize = Number(data.size)
        this.pagination.total = Number(data.total)
      })
    },
    loadMenuTree () {
      getMenuTree().then(res => {
        const data = res.data.data
        this.treeData = data
      }).catch(err => {
        console.log('获取菜单列表错误：=> {}', err)
      })
    },
    loadAuthMenu (row) {
      getAuthMenuByRoleId(row.id).then(res => {
        const data = res.data.data
        this.defaultCheckedKeys = Object.values(data).map(({id}) => id).filter(id => !!id)
      })
    },

    openCreate () {
      this.isDialogVisible = true
      this.dialogStatus = 'create'
      this.resetForm()

      this.$nextTick(() => this.$refs.formData.clearValidate())
    },
    openAuth (row) {
      this.defaultCheckedKeys = []
      this.isAuthDialogVisible = true
      this.loadAuthMenu(row)
      this.loadMenuTree()

      this.roleDto.id = row.id
    },
    openAuthUser (row) {
      this.$notify({
        type: 'warning',
        message: '功能未实现'
      })
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
          console.error('新增角色错误 => {}', e)
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
          console.error('更新角色信息错误 => {}', e)
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
        deleteRole(row.id).then(() => {
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
    submitAuth () {
      this.roleDto.menuIds = this.$refs.menuTree.getCheckedKeys()
      insertRoleMenu(this.roleDto).then(() => {
        this.$notify({
          type: 'success',
          message: '授权成功'
        })
        this.isAuthDialogVisible = false
        this.init()
      }).catch(err => {
        console.log('授权失败：=> {}', err)
      })
    },

    resetForm () {
      this.form = {
        id: undefined,
        enname: undefined,
        name: undefined,
        type: undefined,
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

    statusFormatter (row) {
      let map = {
        '0': '正常',
        '1': '删除'
      }
      return map[row.status] || '删除'
    },
    typeFormatter (row) {
      let map = {
        '1': '超级管理员',
        '2': '系统管理员',
        '3': '普通管理员',
        '0': '普通用户'
      }
      return map[row.type] || '普通用户'
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
