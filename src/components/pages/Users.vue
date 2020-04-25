<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 用户列表 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
    </el-table>
    <div class="block">
    <el-pagination @size-change="handleSizeChange($event)"
      @current-change="handleCurrentChange($event)"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalUsers">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 为了获取用户列表定义的参数对象
      queryInfo: {
        query: '',
        pagenum: 1, // 默认第一页
        pagesize: 4 // 每页展示四条数据
      },
      userList: [],
      totalUsers: 0
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
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 12px;
}

.el-card {
  border: 0;
  box-shadow: none;
}
.el-table {
  border-radius: 4px;
  // box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
}
</style>
