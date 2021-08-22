<template>
  <div class="resource-list">
      <el-card>
        <div slot="header" class="clearfix">
          <!-- 使用 Form 组件：行内表单 -->
          <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            ref="form"
            :disabled="isLoading">
            <el-form-item
              label="资源名称"
              prop="name">
                <el-input
                  clearable
                  v-model="form.name"
                  placeholder="资源名称"></el-input>
            </el-form-item>
            <el-form-item
              label="资源路径"
              prop="url">
                <el-input
                  clearable
                  v-model="form.url"
                  placeholder="资源路径"></el-input>
            </el-form-item>
            <el-form-item
              label="资源分类"
              prop="categoryId">
                <el-select
                  clearable
                  v-model="form.categoryId"
                  placeholder="资源分类">
                  <el-option
                   v-for="item in resourceCategories"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id"
                  ></el-option>
                <!-- <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onReset">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div>
          <!-- 使用Table组件 -->
        <el-table
           :data="resourceList"
           style="width: 100%"
           v-loading="isLoading">
           <el-table-column
             type="index"
             label="编号"
           >
           </el-table-column>
           <el-table-column
               prop="name"
               label="资源名称">
           </el-table-column>
           <el-table-column
               prop="url"
               label="资源路径">
           </el-table-column>
           <el-table-column
               prop="description"
               label="描述">
           </el-table-column>
           <el-table-column
               label="添加时间">
               <template slot-scope="scope">
                <span>{{ scope.row.createdTime | dateFormat }}</span>
               </template>
           </el-table-column>
           <el-table-column
             label="操作"
             width="150px">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleEdit(scope.row)"
               >编辑</el-button>
               <el-button
                 size="mini"
                 @click="handleDelete(scope.row)"
                 type="danger"
               >删除</el-button>
             </template>
           </el-table-column>
        </el-table>
        </div>
          <!-- 分页组件结构 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.data"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getResourcePages, getResourceCategories } from '@/services/resource.js'

export default {
  name: 'ResourceList',
  data () {
    return {
      // 资源列表信息
      resourceList: [],
      form: {
        // 当前页码
        current: 1,
        // 页面个数
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类ID
        categoryId: ''
      },
      // 总个数
      totalCount: 0,
      // 存储资源分类信息
      resourceCategories: [],
      // 是否加载数据
      isLoading: false
    }
  },
  created () {
    // 加载资源列表信息
    this.loadRescourcePages()
    // 获取资源分类信息
    this.loadRescourceCategories()
  },
  methods: {
    onReset () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      // 更新后将页数置为 1
      this.form.current = 1
      this.loadRescourcePages()
    },
    async loadRescourceCategories () {
      const { data } = await getResourceCategories()
      // console.log(data.data)
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页显示的条数，应当将页数还原为默认值 1
      this.form.current = 1
      this.loadRescourcePages()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadRescourcePages()
    },
    async loadRescourcePages () {
      // 数据加载中，禁止点击
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      // console.log(data)
      // console.log(data.data.records)
      if (data.code === '000000') {
        this.resourceList = data.data.records
        this.totalCount = data.data.total
        // 数据加载完毕，释放点击功能
        this.isLoading = false
      }
    },
    handleEdit () {},
    handleDelete () {}
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      // console.log(date)
      date = new Date(date)
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

<style lang = 'scss' scoped></style>
