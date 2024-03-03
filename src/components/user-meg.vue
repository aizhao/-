<template>
  <div class="box2">
    <el-card class="box-card" shadow="never">
      <el-avatar shape="square" :size="100" :src="ImgUrl"></el-avatar>
      <p>
        {{ nickname }}<br />Lv.{{ grade }}<br />听歌数目：{{ listenSongs
        }}<br /><br />{{ Time }}
      </p>
      <div class="des-box">
        <h3>个人介绍</h3>
        <div class="description">{{ description }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetUser } from "@/api/login";
import moment from "moment";
export default {
  data() {
    return {
      nickname: "用户",
      ImgUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      Time: "暂未登录",
      grade: 0,
      listenSongs: 0,
      description: "暂无介绍",
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let token = localStorage.getItem("token");
      if (token) {
        this.ImgUrl = localStorage.getItem("avatar");
        const uid = localStorage.getItem("uid");
        GetUser(uid).then((res) => {
          this.nickname = res.profile.nickname;
          const num = res.profile.createTime;
          this.Time = moment(num).format("YYYY-MM-DD");
          this.grade = res.level;
          this.listenSongs = res.listenSongs;
          this.description = res.profile.signature;
        });
      }
    },
  },
};
</script>

<style scoped>
.des-box {
  position: relative;
  top: -100px;
}
h3 {
  text-align: center;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: rgb(228, 228, 228);
}
.description {
  text-align: left;
  margin-top: 20px;
}
.box2 {
  width: 50%;
  margin: 20px;
  margin-left: 50px;
}
.box-card {
  width: 100%;
  height: 100%;
  /* 圆角 */
  border-radius: 10px;
  /* 边框 */
}
p {
  font-weight: 700;
  position: relative;
  left: 120px;
  top: -120px;
}
</style>
