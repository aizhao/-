<template>
  <div class="box">
    <div class="header">
      <div>
        <el-image
          :src="list.coverImgUrl + '?param=300y300'"
          fit="scale-down"
          class="block"
          lazy
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
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
            :src="list.creator.avatarUrl + '?param=36y36'"
          ></el-avatar>
          <p>{{ list.creator.nickname }}</p>
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
          <el-collapse>
            <el-collapse-item title="介绍：点击展开" name="1">
              <div>{{ list.description }}</div>
            </el-collapse-item></el-collapse
          >
        </div>
      </div>
    </div>
    <div id="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first"
          ><SongList :MusicList="MusicList"></SongList
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
export default {
  props: {
    Id: {
      type: String,
    },
  },
  components: {
    SongList: SongList,
  },
  data() {
    return {
      id: this.Id,
      list: [],
      MusicList: [],
      Time: "暂无",
      loading: true,
      activeName: "first",
    };
  },
  created() {
    if (!this.id) this.id = this.$route.query.id;
    this.load();
  },
  methods: {
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
        console.log(res);
        if (res.code === 406) return;
        this.list = res.playlist;
        this.MusicList = this.list.tracks;
        let num = this.list.createTime;
        this.Time = moment(num).format("YYYY-MM-DD");
      });
    },
  },
};
</script>

<style scoped>
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
</style>
