<template>
  <el-dialog title="添加用户" :visible.sync="dialogAddFormVisible" @close="addDialogClosed">
    <el-form
      label-width="50%"
      label-position="top"
      size="mini"
      :model="addRole"
      ref="addFormRef"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAddFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  return {
    addRole: {
      roleName: '',
      roleDesc: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
