<template>
  <div id="app">
    <SongMask
      :val.sync="val"
      class="mask"
      v-show="this.$store.getters.getmask"
    ></SongMask>
    <el-container class="contain" v-show="!this.$store.getters.getmask">
      <floatButton
        @handlepaly="handleaudioplay"
        style="cursor: pointer"
      ></floatButton>
      <el-header height="10%"><QnNavbar></QnNavbar> </el-header>
      <el-container>
        <el-aside width="18%"><left-list></left-list></el-aside>
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"
          /></keep-alive>
          <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
        </el-main>

        <el-radio-group v-model="direction"> </el-radio-group>

        <el-button @click="open()" style="margin-left: 16px">
          <p class="name">音乐列表({{ this.$store.state.palylist.length }})</p>
        </el-button>
        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          size="25%"
          withHeader:false
          @open="open1()"
        >
          <play :val.sync="val"></play>
          <aPlayer
            ref="media"
            :songInfo="this.$store.state.palylist[index]"
            :key="this.$store.state.key"
            :list="this.$store.getters.getPlaylist"
          />
        </el-drawer>
      </el-container>
    </el-container>
    <div v-show="!this.$store.getters.getmask"><copyright></copyright></div>
  </div>
</template>

<script>
import copyright from "@/components/copyright-icp.vue"
import aPlayer from "@/components/Aplayer.vue";
import play from "@/components/play/play.vue";
import floatButton from "@/components/float-button.vue";
// 引入searchlist.vue
export default {
  components: {
    aPlayer: aPlayer,
    play: play,
    floatButton: floatButton,
    copyright:copyright,
  },
  data() {
    return {
      val: {},
      num: 0,
      pic: "",
      level: "standard",
      drawer: false,
      direction: "rtl",
      song: {},
      index: 0,
    };
  },
  created() {
    this.num = 1;
  },
  mounted() {
    // const contain=this.$refs.contain;
    // // 屏幕高度
    // contain.style.height=document.body.clientHeight+'px';
  },
  methods: {
    handleaudioplay() {
      var len = this.$store.getters.getLen;
      if (len === 0) {
        this.$message({
          message: "还没有添加任何歌曲哦",
          type: "warning",
          showClose: true,
        });
      } else {
        this.$store.commit("OpenMask");
      }
    },
    open1() {
      this.$nextTick(() => {
        this.val = this.$refs.media.$children[0];
        this.$store.commit("setval", this.val);
      });
    },
    open() {
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
  },
  watch: {
    "$store.state.palylist"(Val) {
      if (Val.length == 1) {
        this.open();
        setTimeout(() => {
          this.close();
        }, 800);
      } else {
        this.open1();
      }
    },
    "val.playIndex": {
      handler(newval) {
        this.index = newval;
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
:deep(.operation-wrapper) {
  width: 100% !important;
}
.mask {
  transition: 1s;
}
:deep(.el-drawer.rtl) {
  height: 100%;
  /* top: 30%; */
  opacity: 0.9;
  background-image: url();
  /* 圆角 */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
:deep(.el-header) {
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  padding: 0;
}
.name {
  position: relative;
  top: -15%;
}
.el-aside {
  position: fixed;
  height: 100vh;
  /* margin-top: 5%; */
  padding-top: 5%;
  overflow-y: auto;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: rgb(228, 228, 228);
}
.el-main {
  margin-top: 5%;
  margin-left: 20%;
  padding: 0 16px !important;
  height: 100%;
  overflow-y: hidden;
  /* 鼠标移入0.4s后向上移入，透明度变为1 */
}
/* .el-footer {
  position: fixed;

  width: 100%;
  z-index: 3;
  bottom: 0;
  overflow-y: auto;
  opacity: 0;
  transition: all 0.4s 0.2s;
  transform: translateY(800px) scale(1 0);
}
.el-footer:hover {
  transform: none;
  opacity: 1;
} */
</style>
