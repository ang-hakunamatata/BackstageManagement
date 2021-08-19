<template>
  <div class="menu">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <el-button
         @click="$router.push({ name: 'menu-create' })"
        >操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
    </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scss="lang" scoped>
</style>
