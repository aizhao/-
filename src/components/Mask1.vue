<template>
  <div
    id="mask"
    ref="myElement"
    :style="{
      backgroundImage: 'url(' + this.val.internalMusic.pic + ') ',
    }"
  >
    <div class="close">
      <el-page-header @back="goBack" content="歌曲详情"> </el-page-header>
    </div>
    <div class="title">
      <p>{{ val.internalMusic.title }}</p>
      <el-link @click="goto(val.internalMusic.artistid)">{{
        val.internalMusic.artist
      }}</el-link>
    </div>

    <div class="he">
      <div class="circle-image">
        <record :url="val.internalMusic.pic" :val="val"></record>
      </div>

      <el-row type="flex" justify="center" class="lyric-contain">
        <el-col :span="23" class="song-lyric" :style="lyricMove">
          <el-row v-for="(item, index) in lyric" :key="index" class="lyric-row"
            ><el-link
              :style="{
                'font-size': index == currentRow ? '1.3rem' : '.9rem',
                color: index == currentRow ? 'red' : 'white',
              }"
              @click="changecurrent(item.time)"
              >{{ item.text }}</el-link
            ></el-row
          >
        </el-col>
      </el-row>
    </div>
    <div class="menu">
      <el-tooltip class="item" effect="dark" :content="like" placement="top">
        <el-button :icon="likeicon" circle @click="Liked()"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="top">
        <el-badge
          :value="CommentList.total > 999 ? '999+' : CommentList.total"
          class="item"
        >
          <el-button
            icon="el-icon-chat-dot-square"
            @click="Goto()"
            circle
          ></el-button> </el-badge
      ></el-tooltip>
      <el-tooltip class="item" effect="dark" content="下载" placement="top">
        <el-button icon="el-icon-download" @click="Goto()" circle></el-button>
      </el-tooltip>
      <el-popover placement="top" width="25" trigger="hover">
        <div style="display: flex; justify-content: center">
          <volume_slider :val="val"></volume_slider>
        </div>
        <el-button
          :icon="icon_volume"
          circle
          slot="reference"
          @click="volume()"
          class="item"
        ></el-button>
      </el-popover>
      <el-tooltip class="item" effect="dark" :content="play" placement="top">
        <el-button :icon="playmode" circle @click="mode_Change"></el-button>
      </el-tooltip>
    </div>
    <div class="slider">
      <slider :val="val"></slider>
    </div>
    <div class="play">
      <el-tooltip class="item" effect="dark" content="上一首" placement="top">
        <el-button
          icon="iconfont icon-shangyishouge"
          circle
          @click="pre()"
          size="medium"
        ></el-button
      ></el-tooltip>
      <el-tooltip class="item" effect="dark" content="播放" placement="top">
        <el-button
          :icon="icon"
          circle
          @click="Paly()"
          size="medium"
        ></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下一首" placement="top">
        <el-button
          icon="iconfont icon-xiayishou"
          circle
          @click="next()"
          size="medium"
        ></el-button
      ></el-tooltip>
    </div>
  </div>
</template>

<script>
import record from "@/components/record";
import slider from "@/components/slider";
import volume_slider from "@/components/volume_slider";

