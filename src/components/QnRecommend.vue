<template>
  <div class="box3">
      <el-row>
        <el-col :span="4" v-for="item in relist" :key="item.id"
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
      </el-row>
  </div>
</template>

<script>

export default {
  props: {
    relist: [],
  },
  data() {
    return {
 // 推荐歌单数据
      id: "",
    };
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
  margin-left: 60px;
  text-align: center;
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
