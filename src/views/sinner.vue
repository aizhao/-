<template>
  <div class="Main">
    <div class="singerInformation">
      <div>
        <el-image
          :src="list.img1v1Url + '?param=300y300'"
          fit="scale-down"
          class="block"
          lazy
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div class="describe">
        <div class="tatel_header">
          <p>{{ list.name }}</p>
        </div>
        <div>
          <p v-for="(item, idx) in list.alias" :key="idx">{{ item }}</p>
        </div>
        <div class="introduce">
          <el-collapse @change="handleChange">
            <el-collapse-item name="1">
              <template slot="title">
                <p>介绍:</p>
                <p id="introduce" v-if="show">{{ list.briefDesc }}</p>
                <span id="prompt">{{ prompt }}</span>
              </template>
              <div>{{ list.briefDesc }}</div>
            </el-collapse-item></el-collapse
          >
        </div>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="songs"
          ><SongList :MusicList="MusicList"></SongList
        ></el-tab-pane>
        <el-tab-pane label="评论" name="comment"
          ><Comme :id="id"></Comme
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { _sinner } from "@/api/sinner";
import SongList from "@/components/SongList.vue";
import Comme from "@/components/CommeList.vue";
export default {
  components: {
    SongList: SongList,
    Comme: Comme,
  },
  data() {
    return {
      id: "",
      list: [],
      MusicList: [],
      activeName: "songs",
      prompt: "展开",
      show: true,
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.load();
  },
  methods: {
    handleChange() {
      if (this.prompt === "收起") {
        this.prompt = "展开";
        this.show = true;
      } else {
        this.prompt = "收起";
        this.show = false;
      }
    },
    load() {
      _sinner(this.id).then((res) => {
        this.list = res.artist;
        this.MusicList = res.hotSongs;
      });
    },
  },
};
</script>

<style scoped>
.describe {
  width: 60%;
}
#prompt {
  /* 靠最右边 */
  position: absolute;
  /* display: flex; */
  right: 30px;

  /* margin-left: 30px; */
}
.introduce:deep(.el-collapse-item__header) {
  position: relative;
}
#introduce {
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.introduce {
  margin-top: 20px;
}
.main {
  display: flex;
}
.singerInformation {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.block {
  margin: 40px;
  width: 300px;
  height: 300px;
}
.tatel_header {
  margin-top: 20px;
  height: 30px;

  /* justify-content: center; */
  align-items: center;
}
.tatel_header p {
  /* margin-left: 10px; */
  font-size: 32px;
  font-weight: bold;
}
.ename {
  margin-left: 20px;
}
</style>
