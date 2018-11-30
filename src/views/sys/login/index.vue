<template>
    <el-container>
        <el-header>
            <div class="logo-container">
                <!-- icon图标 -->
            </div>
        </el-header>
        <el-main>
            <div class="login-container">
                <el-form class="login-form" :model="form" :rules="rules" ref="loginForm" label-position="right" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.account" autoComplete="on" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.pwd" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="handleLogin('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
        <el-footer>
            <div class="footer-container">
                <!-- footer copyright. -->
            </div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        account: undefined,
        pwd: undefined,
        rememberMe: false
      },
      rules: {
        name: [{required: true, message: '请输入账号'}]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      console.log('login from reset.')
      this.resetForm()
    },
    handleLogin (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', this.form).then(res => {
            console.log(res)
            this.$notify({
              type: 'success',
              message: '登录成功',
              duration: 3000
            })
            this.$router.push('/home')
            // this.$store.dispatch('GetUserInfo').then(res => console.log(res))
          })
        } else {
          this.$notify({
            type: 'warning',
            message: '验证失败'
          })
        }
      })
    },
    resetForm () {
      this.form = {
        account: undefined,
        pwd: undefined,
        rememberMe: false
      }
    }
  }
}
</script>

<style scoped>
.login-container{
    width: 40%;
    margin-left: 30%;
}
</style>
