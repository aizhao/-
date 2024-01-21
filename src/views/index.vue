<template>
  <el-container>
    <el-header height="10%"><QnNavbar></QnNavbar>
    </el-header>
    <el-container>
      <el-aside width="18%"><left-list></left-list></el-aside>
      <el-main>
        <keep-alive> <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"/></keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>
      </el-main>

      <el-radio-group v-model="direction">
        </el-radio-group
      >

      <el-button
        @click="open()"
        style="margin-left: 16px"
      >
        音乐列表({{ this.$store.state.palylist.length }})
      </el-button>
      <el-drawer  :visible.sync="drawer" :direction="direction" size="25%" withHeader:false>
        <play :val.sync="val"></play>
        <aPlayer
          ref="media"
          :songInfo="this.$store.getters.getlist"
          :key="this.$store.state.key"
          :list="this.$store.getters.getPlaylist"
          
        />
      </el-drawer>
    </el-container>
  </el-container>
</template>

<script scope>
import aPlayer from "@/components/Aplayer.vue";
import play from '@/components/play/play.vue'
// 引入searchlist.vue
export default {
  components: {
    aPlayer: aPlayer,
    play:play,
  },
  data() {
    return {
      val:{},
      num: 0,
      pic:'',
      level: "standard",
      drawer: false,
      direction: "rtl",
      song:{},
    };
  },
  created() {
    
      console.log(this.val)
  },
  methods: {
    open(){
      this.drawer=true
      this.val=this.$refs.media.$children[0]
    
    
      // this.pic=this.$store.state.palylist[0].pic
    }
  },
};
</script>
<style>
.operation-wrapper {
  width: 100% !important;
}

.el-drawer.ltr, .el-drawer.rtl {
    height: 100%;
    /* top: 30%; */
    opacity:0.9;
    background-image: url();
    /* 圆角 */
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}
.el-header {
  position: fixed;
  width: 100%;
  z-index: 3;
  top: 0;
  padding: 0;
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
