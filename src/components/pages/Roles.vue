<template>
  <div class="roles">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumb-level="breadcrumbLevel" />
    <!-- 面包屑END -->

    <!-- 卡片区域 -->
    <el-card>
      <el-button type="primary" @click="addRoleFormVisible = true">添加角色</el-button>
      <el-table :data="rolesList" stripe style="width: 100%" border highlight-current-row>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, index1) in scope.row.children" :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag  @close="removeRightById(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二三权限 -->
              <el-col :span="19">
                <el-row :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, index2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success"  @close="removeRightById(scope.row, item2.id)" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag @close="removeRightById(scope.row, item3.id)" closable v-for="(item3) in item2.children" :key="item3.id" type="warning">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-tooltip content="修改" placement="top" :enterable="false">
              <el-button
                size="mini"
                type="primary"
                @click="editRole(scope.row.id)"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="分配权限" placement="top" :enterable="false">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-setting"
                @click="assignRights(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteRole(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 卡片区域END -->

    <!-- 添加角色 -->
    <el-dialog title="添加用户" :visible.sync="addRoleFormVisible" @close="addRoleDialogClosed">
      <el-form label-width="50%" label-position="top" size="mini" :model="addRoleForm" ref="addRoleFormRef">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色END -->

    <!-- 修改角色 -->
    <el-dialog title="修改用户" :visible.sync="editRoleFormVisible" @close="editRoleDialogClosed">
      <el-form label-width="50%" label-position="top" size="mini" :model="editRoleForm" ref="editRoleFormRef">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色END -->

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="assignRightsFormVisible" @close="assignRightsDialogClosed">
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultKeys"
        ref="treeRef"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assignRightsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRightsConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限END -->
  </div>
</template>

<script>
import Breadcrumb from '../Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  data () {
    return {
      addRoleFormVisible: false,
      editRoleFormVisible: false,
      assignRightsFormVisible: false,
      // 定义面包屑内容
      breadcrumbLevel: {
        first: '权限管理',
        second: '角色列表'
      },
      rolesList: [], // 角色列表
      // 添加角色 数据
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色数据
      editRoleForm: {},
      // 所有权限列表
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点id数组
      defaultKeys: [],
      roleId: ''
    }
  },
  created () {
    // 调用获取角色列表
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList () {
      const { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取失败！')
      this.rolesList = res.data
    //   console.log(res)
    },

    // 添加角色表单关闭
    addRoleDialogClosed () {
      this.$refs.addRoleFormRef.resetFields()
    },
    // 确认添加角色
    addRoleConfirm () {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return
        // 前端验证通过 发送post请求
        const { data: res } = await this.$axios.post('roles', this.addRoleForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加失败' + res.meta.msg)
        this.$message.success('添加成功')
        // 隐藏添加用户 表单
        this.addRoleFormVisible = false
        this.getRolesList()
      })
    },

    // 修改 角色
    async editRole (id) {
      this.editRoleFormVisible = true
      const { data: res } = await this.$axios.get(`roles/${id}`)
      if (res.meta.status !== 200) return this.$message.error('修改失败' + res.meta.msg)
      this.editRoleForm = res.data
    //   console.log(this.editRoleForm)
    },
    // 修改角色 表单关闭
    editRoleDialogClosed () {
      this.$refs.editRoleFormRef.resetFields()
    },
    // 确认修改
    editRoleConfirm () {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.put(`roles/${this.editRoleForm.roleId}`, {
          roleName: this.editRoleForm.roleName,
          roleDesc: this.editRoleForm.roleDesc
        })
        if (res.meta.status !== 200) return this.$message.error('失败' + res.meta.msg)
        this.$message.success('修改成功')
        this.editRoleFormVisible = false
        this.getRolesList()
      })
    },

    // 删除角色
    deleteRole (id) {
      this.$messageBox.confirm('此操作将永久删除该角色, 是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(async () => {
        const { data: res } = await this.$axios.delete(`roles/${id}`)
        if (res.meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getRolesList()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },

    // 分配权限
    async assignRights (role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$axios.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('失败' + res.meta.msg)
      this.rightsList = res.data
      // console.log(role)
      // 调用递归获取角色下所有的三级权限id
      this.getLeafKeys(role, this.defaultKeys)
      this.assignRightsFormVisible = true
    },
    // 确认分配
    async assignRightsConfirm () {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      //   console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$axios.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('分配失败')
      this.$message.success('分配成功')
      this.getRolesList()
      this.assignRightsFormVisible = false
    },
    // 分配权限对话框关闭
    assignRightsDialogClosed () {
      this.defaultKeys = []
    },
    // 根据id删除权限
    removeRightById (role, rightId) {
      this.$messageBox.confirm('此操作将永久删除该权限, 是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(async () => {
        const { data: res } = await this.$axios.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) return this.$message.error('删除权限失败' + res.meta.msg)
        this.$message.success('删除成功')
        // this.getRolesList()
        role.children = res.data
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // 通过递归获取角色下所有的三级权限id
    getLeafKeys (node, arr) {
      // 如果当前节点没有children 属性，就是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    }
  }
}
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 10px;
}

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
