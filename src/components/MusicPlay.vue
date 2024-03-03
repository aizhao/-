<template>
  <div>
    <aPlayer :songInfo="songInfo" />
  </div>
</template>
<script>
import aPlayer from "@/components/Aplayer.vue";
export default {
  components: {
    aPlayer: aPlayer,
  },
  data() {
    return {
      id: "",
      level: "standard",
      songInfo: {
        title: "我爱祖国.mp3", //歌曲名称
        artist: "123", //演唱者
        lrc: "", //LRC 歌词或者歌词文件的 URL
        pic: "", //封面图片 URL
        src: "", //音频文件的 URL
      },
    };
  },
  created() {
    this.songInfo.src = this.$route.query.url1;
    this.load();
  },
  methods: {
    load() {},
  },
};
</script>

<style></style>
