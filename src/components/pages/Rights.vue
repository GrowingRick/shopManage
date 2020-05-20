<template>
  <div class="rights">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumb-level="breadcrumbLevel" />
    <!-- 面包屑END -->

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" stripe style="width: 100%" border highlight-current-row>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <el-table-column prop="level" label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="warning" v-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="danger" v-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 卡片视图END -->
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
      rightsList: [], // 权限列表
      breadcrumbLevel: {
        first: '权限管理',
        second: '权限列表'
      }
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    // 获取权限列表
    async getRightsList () {
      const { data: res } = await this.$axios.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.rightsList = res.data
      console.log(this.rightsList)
    },
    // pageSize 改变时会触发事件
    handleSizeChange (event) {
      this.rightsInfo.pagesize = event
      this.getRightsList()
    },
    // currentPage 改变时会触发
    handleCurrentChange (event) {
      this.rightsInfo.pagenum = event
      this.getRightsList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>>
