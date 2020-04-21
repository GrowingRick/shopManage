<template>
    <div class="login_box">
        <div class="login_form">
        <div class="logo"><img src="../assets/ziran.gif" alt=""></div>
        <!-- 登陆表单 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :type="loginForm.inputType" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password">
                    <i :class="loginForm.inputIcon" slot="suffix" @click="showPwd"></i>
                </el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click="resitLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: '',
        password: '',
        inputType: 'password',
        inputIcon: 'el-icon-view'
      },
      // 表单验证规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 显示密码
    showPwd () {
      this.loginForm.inputType = this.loginForm.inputType === 'password' ? 'text' : 'password'
      this.loginForm.inputIcon = this.loginForm.inputIcon === 'el-icon-view' ? 'el-icon-elementIconclose-eye' : 'el-icon-view'
    },
    // 重置表单
    resitLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登陆处理
    login () {
      this.$refs.loginFormRef.validate(isPass => {
        if (isPass) {
          this.$axios.post('login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            if (res.data.meta.status !== 200) {
              // 请求不通过
              return this.$message({
                type: 'error',
                message: '账户或密码错误',
                offset: 200,
                showClose: true
              })
            } else {
              // 请求通过
              // 1 把token保存下来
              window.sessionStorage.setItem('token', res.data.data.token)
              // 2 跳转到主页
              this.$router.push('/home')
            }
          })
        }
      })
    //   this.$refs.loginFormRef.validate(async (isPass) => {
    //     if (!isPass) return // 不通过直接跳出函数
    //     // 通过发请求
    //     const { data: res } = await this.$axios.post('login', {
    //       username: this.loginForm.username,
    //       password: this.loginForm.password
    //     })
    //     if (res.meta.status !== 200) {
    //       return this.$message({
    //         message: '登录失败',
    //         type: 'error'
    //       })
    //     }
    //     this.$message.success('登录成功')
    //     // 1 把token保存起来
    //     window.sessionStorage.setItem('token', res.data.token)
    //     // 2 跳转到主页
    //     this.$router.push('/home')
    //   })
    }
  }
}
</script>

<style lang="less" scoped>
    .login_box {
        height: 100%;
        // background-color: #35495E;
        background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
        background-blend-mode: multiply,multiply;
    }

    .login_form {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login_form .logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ccc;
        background-color: #fff;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }
    }

    .login_form .el-form {
        position: absolute;
        width: 80%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        padding-bottom: 5px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
