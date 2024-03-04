<template>
  <div class="main-box">
    <div class="box1">
      <el-carousel :interval="3000" height="330px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <el-image
            :src="item.imageUrl + '?param=1350y350'"
            fit="cover"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { _getBanner } from "@/api/music-list";
export default {
  data() {
    return {
      list: [], // 推荐歌单数据
    };
  },
  created() {
    _getBanner().then((res) => {
      this.list = res.banners;
    });
  },
};
</script>
<!-- <style>
.el-container{
  position: relative;
  /* background-color: rgb(255, 255, 255); */
  z-index: 2;
  opacity: 1;
  margin: 0;
  padding: 0;
  height: 100%;
  background-size: cover;
  background-position: center center;
}
.el-container::before{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* opacity: 0.1; */
  /* _webkit-filter: grayscale(1); */
  /* filter: blur(5px); */
  background: rgb(0, 0, 0, 0.4);
  /* opacity: 0.5; */
  /* backdrop-filter: blur(150px); */
}
.el-container::after{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
  z-index: -1;
  /* filter: grayscale(1); */
  /* _webkit-filter: grayscale(1); */
  /* filter: blur(5px); */
  /* background-color: #504d4d; */
  /* opacity: 0.5; */
  backdrop-filter: blur(150px);
}
</style> -->
<style scoped>
.box1 {
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
.el-image {
  height: 350px;
  width: 100%;
}
</style>
