<template>
  
  <div class="box">
    
    <div class="header">
      <QnBanner class="banner"></QnBanner>
    </div>
    <UserMeg></UserMeg>
    <h3>推荐歌单</h3>
      <hr width="100%" color="#C165DD" size="2" />
    <QnRecommend :relist="relist"></QnRecommend>
    <SinnerList></SinnerList>
  </div>
</template>

<script>
import QnBanner from "@/components/QnBanner.vue";
import UserMeg from "@/components/user-meg.vue";
import SinnerList from "@/components/sinnnerlist.vue";
import { _getitemList } from "@/api/music-list";
export default {
  name: "QnHome",
  components: {
    UserMeg: UserMeg,
    SinnerList: SinnerList,
    QnBanner: QnBanner,
  },
  data() {
    return {
      relist:[]
    };
  },
  created() {
    _getitemList(12).then((res) => {
      this.relist = res.result;
      console.log(this.reList);
    });
    
  },
};
</script>

<style scoped>
.box {
  margin: auto 0 0 -90px;
  display: flex;
  flex-wrap: wrap;
   /* 圆角 */
   border-radius: 10px;
  /* 边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.header {
  height: 400px;
  width: 80%;
  background-color: #fff;
}
.banner {
  top: 20px;
}
h3{
  margin-left: 90px;
}
</style>
