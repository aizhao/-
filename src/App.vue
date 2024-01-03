<template>
  <div id="app">
    <QnNavbar></QnNavbar>
    <el-aside><LeftList></LeftList></el-aside>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
name: 'App'
}
</script>

<style>
#app {
}
.el-aside{
  float: left;
}
</style>
