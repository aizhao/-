<template>
  <div class="box3">
    <el-card class="main-box" shadow="never">
      <h3>推荐歌单</h3>
      <hr width="100%" color="#C165DD" size="2" />
      <el-row>
        <el-col :span="4" v-for="item in reList" :key="item.id"
          ><el-card class="box-card" shadow="hover">
            <el-image style="width: 100%; height: 120px"
              fit="cover"
              :src="item.picUrl+'?param=200y220'" lazy @click="tochilr(item.id)">
            </el-image>
            <div @click="tochilr(item.id)">
              <el-link class="song_name">{{ item.name }}</el-link>
            </div>
          </el-card>
        </el-col>
      </el-row></el-card
    >
  </div>
</template>

<script>
import { _getitemList } from "@/api/music-list";
export default {
  data() {
    return {
      reList: [], // 推荐歌单数据
      id: "",
    };
  },
  created() {
    _getitemList(12).then((res) => {
      this.reList = res.result;
      console.log(this.reList);
    });
    
  },
  methods: {
    tochilr(mid) {
      this.$router.push({
        path: "/Song1List",
        query: {
          id: mid,
        },
      });
    },
  },
};
</script>

<style scoped>
.box3 {
  margin-left: 45px;
  text-align: center;
  height: 450px;
  width: 75%;
}
.main-box{
   /* 圆角 */
   border-radius: 10px;
  /* 边框 */

}
.song_name {
  font-size: 16px;
  text-align: left;
}
.text {
  font-size: 20px;
}
.clearfix:after {
  clear: both;
}
.box-card {
  height: 230px;
  width: 12em;
  /* 圆角 */
  border-radius: 15px;
  /* 边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-col {
  margin: auto 6% 2% 2%;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: #161a21;
}
</style>
