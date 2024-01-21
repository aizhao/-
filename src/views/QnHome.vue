<template>
  <div class="box">
    <div class="header">
      <QnBanner class="banner"></QnBanner>
    </div>
    <UserMeg></UserMeg>
    <QnRecommend></QnRecommend>
    <SinnerList></SinnerList>
  </div>
</template>

<script>
import QnBanner from "@/components/QnBanner.vue";
import UserMeg from "@/components/user-meg.vue";
import SinnerList from "@/components/sinnnerlist.vue";
export default {
  name: "QnHome",
  components: {
    UserMeg: UserMeg,
    SinnerList: SinnerList,
    QnBanner: QnBanner,
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
</style>
