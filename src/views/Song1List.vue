<template>
  <div class="box">
    <div class="header">
      <div>
        <el-image :src="url" fit="scale-down" class="block">
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
            :src="creator.avatarUrl"
          ></el-avatar>
          <p>{{ creator.nickname }}</p>
          <p>{{ Time }}</p>
          <p>创建</p>
        </div>
        <div class="buttom">
          <el-button
            icon="el-icon-caret-right"
            size="medium"
            type="primary"
            round
            >播放</el-button
          >
          <el-button icon="el-icon-s-comment" size="medium" type="info" round
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
          <v-clamp autoresize :max-lines="4">
            介绍：{{ list.description }}</v-clamp
          >
        </div>
        <!-- </div>
        </div> -->
      </div>
    </div>
    <SongList :MusicList="MusicList"></SongList>
    <Comme :id="id"></Comme>
  </div>
</template>

<script>
import { _getMusicList } from "@/api/music-list";
import moment from "moment";
import SongList from "@/components/SongList.vue";
export default {
  components: {
    SongList: SongList,
  },
  data() {
    return {
      id: 0,
      url: "",
      list: [],
      MusicList: [],
      Time: "暂无",
      creator: [],
      loading: true,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.load();
  },
  methods: {
    load() {
      _getMusicList(this.id).then((res) => {
        console.log(res);
        if (res.code === 406) return;
        this.list = res.playlist;
        this.MusicList = this.list.tracks;
        this.url = this.list.coverImgUrl;
        this.creator = this.list.creator;
        let num = this.list.createTime;
        this.Time = moment(num).format("YYYY-MM-DD");
      });
    },
  },
};
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 92%;
  width: 85%;
}
h2 {
  display: inline;
}
h1 {
  width: 250px;
}
.description {
  line-height: 2;
  font-size: 15px;
  color: #656565;
}
.buttom {
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
.box-card1 p {
}
.box-card1 {
  width: 30%;
  height: 300px;
}
.avator {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.avator p{
  margin-left: 14px;
}
.header {
  margin: 20px 40px;
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
  height: 300px;
  text-align: left;
  justify-content: space-around;
}
.label {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
}
.label ul {
  /* margin-left: 10px; */
}
.tatel_header {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.tatel_header p{
  margin-left: 20px;
  font-size: 22px;
  font-weight: bold;
}
.el-icon-service {
  font-size: 25px;
}
</style>
