<template>
  <div class="alloc-menu">
      <el-card>
        <el-tree
          ref="menu-tree"
          node-key="id"
          :data="menus"
          :props="defaultProps"
          show-checkbox
          default-expand-all
        ></el-tree>
        <div style="margin: 20px;">
          <el-button
            @click="onReset"
          >清空</el-button>
          <el-button
            type="primary"
            @click="onSave"
          >保存</el-button>
        </div>
      </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus } from '@/services/role.js'

export default {
  name: 'allocMenu',
  props: {
    roleId: {
      type: [Number, String]
    }
  },
  created () {
    this.loadMenuNodeList()
  },
  data () {
    return {
      // 树形空间展示信息
      menus: [],
      // 获取数据的展示信息名称设置
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      // 选定菜单项 Id 信息
      menuIdList: []
    }
  },
  methods: {
    // 清空选定菜单项
    onReset () {},
    // 保存选定菜单项
    async onSave () {
    //   console.log(this.$refs['menu-tree'].getCheckedKeys())
    //   console.log(this.$refs['menu-tree'].getCheckedNodes())
      // 发送请求，传递角色 ID 与 选中的菜单项 ID
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push({
          name: 'role'
        })
      }
    },
    // 分级获取菜单列表
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      // console.log(data.data)
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
