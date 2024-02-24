<template>
  <div class="body">
    <div class="paddle" ref="paddle">
      <img src="../assets/needle-ip6.png" />
    </div>
    <div class="player" ref="player">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
      <span style="--i: 8"></span>
      <div class="scan" ref="scan"></div>
      <div class="profile">
        <el-image :src="url+'?param=200y200'" class="Img"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    val: {
      type: Object,
    },
  },
  watch: {
    "val.isPlaying": {
      handler(Val) {
        const paddle = this.$refs.paddle;
        const player = this.$refs.player;
        const scan = this.$refs.scan;
        if (Val === true) {
            paddle.style.transform = "";
          paddle.style.transform = "rotate(0deg);";
          // peddle.style.transform="rotate(-40deg);"
          player.style.animationPlayState = "running";
          scan.style.animationPlayState='running';
          player.style.animation = "rotate 8s linear infinite";
        } else {
          paddle.style.transform = "rotate(-40deg)";
          player.style.animationPlayState = "paused";
          scan.style.animationPlayState='paused';
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.body {
  display: flex;
  flex-direction: column;
  /* /* justify-content: center; */
  align-items: center;
  min-height: 50vh;
}
.paddle {
  width: 150px;
  height: 100px;
  position: relative;
  left: 50px;
  z-index: 2;
  transition: 1s;
  transform-origin: 9.263px 17.792px;
}
/* .paddle:hover{
    transform: rotate(0deg);

} */
/* .paddle:hover~.player{
    animation: rotate 8s linear infinite;
    animation-delay: 1s;
} */
.paddle img {
  width: 150px;
}
.Img {
  width: 200px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
}
.player {
  width: 300px;
  height: 300px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  animation: rotate 8s linear infinite;
}
.player span {
  position: absolute;
  inset: calc(5.5px * var(--i));
  background: transparent;
  border: 1px dashed #444;
  border-radius: 50%;
  box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
    inset 5px 5px 35px rgba(0, 0, 0, 0.25);
}
.player .scan {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border-top: 1px dashed #fff;
  background: seagreen;
  filter: blur(30px) drop-shadow(20px 20px seagreen);
  animation: rotate 2s linear infinite;
  transform-origin: top left;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
