<template>
  <div class="play">
    <el-tooltip class="item" effect="dark" content="上一首" placement="top">
      <el-button
        icon="iconfont icon-shangyishouge"
        circle
        @click="pre()"
      ></el-button
    ></el-tooltip>
    <el-tooltip class="item" effect="dark" content="播放" placement="top">
      <el-button icon="iconfont icon-bofang" circle @click="Paly()"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="下一首" placement="top">
      <el-button
        icon="iconfont icon-xiayishou"
        circle
        @click="next()"
      ></el-button
    ></el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    val: {},
  },
  data() {
    return {
      currplay: 0,
      media: "",
    };
  },
  mounted() {},
  methods: {
    Paly() {
      console.log(this.val);
        this.val.toggle();
    },
    next() {
      var song = this.val._data.internalMusic;
      var idx = this.$store.getters.getIdx(song);
      this.$store.commit("setIdx", idx);
      var len = this.$store.getters.getLen;
      if (idx === len - 1) {
        console.log("最后一首歌了哦");
      } else {
        this.$store.commit("setnext");

        // console.log(this.$store.getters.getIdx)

        this.Paly();
        console.log(this.$store.getters.getidx);
      }
    },
    pre() {
      var song = this.val._data.internalMusic;
      var idx = this.$store.getters.getIdx(song);
      this.$store.commit("setIdx", idx);
      if (idx === 0) {
        console.log("第一首歌了哦");
      } else {
        this.Paly();
        this.$store.commit("setpre");
      }
    },
  },
  watch: {},
};
</script>

<style scope>
.play {
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
