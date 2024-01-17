<template>
  <div class="box3">
    <el-card class="main-box" shadow="never">
      <h3>推荐歌单</h3>
      <hr width="100%" color="#C165DD" size="2" />
      <el-row>
        <el-col :span="4" v-for="item in reList" :key="item.id"
          ><el-card class="box-card" shadow="hover">
            <el-image
              style="width: 100%; height: 120px"
              fit="cover"
              :src="item.picUrl"
            />
            <div @click="tochilr(item.id)">
              <p class="song_name">{{ item.name }}</p>
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
