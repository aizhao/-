<template>
  <div class="recmend">
    <div class="recmend-tion">
      <div class="image">
        <el-image
          :src="MusicList[0].al.picUrl + '?param=200y200'"
          fit="fill"
          class="block"
          lazy
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div class="describe">
        <div class="tatel_header1">
          <p id="cold">今日为你推荐:</p>
          <el-link  target="_blank" type="primary" class="tuijian" @click="add(MusicList[0].id)">{{
              MusicList[0].name
            }} </el-link> <el-button type="primary" icon="iconfont icon-bofang" class="bofang" @click="add(MusicList[0].id)">播放</el-button>
            <div class="mreason">
            <div class="reason"> <p>{{ MusicList[0].reason}} </p></div>
            <el-link id="inf">{{ MusicList[0].ar[0].name }}</el-link>
            <el-link id="inf">{{ MusicList[0].al.name }}</el-link>
          </div>
    
        </div>
      
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="songs"
          ><SongList :MusicList="MusicList"></SongList
        ></el-tab-pane>
        <el-tab-pane label="歌单" name="list"
          ><commend :relist="relist"></commend
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { recmendsongs } from "@/api/music-list";
import SongList from "@/components/SongList.vue";
import commend from "@/components/QnRecommend.vue";
import { recmendlist } from "@/api/music-list";
export default {
  components: {
    SongList: SongList,
    commend: commend,
  },
  data() {
    return {
      ImgUrl: "",
      MusicList: [],
      activeName: "songs",
      relist: [],
    };
  },
  created() {
    this.loadsongs();
  },
  methods: {
    add(id){
      this.$Addmusic(id,1);
    },
    loadsongs() {
      this.ImgUrl = localStorage.getItem("avatar");
      recmendsongs().then((res) => {
        console.log(res);
        this.MusicList = res.data.dailySongs;
      });
    },
    loadlist() {
      recmendlist().then((res) => {
        console.log(res);
        this.relist = res.recommend;
      });
    },
  },
  watch: {
    activeName(val) {
      if (val == "songs") {
        this.loadsongs();
      } else if (val == "list") {
        this.loadlist();
      }
    },
  },
};
</script>

<style scoped>

.bofang{
  margin-left: 10px;
}
#inf{
  margin-left: 10px;

}
.tatel_header1 p{
  margin: 10px 0;
}
.mreason{
  display:flex;
  margin: 10px 0;
}
.tatel_header1 a{
  margin: 10px 0;
}
.tatel_header1 button{
  margin: 10px 5px;
}
.describe{
  margin-top: 30px;
}
.recmend-tion {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
#cold{
    font-size: 32px;
}
.reason p{
  padding: 3px;
  font-size: 16px !important;
  color: rgb(239, 45, 45);
  background-color: rgb(225, 148, 170);
  border-radius: 5px;
}
.tuijian{
  font-size: 30px;
 
}
.block {
  margin: 40px;
  width: 200px;
  height: 200px;
}
.describe{
  width: 90%;
}

.ename {
  margin-left: 20px;
}
</style>
