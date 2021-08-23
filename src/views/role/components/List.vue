<template>
    <div class="role-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="角色名称" >
                <el-input
                  v-model="form.name"
                  placeholder="角色名称"
                  ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                  @click="onSubmit"
                  :disabled="isLoading">查询</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
           </el-form>
        </div>
        <!-- 显示对话框 -->
        <el-button
          @click="dialogVisible = true"
        >添加角色</el-button>
        <el-table
          :data="roles"
          style="width: 100%"
          v-loading="isLoading">
          <el-table-column
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            label="添加时间">
            <template slot-scope="scope">
                <span>{{ scope.row.createdTime | dateFormat}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div>
                <el-button
                  @click="$router.push({
                    name: 'alloc-menu',
                    params: { roleId: scope.row.id }
                  })"
                  type="text">
                  分配菜单
                </el-button>
                <el-button
                  type="text">
                  分配资源
                </el-button>
                </div>
                <div>
                <el-button
                  type="text"
                  @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  @click="handleDelete(scope.row)">
                  删除
                </el-button>
                </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加角色的对话框结构 -->
        <el-dialog
          :title="isEdit ? '编辑角色' : '添加角色'"
          :visible.sync="dialogVisible"
          width="30%">
          <!-- <create-or-edit></create-or-edit> -->
           <!-- 将添加与编辑功能单独封装到组件中 -->
          <create-or-edit
            @success="handelSuccess"
            @cancel="handelCancel"
            :role-id="roleId"
            :is-edit="isEdit"
          ></create-or-edit>
        </el-dialog>
      </el-card>
      </div>
</template>

<script>
import { getRoles, deleteRole } from '@/services/role.js'

import CreateOrEdit from './CreateOrEdit'

export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        name
      },
      roles: [],
      isLoading: false,
      dialogVisible: false,
      // 是否为编辑角色
      isEdit: false,
      // 角色id
      roleId: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 点击取消操作
    handelCancel () {
      this.dialogVisible = false
    },
    // 点击确定操作
    handelSuccess () {
      // 关闭提示框
      this.dialogVisible = false
      // 重新获取刷新tabel数据
      this.getRolesList()
    },
    // 编辑角色
    handleEdit (role) {
      this.isEdit = true
      // 显示对话框
      this.dialogVisible = true
      this.roleId = role.id
    },
    // 删除角色
    handleDelete (role) {
      this.$confirm(`是否清除角色：${role.name}？`, '删除提示')
        .then(async () => {
          this.isLoading = true
          const { data } = await deleteRole(role.id)
          if (data.code === '000000') {
            this.getRolesList()
            this.$message.success('删除成功')
          }
        }).catch((err) => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    },
    // 获取角色列表
    async getRolesList () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      // console.log(data)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.isLoading = false
      }
    },
    onSubmit () {
    },
    onReset () {
    }
  },
  filters: {
    dateFormat (data) {
      const date = new Date(data)
      if (date.getMonth() + 1 > 9) {
        return `
          ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 
          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `
      } else {
        return `
          ${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()} 
          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-form{
        display: flex;
        justify-content: space-between;
    }
</style>
