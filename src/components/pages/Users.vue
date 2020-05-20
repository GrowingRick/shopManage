<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumb-level="breadcrumbLevel" />
    <!-- 面包屑END -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户姓名查找" class="input-with-select" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogAddFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userList" stripe style="width: 100%" border highlight-current-row>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template slot-scope="scope">
            <el-tooltip content="修改" placement="top" :enterable="false">
              <el-button size="mini" type="primary" @click="showEditDialog(scope.row.id)" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="primary" icon="el-icon-setting" @click="assignRole(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button size="mini" type="danger" @click="confirmDelete(scope.row)" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange($event)"
        @current-change="handleCurrentChange($event)"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 6]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalUsers">
      </el-pagination>
    </el-card>

    <!-- 添加用户 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogAddFormVisible" @close="addDialogClosed">
      <el-form label-width="50%" label-position="top" size="mini" :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户 对话框END -->

    <!-- 点击弹出 修改 对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogEditFormVisible" @close="editDialogClosed">
      <el-form label-width="50%" label-position="top" size="mini" :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="用户姓名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击弹出 修改 对话框END -->

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="assignRoleFormVisible" @close="assignRoleDialogClosed">
      <div class="set-roles">
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="newRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assignRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAssignRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色END -->
  </div>
</template>

<script>
import Breadcrumb from '../Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  data () {
    // 定义验证 手机号 规则
    var checkMobile = (rule, value, callback) => {
      // const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
      const regMobile = /^1[3456789]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入合法的手机号'))
      }
    }
    return {
      // 定义面包屑内容
      breadcrumbLevel: {
        first: '用户管理',
        second: '用户列表'
      },
      // 为了获取用户列表定义的参数对象
      queryInfo: {
        query: '', // 查询用户的条件：姓名
        pagenum: 1, // 默认显示页码第一页
        pagesize: 3 // 每页展示3条数据
      },
      userList: [],
      totalUsers: 0,
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      assignRoleFormVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' } // 自定 表单 校验规则义
        ]
      },
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' } // 自定 表单 校验规则义
        ]
      },
      userInfo: {},
      rolesList: {},
      // 选择的角色id
      newRoleId: ''
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 获取用户列表
    async getUsersList () {
      const { data: res } = await this.$axios.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.totalUsers = res.data.total
    },
    // pageSize 改变时会触发事件
    handleSizeChange (event) {
      this.queryInfo.pagesize = event
      this.getUsersList()
    },
    // currentPage 改变时会触发
    handleCurrentChange (event) {
      this.queryInfo.pagenum = event
      this.getUsersList()
    },
    // 监听用户角色状态改变
    async userStateChange (userInfo) {
      // users/:uid/state/:type
      const { data: res } = await this.$axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        // 状态变为原样
        userInfo.mg_state = !userInfo.mg_state
        this.$message.error('用户状态更新失败')
      } else {
        this.$message.success('用户状态更新成功')
      }
    },
    // 监听添加用户 对话框 关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户 确定
    addUser () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 预校验 通过 发送请求 post users   添加成功状态码201
        const { data: res } = await this.$axios.post('users', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message.error('用户添加失败,原因' + res.meta.msg)
        } else {
          this.$message.success('用户添加成功')
          // 隐藏 添加用户 对话框
          this.dialogAddFormVisible = false
          // 重新 更新 用户列表
          this.getUsersList()
        }
      })
    },
    // 修改用户
    async showEditDialog (id) {
      this.dialogEditFormVisible = true
      // users/:id
      const { data: res } = await this.$axios.get(`users/${id}`, this.editForm)
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.editForm = res.data
      }
    },
    // 修改用户 对话框关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 确认修改用户 PUT users/:id 请求参数 id
    confirmEdit () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 预校验通过 请求修改
        const { data: res } = await this.$axios.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        // const { data: res } = await this.$axios.put(`users/${this.editForm.id}`, this.editForm)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户失败：' + res.meta.msg)
        } else {
          this.$message.success('用户信息修改成功')
          this.dialogEditFormVisible = false
          // 重新 更新 用户列表
          this.getUsersList()
        }
      })
    },
    // 点击删除触发删除
    confirmDelete (userInfo) {
      this.$messageBox.confirm('此操作将永久删除该用户, 是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'waring'
        // center: true
      }).then(async () => {
        // /users/:id
        const { data: res } = await this.$axios.delete('users/' + userInfo.id)
        if (res.meta.status !== 200) {
          this.$message.error('删除用户失败!')
        } else {
          this.$message.success('用户删除成功!')
          this.queryInfo.pagenum = 1
          this.getUsersList()
        }
      }).catch(() => {
        this.$message.info('取消删除!')
      })
    },

    // 分配角色
    async assignRole (user) {
      this.userInfo = user
      // 获取角色列表
      const { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取失败！')
      this.rolesList = res.data
      this.assignRoleFormVisible = true
      // console.log(this.rolesList)
    },
    // 确认分配角色
    async confirmAssignRole () {
      if (!this.newRoleId) {
        return this.$message.error('请选择要分配的新角色！')
      }
      const { data: res } = await this.$axios.put((`users/${this.userInfo.id}/role`), { rid: this.newRoleId })
      if (res.meta.status !== 200) return
      this.$message.success('分配新角色成功')
      this.getUsersList()
      this.assignRoleFormVisible = false
    },
    // 分配角色关闭
    assignRoleDialogClosed () {
      this.newRoleId = ''
      this.userInfo = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
.set-roles {
  line-height: 50px;
}
</style>
