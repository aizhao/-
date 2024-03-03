<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="1"
        >搜索“{{ msg }}”，找到<SongList :MusicList="MusicList"></SongList
      ></el-tab-pane>
      <el-tab-pane label="歌手" name="100">
        <Sinnerlist :sinnerlist="sinnerlist"></Sinnerlist>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="10">
        <albumslist :albumslist="albumslist"></albumslist>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000"
        >搜索“{{ msg }}”，找到<songslist :MusicList="MusicList"></songslist
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SongList from "@/components/SongList.vue";
import Sinnerlist from "@/components/sinner/SinnerList.vue";
import albumslist from "@/components/albums/albumslist";
import { _search } from "@/api/search";
import songslist from "@/components/songslist";
export default {
  components: {
    SongList: SongList,
    Sinnerlist: Sinnerlist,
    albumslist: albumslist,
    songslist: songslist,
  },
  data() {
    return {
      msg: "",
      activeName: "1",
      MusicList: [],
      sinnerlist: [],
      albumslist: [],
    };
  },
  methods: {
    search() {
      _search(this.msg, this.activeName).then((res) => {
        if (this.activeName == "1") this.MusicList = res.result.songs;
        else if (this.activeName == "100") this.sinnerlist = res.result.artists;
        else if (this.activeName == "10") this.albumslist = res.result.albums;
        else this.MusicList = res.result.playlists;
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
    },
  },
};
</script>

<style></style>
