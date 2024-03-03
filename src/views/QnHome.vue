<template>
  <div class="box">
    <div class="header">
      <QnBanner class="banner"></QnBanner>
    </div>
    <!-- <UserMeg></UserMeg> -->
    <h3>推荐歌单</h3>
    <hr width="100%" color="#C165DD" size="2" />

    <QnRecommend :relist="relist"></QnRecommend>
    <hr width="100%" color="#C165DD" size="2" />
    <!-- <div class="bo"><SinnerList></SinnerList> -->
    <!-- <UserMeg></UserMeg> -->
    <!-- </div> -->
  </div>
</template>

<script>
import QnBanner from "@/components/QnBanner.vue";
// import UserMeg from "@/components/user-meg.vue";
// import SinnerList from "@/components/sinnnerlist.vue";
import { _getitemList } from "@/api/music-list";
export default {
  name: "QnHome",
  components: {
    // UserMeg: UserMeg,
    // SinnerList: SinnerList,
    QnBanner: QnBanner,
  },
  data() {
    return {
      relist: [],
    };
  },
  mounted() {
    _getitemList(20).then((res) => {
      this.relist = res.result;
    });
  },
};
</script>

<style scoped>
.bo {
  display: flex;
  width: 100%;
}
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
  height: 370px;
  width: 100%;
  background-color: #fff;
}
.banner {
  top: 20px;
}
h3 {
  margin-left: 90px;
}
</style>
