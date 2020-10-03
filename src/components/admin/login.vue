<template>
  <div class="login">
    <div class="login_form">
      <el-form :model="loginForm" size="small" :rules="loginRules" ref="loginFormRef" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" class="color">
          <el-input v-model="loginForm.username" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="color">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" :clearable="true"></el-input>
        </el-form-item>
        <div class="button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>

  import {mapMutations} from 'vuex';

  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          username: 'thankCode',
          password: 'x2462474274'
        },
        loginRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;

          // 加密
          let psw = this.encrypts.AES.encrypt(this.loginForm.password, '我叼你妈的').toString()
          const loginUserName = this.loginForm.username
          const {status, data} = await this.$http.post('login', {
            loginUserName,
            psw
          })
          if (status !== 200) return this.$message.error('服务器异常')
          if (!data) return this.$message.error('用户名密码错误')
          this.changeLogin({Authorization: data.token})
          this.$message.success('登录成功')
          this.$router.replace('/home')
        })
      },
      resetForm() {
        this.$refs.loginFormRef.resetFields();
      }
    }
  }
</script>

<style scoped lang="less">


  html, body, #app, .login {
    height: 100vh !important;
  }

  .login {
    background-image: url("../../assets/img/loginB.jpg");
    display: flex;
    justify-content: center;
    align-items: center;

    .login_form {
      margin: 0 20px;
      width: 360px;

      .el-input--small .el-input__inner {
        color: red !important;
      }

      .button {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }

  @media screen and (max-width: 900px) {
    .login {
      background-image: url("../../assets/img/bg2.jpg") !important;
      background-size: 100% 100%;
    }
  }


</style>