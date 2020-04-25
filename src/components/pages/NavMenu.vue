<template>
<div>
  <!-- <div class="toggle-button" @click="toggleCollapse();sendMsg()">|||</div> -->
  <el-menu background-color="#88a9aa" text-color="#ebedee" active-text-color="#2af598" unique-opened router  :collapse="isCollapse" class="menu-box">
    <el-submenu  v-for="item in menuList" :key="item.id" :index="item.path">
      <template slot="title">
        <i :class="iconsObj[item.id]"></i>
        <span>{{item.authName}}</span>
      </template>
      <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-tools',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-finance'
      }
    }
  },
  created () {
    // const { data: res } = await this.$axios.get('menus')
    // this.menuList = res.data
    this.getMenuList()
  },
  methods: {
    // 获取菜单列表
    async getMenuList () {
      // get menus
      const { data: res } = await this.$axios.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取菜单列表失败')
      this.menuList = res.data
    },
    // toggleCollapse () {
    //   this.isCollapse = !this.isCollapse
    // },
    sendMsg () {
      this.$emit('msgEvent', this.isCollapse)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
  i {
    color: #ebedee;
  }
}

.el-menu-item:hover,.el-submenu__title:hover {
  span {
    color: #5ee7df;
  }
  i {
    color: #5ee7df;
  }
}

.toggle-button {
  background-color: aqua;
  color: #fff;
  text-align: center;
  font-size: 10px;
  cursor: pointer;
  line-height: 24px;
  letter-spacing: 0.2em;
}

.menu-box:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