import { _getcomment } from "@/api/music-list";
import { likemusic } from "@/api/music-list";
export default {
  components: {
    record: record,
    slider: slider,
    volume_slider: volume_slider,
  },
  props: {
    val: {
      type: Object,
    },
  },
  data() {
    return {
      id: "",
      icon: "iconfont icon-zanting",
      currplay: 0,
      media: "",
      lyric: [],
      currentRow: 0,
      lyricMove: {
        top: "20px",
      },
      curren: "",
      CommentList: [],
      liked: false,
      like: "添加到我的喜欢",
      likeicon: "iconfont icon-aixin",
      icon_volume: "iconfont icon-zhongdengyinliang",
      playmode: "iconfont icon-suijibofang",
      play: "顺序播放",
    };
  },
  created() {
    console.log(this.$store.state.palylist[0].pic);
    console.log(this.val);
    //传入初始歌词文本text
    this.FormatLrc();
  },
  mounted() {},
  methods: {
    Goto() {
      this.$message.error("功能暂未开发！");
    },
    mode_Change() {
      this.val.setNextMode();
    },
    volume() {
      this.val.toggleMute();
    },
    Liked() {
      var li = this.$store.getters.getli(this.id);
      var flag = li >= 0 ? false : true;

      likemusic(this.id, flag).then((res) => {
        if (res.code === 200) {
          if (flag === true) {
            this.$store.commit("addlike", this.id);
            this.likeicon = "iconfont icon-aixin1";
            this.like = "移除我的喜欢";
            this.$message({
              message: "已加入我的喜欢",
              type: "success",
            });
          } else {
            this.$store.commit("poplike", li);
            this.likeicon = "iconfont icon-aixin";
            this.like = "添加到我的喜欢";
            this.$message({
              message: "已移除我的喜欢",
              type: "success",
            });
          }
        }
      });
    },
    goto(id) {
      this.$router.push({
        path: "/sinner",
        query: {
          id: id,
        },
      });
      this.goBack();
    },
    CommentLoad() {
      _getcomment(this.id).then((res) => {
        this.CommentList = res;
      });
    },
    FormatLrc() {
      this.lyric = [];
      this.id = this.$store.state.palylist[this.val.playIndex].uid;
      this.CommentLoad();
      this.loadlike();
      var text = this.$store.state.palylist[this.val.playIndex].lrc;
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
    },
    sortRule(a, b) {
      //设置一下排序规则

      return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
    },
    goBack() {
      this.$store.commit("CloseMask");
    },
    changecurrent(Time) {
      // eslint-disable-next-line vue/no-mutating-props
      this.val.audio.currentTime = Time;
    },
    Paly() {
      this.val.toggle();
    },
    next() {
      var idx = this.val.playIndex;
      var len = this.$store.getters.getLen;
      if (idx !== len - 1) {
        // eslint-disable-next-line vue/no-mutating-props
        // this.$emit("update:idx",this.idx+1)
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex++;
        this.currplay = idx + 1;
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex = 0;
        this.currplay = 0;
        this.$message({
          showClose: true,
          message: "已从列表第一首开始播放",
        });
      }
      setTimeout(() => {
        this.val.audio.play();
      }, 100);
    },
    pre() {
      var idx = this.val.playIndex;
      var len = this.$store.getters.getLen;
      if (idx === 0) {
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex = len - 1;
        this.currplay = len - 1;
        this.$message({
          showClose: true,
          message: "已从列表最后一首开始播放",
        });
      } else {
        // this.Paly();
        // this.$store.commit("setpre");
        // eslint-disable-next-line vue/no-mutating-props
        this.val.playIndex--;
        this.currplay = idx - 1;
      }
      setTimeout(() => {
        this.val.audio.play();
      }, 100);
    },
    loadlike() {
      if (this.$store.getters.getli(this.id) >= 0) {
        this.likeicon = "iconfont icon-aixin1";
        this.like = "移除我的喜欢";
      } else {
        this.likeicon = "iconfont icon-aixin";
        this.like = "添加到我的喜欢";
      }
    },
  },
  watch: {
    currplay(newval) {
      console.log(newval);
      this.Paly();
    },
    "val.currentMusic.src": {
      handler(val) {
        this.FormatLrc();
        this.curren = Math.ceil(this.val.playStat.playedTime);
        console.log(val);
        console.log(this.curren);
      },
      deep: true,
    },
    "val.playStat.playedTime": {
      handler(newval) {
        this.lyric.forEach((element, index) => {
          if (Math.ceil(newval) == element.time) {
            this.lyricMove.top = -index * 2 + 6 + "rem";
            this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
          }
        });
      },
      deep: true,
    },
    "val.isPlaying": {
      handler(newval) {
        if (newval) {
          this.icon = "iconfont icon-zanting";
        } else {
          this.icon = "iconfont icon-bofang";
        }
      },
      deep: true,
    },
    "val.internalVolume": {
      handler(newval) {
        if (newval === 0) this.icon_volume = "iconfont icon-guanbishengyin";
        else if (newval > 0 && newval <= 0.5)
          this.icon_volume = "iconfont icon-zhongdengyinliang";
        else this.icon_volume = "iconfont icon-zuidayinliang";
      },

      deep: true,
    },
    "val.internalMuted": {
      handler(newval) {
        if (newval === true) this.icon_volume = "iconfont icon-guanbishengyin";
        else {
          if (this.val.internalVolume === 0)
            this.icon_volume = "iconfont icon-guanbishengyin";
          else if (
            this.val.internalVolume > 0 &&
            this.val.internalVolume <= 0.5
          )
            this.icon_volume = "iconfont icon-zhongdengyinliang";
          else this.icon_volume = "iconfont icon-zuidayinliang";
        }
      },

      deep: true,
    },
    "val.repeatMode": {
      handler(newval) {
        if (newval === "repeat-one") {
          this.playmode = "iconfont icon-media_repeat_one";
          this.play = "单曲循环";
        } else if (newval === "no-repeat") {
          this.playmode = "iconfont iconfont icon-media_shuffle";
          this.play = "随机播放";
        } else {
          this.playmode = "iconfont icon-suijibofang";
          this.play = "顺序播放";
        }
      },

      deep: true,
    },
    // "val.internalMusic.pic": {
    //   handler(newval) {
    //     if (newval) {
    //       const element = this.$refs.myElement; // 获取到元素的引用

    //       // 使用CSS样式设置背景图片
    //       element.style.background =
    //         "url(" + this.val.internalMusic.pic + ") no-repeat center";
    //     }
    //   },
    // },
    // "$store.state.mask": {
    //   handler(newval) {
    //     if (newval) {
    //       const element = this.$refs.myElement; // 获取到元素的引用

    //       // 使用CSS样式设置背景图片
    //       element.style.background =
    //         "url(" + this.val.internalMusic.pic + ") no-repeat center";
    //     }
    //   },
    // },
  },
};
</script>

