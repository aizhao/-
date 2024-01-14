<template>
 <el-container>
  <el-header height=10%><QnNavbar></QnNavbar></el-header>
  <el-container>
    <el-aside width="15%"><left-list></left-list></el-aside>
    <el-main>
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/></keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>