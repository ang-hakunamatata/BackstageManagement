<template>
    <div class="app-header">
      <!-- 左侧面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 右侧下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
          :size="30"
          :src=" userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
          </el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
// 引入用户信息接口功能
import { getUserInfo } from '@/services/user.js'

export default {
  name: 'AppHeader',
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo () {
      const { data } = await getUserInfo()
      // console.log(data)
      this.userInfo = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
