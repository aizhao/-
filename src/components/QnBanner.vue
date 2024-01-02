<template>

<div class="main-box">
  <div class="box">
  <el-carousel :interval="3000"  height="330px">
    <el-carousel-item v-for="item in list" :key="item.id" >
       <el-image :src="item.imageUrl" fit="cover"></el-image>
    </el-carousel-item>
  </el-carousel></div></div>
</template>

<script>
import {_getBanner} from '@/api/music-list'
  export default {
    data() {
    return {
       list:[] // 推荐歌单数据
    };
  },
 created(){
        let uid=localStorage.getItem("uid")
      _getBanner().then((res)=>{
        this.list=res.banners
      
      })
    
        },
  }
</script>
<style scoped>
.box{
  height: 350px;
  width: 93%;
  position: relative;
  top: -20px;
  margin: 50px 25% 0 1%;
  padding: 0 35px;
  background-color: #ffffff;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 450px;
    margin: 0px 300px;
  }
  .el-image{
    height: 350px;
    width: 100%;
  }
</style>