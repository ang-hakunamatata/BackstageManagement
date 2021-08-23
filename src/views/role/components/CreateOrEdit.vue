<template>
  <div class="create-or-edit">
    <el-form>
      <el-form-item
        label="角色名称">
        <el-input
          v-model="roles.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色编码">
        <el-input
          v-model="roles.code"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述">
        <el-input
          v-model="roles.description"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="onCancel"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createOrUpdate, getRoleById } from '@/services/role.js'

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      roles: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadRoles()
    }
  },
  methods: {
    // 取消添加或编辑
    onCancel () {
      // 关闭提示框（需要子组件向父组件传递状态）
      this.$emit('cancel')
      // 清除表单内容
      this.role = {}
    },
    // 添加更新角色
    async onSubmit () {
      const { data } = await createOrUpdate(this.roles)
      if (data.code === '000000') {
        // 关闭提示框（需要子组件向父组件传递状态）
        this.$emit('success')
        // 设置成功提示
        this.$message.success('添加成功')
        // 清除表单内容
        this.role = {}
      }
    },
    // 获取角色
    async loadRoles () {
      const { data } = await getRoleById(this.roleId)
      console.log(data)
      if (data.code === '000000') {
        this.roles = data.data
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
