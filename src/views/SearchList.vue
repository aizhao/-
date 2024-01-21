<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="1"
        >搜索“{{ msg }}”，找到<SongList :MusicList="MusicList"></SongList
      ></el-tab-pane>
      <el-tab-pane label="歌手" name="100">
        <Sinnerlist :sinnerlist="sinnerlist"></Sinnerlist>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="10"></el-tab-pane>
      <el-tab-pane label="视频" name="1014"></el-tab-pane>
      <el-tab-pane label="歌词" name="1006"></el-tab-pane>
      <el-tab-pane label="歌单" name="1000"></el-tab-pane>
      <el-tab-pane label="用户" name="1002"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SongList from "@/components/SongList.vue";
import Sinnerlist from '@/components/sinner/SinnerList.vue'
import { _search } from "@/api/search";
export default {
  components: {
    SongList: SongList,
    Sinnerlist:Sinnerlist
  },
  data() {
    return {
      msg: "",
      activeName: "1",
      MusicList: [],
      sinnerlist: [],
    };
  },
  methods: {
    search() {
      _search(this.msg, this.activeName).then((res) => {
        console.log(res);
        if (this.activeName == "1") this.MusicList = res.result.songs;
        else if(this.activeName == "100") this.sinnerlist = res.result.artists
      });
    },
  },
  mounted() {
    this.msg = this.$route.query.msg;
    this.search();
  },
  watch: {
    activeName(val) {
      if (val) {
        this.search();
      }
    },
    $route(val) {
        if (val) {
        this.search();
      }
    }
  },
};
</script>

<style></style>
