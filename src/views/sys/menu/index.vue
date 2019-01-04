<template>
  <div class="menu-container">
    <el-row>
      <!-- 类别树 -->
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <el-input v-model="filterText" placeholder="输入关键字过滤"></el-input>
          </div>
          <el-scrollbar style="height:100%; width:100%;">
            <el-tree style="height:514px;"
              :default-expanded-keys="defaultExpandedKeys"
              :data="treeData" node-key="id"
              :props="defaultProps" highlight-current
              :filter-node-method="filterNode" ref="menuTree"
              :expand-on-click-node="false"
              @node-click="getNodeData">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-tooltip class="item" effect="dark" content="新增子菜单" placement="bottom">
                    <el-button type="text" size="mini" icon="el-icon-plus" @click.stop="() => handleAddChild(data)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <el-button type="text" size="mini" icon="el-icon-edit-outline" @click.stop="()=>handleEdit(data)"></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="data.parentId != 0" class="item" effect="dark" content="删除" placement="bottom">
                    <el-button type="text" size="mini" icon="el-icon-delete" @click.stop="() => handleDelete(data)"></el-button>
                  </el-tooltip>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </el-card>
      </el-col>

      <!-- 新增、修改或查看详情 -->
      <el-col :span="16">
        <el-card shadow="hover" style="height:620px;">
          <div slot="header" class="clearfix">
            <span>{{ formTitleMap[formStatus] }}</span>
          </div>
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="code" prop="code">
                  <el-input v-model="form.code" :disabled="formEdit" placeholder="请输入编码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类别" prop="type">
                  <el-radio-group v-model="form.type" :disabled="formEdit">
                    <el-radio label="0">菜单组</el-radio>
                    <el-radio label="1">菜单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否显示" prop="hidden">
                  <el-radio-group v-model="form.hidden" :disabled="formEdit">
                    <el-radio :label="false">显示</el-radio>
                    <el-radio :label="true">隐藏</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="请求路径" prop="url">
                  <el-input v-model="form.url" :disabled="formEdit" placeholder="请输入请求路径"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回调页面" prop="href">
                  <el-input v-model="form.href" :disabled="formEdit" placeholder="请输入回调页面"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="图标" prop="icon">
                  <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序" prop="sort">
                  <el-input v-model="form.sort" :disabled="formEdit" placeholder="请输入排序"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="() => handleUpdate()">更新</el-button>
              <el-button @click="() => handleCancel(true)">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="() => handleCreate()">保存</el-button>
              <el-button @click="() => handleCancel(true)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getMenuTree,
  insert,
  update,
  deleteMenu
} from './api'

export default {
  data () {
    return {
      filterText: '', // 树组件内容过滤
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpandedKeys: [],
      // data
      treeData: undefined, // 树数据
      formStatus: 'view',
      formTitleMap: {
        view: '详情',
        create: '新增',
        update: '编辑'
      },
      labelPosition: 'right',
      formEdit: true, // 表单是否编辑状态
      form: {
        id: undefined,
        parentId: undefined,
        name: undefined,
        code: undefined,
        type: undefined,
        hidden: undefined,
        url: undefined,
        href: undefined,
        icon: undefined,
        sort: undefined
      }
    }
  },
  created () {
    this.init()
    if (this.treeData !== undefined) {
      this.formStatus = 'create'
      this.formEdit = false
      this.form.parentId = 0
    }
  },
  watch: {
    filterText (val) {
      this.$refs.menuTree.filter(val)
    }
  },
  methods: {
    init () {
      getMenuTree().then(res => {
        const data = res.data.data
        this.treeData = data
        this.travelTree(this.treeData, '0')
      }).catch(err => {
        console.log('获取菜单列表错误：=> {}', err)
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getNodeData (data, node, obj) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      Object.assign(this.form, data)
      this.formStatus = 'view'
      this.formEdit = true // 使表单不可编辑
    },
    resetForm () {
      this.form = {
        id: undefined,
        parentId: undefined,
        name: undefined,
        code: undefined,
        type: undefined,
        hidden: undefined,
        url: undefined,
        href: undefined,
        icon: undefined,
        sort: undefined
      }
    },

    handleAddChild (node) {
      this.resetForm()
      this.form.parentId = node.id // 设置父节点
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleEdit (data) {
      this.getNodeData(data)
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },

    // 功能操作
    handleDelete (data) {
      const tip = '此操作将永久删除当前目录以及所有子类别, 是否继续?'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(data.id).then(() => {
          this.init()
          this.handleCancel(true)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(err => {
        console.log('删除菜单错误！=> {}', err)
      })
    },
    handleUpdate () {
      update(this.form).then(() => {
        this.init()
        this.handleCancel(true)
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleCreate () {
      insert(this.form).then(() => {
        this.init()
        this.handleCancel(true)
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleCancel (flag) {
      this.formEdit = true
      this.formStatus = ''
      if (flag) {
        this.resetForm()
      }
    },

    travelTree (data, parentId) {
      for (let i in data) {
        if (data[i].parentId === parentId) {
          this.defaultExpandedKeys.push(data[i].id)
        }
        this.travelTree(data[i].children, parentId)
      }
    }
  }
}
</script>
