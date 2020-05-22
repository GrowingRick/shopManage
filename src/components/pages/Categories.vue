<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumb-level="breadcrumbLevel" />
    <!-- 面包屑END -->

    <el-card>
      <h1>此模块还未完善</h1>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../Breadcrumb'
export default {
  data () {
    return {
      breadcrumbLevel: {
        first: '商品管理',
        second: '商品分类'
      }
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>

</style>
