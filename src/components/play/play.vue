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
    val: {
      type:Object,
    },
    idx:Number,
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
      console.log(this.val)
      this.val.toggle();
      console.log(this.val._computedWatchers.audio)
      // eslint-disable-next-line vue/no-mutating-props
    
    },
    next() {
      var idx= this.val.playIndex;
      var len = this.$store.getters.getLen;
      if (idx !== len - 1) {
        // eslint-disable-next-line vue/no-mutating-props
        // this.$emit("update:idx",this.idx+1)
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex++
        this.currplay = idx+1;
      } else {
        console.log("最后一首歌了哦");
      }
    },
    pre() {
      var idx= this.val.playIndex;
      if (idx === 0) {
        console.log("第一首歌了哦");
      } else {
        // this.Paly();
        // this.$store.commit("setpre");
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex--;
        this.currplay = idx-1;
      }
    },
  },
  watch: {
    currplay(newval){
      console.log(newval)
      this.Paly();
    }
  },
};
</script>

<style scoped>
.play {
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
