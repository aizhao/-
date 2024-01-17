<template>
  <el-container>
    <el-header height="10%"><QnNavbar></QnNavbar></el-header>
    <el-container>
      <el-aside width="18%"><left-list></left-list></el-aside>
      <el-main>
        <keep-alive> <router-view v-if="$route.meta.keepAlive" /></keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>
<style>
.operation-wrapper{
  width: 100% !important;
}
.el-header{
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  padding: 0;
}
.el-aside{
  position: fixed;
  height: 100vh;
  margin-top: 5%;
  overflow-y: auto;
}
.el-main{
  margin-top: 5%;
  margin-left: 18%;
  margin-left: 18%;
  padding: 0 16px !important;
  height: 100%;
  overflow-y: auto;
}
</style>
