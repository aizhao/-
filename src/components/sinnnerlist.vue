<template>
  <div class="sinner">
    <el-row>
      <h3>歌手榜<br /></h3>
      <el-col :span="6"><a href="#" @click="count = 1">华语</a></el-col>
      <el-col :span="6"><a href="#" @click="count = 2">欧美</a></el-col>
      <el-col :span="6"><a href="#" @click="count = 3">韩国</a></el-col>
      <el-col :span="6"><a href="#" @click="count = 4">日本</a></el-col></el-row
    >
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      style="overflow: auto"
      infinite-scroll-immediate="false"
    >
      <li
        v-for="(i, index) in list"
        :key="index"
        class="infinite-list-item"
        @click="goto(i.id)"
      >
        <h4>{{ index + 1 }}.</h4>
        <el-avatar :src="i.picUrl + '?param=50y40'"> </el-avatar
        ><el-link @click="goto(i.id)">{{ i.name }} </el-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { _getSinnerList } from "@/api/music-list";
export default {
  data() {
    return {
      count: 0,
      list: [],
      num: 0,
    };
  },
  watch: {
    count(NewVal) {
      _getSinnerList(NewVal).then((res) => {
        this.list = res.list.artists;
      });
    },
  },
  created() {
    this.count = 1;
  },
  methods: {
    load() {
      this.nums++;
    },
    goto(id) {
      this.$router.push({
        path: "/sinner",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
h4 {
  position: relative;
  top: -12px;
  left: -15px;
  display: inline-block;
}
h3 {
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(228, 228, 228);
  margin-bottom: 30px;
}
.sinner {
  position: relative;
  left: 60px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(228, 228, 228);
  height: 900px;
  width: 40%;
  /* 圆角 */
  border-radius: 10px;
  /* 边框 */
  overflow: auto;
  margin: 20px;
}
a {
  position: relative;
  top: -15px;
  margin: auto 20px;
  text-decoration: none;
  color: #161a21;
}
.box-card {
  width: 220px;
  height: 70px;
}
.infinite-list {
  list-style-type: none;
  float: left;
  height: 75%;
  width: 310px;
}

.el-col a {
  display: block;
  color: #161a21;
  text-align: center;
  text-decoration: none;
}
.el-col :hover {
  background-color: #01affd;
  border-radius: 20px 20px;
}
</style>
