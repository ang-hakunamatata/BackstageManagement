<template>
  <div class="menu">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <el-button
         @click="$router.push({ name: 'menu-create' })"
        >操作按钮</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
         <el-table-column
          label="编号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
         <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
         <el-table-column
          label="操作"
          width="180px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </el-card>
  </div>
</template>

<script>
import { getAllMenu } from '@/services/menu.js'

export default {
  name: 'Menu',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    // 获取所有菜单项
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenu()
      // console.log(data)
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }
}
</script>

<style scss="lang" scoped>
</style>
