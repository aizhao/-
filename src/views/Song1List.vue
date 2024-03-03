<template>
  <div class="box">
    <div class="header">
      <div>
        <el-skeleton style="width: 240px" :loading="Loading">
          <template slot="template">
            <el-skeleton-item
              variant="image"
              style="width: 250px; height: 250px"
            />
          </template>
        </el-skeleton>
        <el-image
          v-if="list.coverImgUrl"
          :src="coverImgUrl + '?param=300y300'"
          fit="scale-down"
          class="block"
          v-loading="Loading"
          :preview-src-list="srcList"
          @error="error()"
          lazy
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
          <!-- <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div> -->
        </el-image>
      </div>

      <div class="tatel">
        <div class="tatel_header">
          <i class="el-icon-service"></i>
          <p>{{ list.name }}</p>
        </div>

        <!-- <div>
          <div class="box-card1"> -->
        <div class="avator">
          <el-avatar
            shape="square"
            size="medium"
            v-if="list.creator"
            :src="list.creator.avatarUrl + '?param=36y36'"
          ></el-avatar>
          <p v-if="list.creator">{{ list.creator.nickname }}</p>
          <p>{{ Time }}</p>
          <p>创建</p>
        </div>
        <div class="buttom">
          <el-button
            icon="el-icon-caret-right"
            size="medium"
            type="primary"
            round
            @click="play()"
            >播放全部</el-button
          >
          <el-button
            icon="el-icon-s-comment"
            size="medium"
            type="info"
            round
            @click="goto()"
            >评论({{ list.commentCount }})</el-button
          >
        </div>
        <div class="label">
          <p>标签：</p>
          <ul>
            <li v-for="(item, index) in list.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="description">
          <el-collapse @change="handleChange">
            <el-collapse-item name="1">
              <template slot="title">
                <p>介绍:</p>
                <p id="introduce" v-if="show">{{ list.description }}</p>
                <span id="prompt">{{ prompt }}</span>
              </template>
              <div>{{ list.description }}</div>
            </el-collapse-item></el-collapse
          >
        </div>
      </div>
    </div>
    <div id="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first"
          ><SongList :MusicList="piclist"></SongList
        ></el-tab-pane>
        <el-tab-pane label="评论" name="second"
          ><Comme :id="id"></Comme
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { _getMusicList } from "@/api/music-list";
import moment from "moment";
import SongList from "@/components/SongList.vue";
import { songdetail } from "@/api/music-list";
import Comme from "@/components/CommeList.vue";
export default {
  props: {
    Id: {
      type: String,
    },
  },
  components: {
    SongList: SongList,
    Comme: Comme,
  },
  data() {
    return {
      id: this.Id,
      list: [],
      MusicList: [],
      Time: "暂无",
      loading: true,
      activeName: "first",
      piclist: [],
      s: "",
      prompt: "展开",
      show: true,
      coverImgUrl: "",
      srcList: [],
    };
  },
  computed: {
    Loading() {
      return this.coverImgUrl ? false : true;
    },
  },
  mounted() {
    if (!this.id) this.id = this.$route.query.id;
    this.load();
  },
  methods: {
    // error() {
    //   console.log(this.coverImgUrl);
    //   this.coverImgUrl = this.list.coverImgUrl;
    //   this.$forceUpdate();
    // },
    handleChange() {
      if (this.prompt === "收起") {
        this.prompt = "展开";
        this.show = true;
      } else {
        this.prompt = "收起";
        this.show = false;
      }
    },
    play() {
      for (let i = 0; i < this.MusicList.length; i++) {
        this.$Addmusic(this.MusicList[i].id, 0);
      }
    },
    goto() {
      this.activeName = "second";
    },
    load() {
      _getMusicList(this.id).then((res) => {
        this.list = res.playlist;
        this.coverImgUrl = res.playlist.coverImgUrl;
        this.srcList.push(this.coverImgUrl);
        this.MusicList = this.list.tracks;
        let num = this.list.createTime;
        this.Time = moment(num).format("YYYY-MM-DD");
        this.getpic();
      });
    },
    getpic() {
      for (let i = 0; i < this.MusicList.length; i++) {
        if (i != this.MusicList.length - 1)
          this.s = this.s + this.MusicList[i].id + ",";
        else this.s = this.s + this.MusicList[i].id;
      }

      this.get_pic();
    },
    get_pic() {
      songdetail(this.s).then((res) => {
        this.piclist = res.songs;
      });
    },
  },
};
</script>

<style scoped>
#introduce {
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
h2 {
  display: inline;
}
h1 {
  width: 250px;
}
.description {
  line-height: 2;
  font-size: 25px;
}
.el-tabs {
  margin: 20px 40px;
}
.buttom {
  margin: 10px 0;
}
ul {
  color: #656565;
  padding-left: 0;
  font-size: 15px;
}
ul li {
  margin: 0 10px;
  padding: 0 1px;
  list-style-type: none;
  display: inline;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(228, 228, 228);
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
  color: #656565;
}

.avator {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  margin: 10px 0;
}
.avator p {
  margin-left: 14px;
}
.header {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
}
.block {
  /* display: inline; */
  margin: 40px;
  width: 300px;
  height: 300px;
}
.tatel {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 60%;
  height: 20%;
  text-align: left;
  justify-content: space-around;
  margin-top: 25px;
}
.label {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
  margin: 10px 0;
}
.label ul {
  /* margin-left: 10px; */
}
.tatel_header {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  margin: 10px 0;
}
.tatel_header p {
  margin-left: 20px;
  font-size: 22px;
  font-weight: bold;
}
:deep(.el-icon-service) {
  font-size: 25px;
}
#tabs:deep(.el-tabs__item) {
  height: 40px;
  margin: 10px 0;
}
#prompt {
  /* 靠最右边 */
  position: absolute;
  /* display: flex; */
  right: 30px;

  /* margin-left: 30px; */
}
.description:deep(.el-collapse-item__header) {
  position: relative;
}
</style>
