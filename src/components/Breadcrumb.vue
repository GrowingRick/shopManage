<template>
  <div class="breadcrumb">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumbLevel.first}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumbLevel.second}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑END -->
  </div>
</template>

<script>
export default {
  props: ['breadcrumbLevel']
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 12px;
}
</style>
