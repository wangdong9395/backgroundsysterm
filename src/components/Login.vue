<template>
  <div>
    <h1 class="title">欢迎登录**后台管理系统</h1>
    <div class="login_body">
      <el-form :model="ruleForm" label-width="70px" :rules="rules" status-icon ref="ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont icon-yonghuming"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon-mima"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button  type="primary" @click="submitForm()">登录</el-button>
        <el-button  type="info">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.ruleForm)
          console.log(res)
          if (res.meta.status !== 200) {
            this.$message({
              message: '登录失败',
              type: 'error'
            })
            return false
          }
          // 将token保存在sessionStorge中
          sessionStorage.setItem('token', res.data.token)
          this.$message.success('登录成功')
          this.$router.push('/home')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #e9e9e9;
  margin: 0;
  padding: 0;
}
.title {
  text-align: center;
}
.login_body {
  padding: 30px 15px 15px 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  border: 1px solid #fff;
  background-color: antiquewhite;
  box-shadow: 2px 2px 2px 2px #ccc;
}
.button {
    position: absolute;
    right: 20px;
}
</style>