<style scoped>
p {
  color: white;
}
.title {
  display: flex;
  /* 纵向排列 */
  flex-direction: column;
  /* 居中 */
  align-items: center;
  justify-content: center;
}
.slider {
  margin: 0 10%;
}
.title p {
  font-size: 30px;
  margin-block-start: 0.23em;
  margin-block-end: 0.23em;
}
.title:deep(.el-link.el-link--default) {
  color: white;
}
.lyric-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33rem;
  width: 600px;
  overflow-y: scroll;
  margin-left: 150px;
  margin-top: 20px;
}
.lyric-row {
  height: 3rem;
}

.close:deep(.el-page-header__title) {
  color: white;
  font-size: 20px;
}
.close:deep(.el-page-header__content) {
  color: white;
  font-size: 20px;
}

.close:deep(.el-icon-back) {
  color: white;
  font-size: 20px;
}
.close:deep(.el-page-header) {
  padding-top: 20px;
  padding-left: 10px;
}
.song-lyric {
  white-space: pre-wrap;
  white-space: pre-line;
  position: absolute;
  transition: 1s;
}
.he {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 58%;
  margin-left: 50px;
}
#mask {
  position: relative;
  /* background-color: rgb(255, 255, 255); */
  z-index: 2;
  opacity: 1;
  margin: 0;
  padding: 0;
  height: 100%;
  background-size: cover;
  background-position: center center;
  /* background: rgb(0,0,0,.6); */
}
#mask::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
  z-index: -1;
  /* filter: grayscale(1); */
  /* _webkit-filter: grayscale(1); */
  /* filter: blur(5px); */
  /* background-color: #504d4d; */
  /* opacity: 0.5; */
  backdrop-filter: blur(150px);
}
#mask::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* opacity: 0.1; */
  /* _webkit-filter: grayscale(1); */
  /* filter: blur(5px); */
  background: rgb(0, 0, 0, 0.4);
  /* opacity: 0.5; */
  /* backdrop-filter: blur(150px); */
}
.play {
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu:deep(.el-button.is-circle) {
  height: 55px;
  width: 55px;
}
.menu:deep(.el-badge__content.is-fixed) {
  top: 10px;
  right: 20px;
}
.menu:deep(.el-button) {
  font-size: 25px;
}
.menu:deep(.icon-aixin1:before) {
  color: red;
}
.menu:deep(.iconfont) {
  font-size: 25px;
}
.item {
  margin: 25px;
}
.play:deep(.el-button.is-circle) {
  height: 55px;
  width: 55px;
}
.play:deep(.iconfont) {
  font-size: 20px;
}
</style>
<style>
.el-popover {
  min-width: 10px;
}
</style>
