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
          :default-checked-keys="checkedKeys"
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
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/role.js'

export default {
  name: 'allocMenu',
  props: {
    roleId: {
      type: [Number, String]
    }
  },
  created () {
    // 分级获取菜单列表
    this.loadMenuNodeList()
    // 获取角色拥有的菜单列表
    this.loadRoleMenus()
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
      menuIdList: [],
      // 用户选中的菜单信息
      checkedKeys: []
    }
  },
  methods: {
    // 清空选定菜单项
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    // 获取用户选择菜单列表展示
    getCheckedKey (menus) {
      menus.forEach(menu => {
        // 未选中，结束
        if (!menu.selected) {
          return
        }
        // 如果拥有子节点不进行操作，递归子节点
        if (menu.subMenuList) {
          return this.getCheckedKey(menu.subMenuList)
        }
        // 可以进行处理的子节点
        // this.checkedKeys.push(menu.id)
        // console.log(this.checkedKeys)
        this.checkedKeys = [...this.checkedKeys, menu.id]
        console.log(this.checkedKeys)
      })
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      // console.log(data)
      if (data.code === '000000') {
        this.getCheckedKey(data.data)
      }
    },
    // 保存选定菜单项
    async onSave () {
      // console.log(this.$refs['menu-tree'].getCheckedKeys())
      // console.log(this.$refs['menu-tree'].getCheckedNodes())
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
