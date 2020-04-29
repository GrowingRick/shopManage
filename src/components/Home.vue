<template>
  <el-container class="home_box">
    <!-- 页面头部 -->
    <el-header>
      <div class="systemName">
        <i :class="collapseIcon" @click="toggleCollapse"></i>
        <span><a href="#/welcome">后台管理系统</a></span>
      </div>
      <div class="acoountInfo">
        <img src="../assets/photo.jpg" alt />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">
              退出登录
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="https://github.com/GrowingRick/shopping/tree/home" target="_blank" style="color: #606266">项目仓库</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- <el-aside :width="iscollapse? '64px' : '200px'" ref="asideRef"> -->
      <el-aside :style="collapseStyle" ref="asideRef">
        <!-- <NavMenu @msgEvent="receiveMsg"></NavMenu> -->
        <NavMenu :is-collapse="isCollapse"></NavMenu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <!-- 子路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './pages/NavMenu.vue'
export default {
  data () {
    return {
      isCollapse: false,
      collapseStyle: {
        width: '200px',
        transition: '.3s'
      },
      collapseIcon: 'el-icon-s-fold'
    }
  },
  components: {
    NavMenu
  },
  methods: {
    logout () {
      // 1 销毁本地token
      // window.sessionStorage.removeItem('token')
      window.sessionStorage.clear()
      // 2 跳转到登录
      this.$router.push('/login')
    },
    // receiveMsg (value) {
    //   this.iscollapse = value
    // },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.collapseStyle.width = this.collapseStyle.width === '200px' ? '64px' : '200px'
      this.collapseIcon = this.collapseIcon === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  }
}
</script>

<style lang="less" scoped>
.home_box {
  height: 100%;
}

//  -------------- 头部样式
.el-header {
  background-image: linear-gradient(25deg, #5ea9c8, #88a9aa, #a3a98c, #b7a96d);
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  color: #fff;
  >.systemName>span {
    line-height: 60px;
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
}

.el-header .acoountInfo {
  height: 40px;
  position: relative;
  top: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.el-dropdown {
  color: #fff;
  top: -12px;
  left: 8px;
  span {
    i {
      font-size: 14px;
      position: relative;
      left: -6px;
    }
  }
  span:hover {
    color: #A0C6E8;
     cursor: pointer;
  }
}

.el-dropdown-menu {
  padding: 0;
  top: 40px !important;
}

.el-dropdown-menu__item {
  font-size: 12px;
  line-height: 30px;
  padding: 0 10px;
}

.el-dropdown-link:hover {
  cursor: pointer;
}

//  -------侧边样式
.el-aside {
  background-image: linear-gradient(180deg, #5ea9c8, #88a9aa, #a3a98c, #b7a96d);
  overflow-x: hidden;
  // height: 100%;
  // overflow-y: auto;
  //     &::-webkit-scrollbar {
  //       display: none;
  //     }
}

.el-main {
  background-color: #eee;
}

</style>
