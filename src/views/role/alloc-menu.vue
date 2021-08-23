<template>
  <div class="alloc-menu">
      <el-tree
        :data="menus"
        :props="defaultProps"
        show-checkbox
        default-expand-all
    ></el-tree>
  </div>
</template>

<script>
import { getMenuNodeList } from '@/services/role.js'

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
      }
    }
  },
  methods: {
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
