<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
          ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="isLoginLoading"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
// import qs from 'qs'

// 引入封装的接口功能组件
import { login } from '@/services/user.js'

export default {
  name: 'LogIn',
  data () {
    return {
      // 存储表单数据对象
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为 6 到 18 位', trigger: 'blur' }
        ]
      },
      // 用于存储加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      // console.log(this.$refs.form)
      try {
        // console.log(this.$refs)
        // console.log(this.$refs.form.validate())
        console.log(login())
        // console.log(login(this.form))
        // 1. 设置验证
        await this.$refs.form.validate()
        // 2. 发送请求
        // console.log(qs.stringify(this.form))
        this.isLoginLoading = true
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   // urlencoded格式  名=值&名=值
        //   data: qs.stringify(this.form)
        //   // data: {
        //   //   phone: this.form.phone,
        //   //   password: this.form.password
        //   // }
        // })
        const { data } = await login(this.form)
        this.isLoginLoading = false
        // console.log(this)
        if (data.state === 1) {
          this.$message.success('登录成功')
          // 用户信息存储到 Vuex中
          this.$store.commit('setUser', data.content)
          // 根据可能存储的 redirect 数据进行跳转设置
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登录失败')
        }
        // console.log('通过校验')
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log('没有通过校验')
      }
      // console.log('点击提交!')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
