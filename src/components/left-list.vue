<template>
  <div class="box">
    <ul class="List">
      <p id="te">推荐</p>
      <li>
        <i class="el-icon-headset"
          ><el-link id="name" @click="Goto()" :underline="false"> 发现音乐</el-link></i
        >
      </li>
      <li>
        <i class="el-icon-mobile-phone"
          ><el-link id="name" @click="Goto()" :underline="false">推荐视频</el-link></i
        >
      </li>
    </ul>
    <ul class="List">
      <p id="te">我的音乐</p>
      <li>
        <i class="el-icon-cloudy"
          ><el-link id="name" @click="Goto()" :underline="false">我的音乐云盘</el-link></i
        >
      </li>
    </ul>
    <el-collapse v-model="activename" @change="handleChange">
      <el-collapse-item name="1" class="mylist">
        <template slot="title">
          <p id="title">我的歌单</p>
          <span id="prompt">{{ prompt }}</span>
        </template>
        <ul class="list">
          <li v-for="(item, index) in list" :key="index">
            <div class="list1">
              <el-avatar :src="item.coverImgUrl + '?param=100y100'"></el-avatar>
              <el-link id="name" @click="goto(item.id)" :underline="false">{{
                item.name
              }}</el-link>
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <!-- <ul class="list">我的歌单
    <li v-for="item in list" :key="item.id">
         <div class="list1"><el-avatar :src="item.coverImgUrl"></el-avatar>
          <el-link href="https://element.eleme.io" target="_blank" id="name">{{item.name}}</el-link>
       </div>
    </li>
   </ul> -->
  </div>
</template>

<script>
import { _getUserList } from "@/api/music-list";
import { _getMusicList } from "@/api/music-list";
export default {
  data() {
    return {
      list: [], // 推荐歌单数据
      activename: "1",
      prompt: "收起",
    };
  },
  mounted() {
    let uid = localStorage.getItem("uid");
    if (uid)
      _getUserList(uid, 5).then((res) => {
        this.list = res.playlist;
        console.log(this.list[0].id);
        this.liked(this.list[0].id);
      });
    else {
      this.$router.push({
        path: "/QnLogin",
      });
    }
  },
  methods: {
    handleChange() {
      if (this.prompt === "收起") this.prompt = "展开";
      else this.prompt = "收起";
    },
    goto(id) {
      this.$router.push({
        path: "/Song1List",
        query: {
          id: id,
        },
      });
    },
    Goto() {
      this.$message.error("功能正在开发");
    },
    liked(id) {
      _getMusicList(id).then((res) => {
        var like = [];
        for (let i = 0; i < res.privileges.length; i++) {
          like.push(JSON.parse(JSON.stringify(res.privileges[i].id)));
        }
        this.$store.commit("setlike", like);
      });
    },
  },
};
</script>

<style scoped>
#te {
  font-size: 16px;
  /* font-weight: 600; */
}
#title {
  margin-left: 10px;
  font-size: 16px;
  /* font-weight: 600; */
}
#name {
  text-align: left;
  margin-left: 14px;
  line-height: 1;
}
.mylist {
  padding-inline-start: 0px;
}
.mylist:deep(.el-collapse-item__header) {
  position: relative;
}
.List {
  margin: 0 10px;
  padding-inline-start: 0px;
}
.list1 {
  display: flex;
  flex-direction: row;
}
.box {
  height: 100%;
  width: 95%;
  overflow-y: auto;
  /* padding: 10px; */
  /* margin-top: 20px; */
}
ul li {
  height: 50px;
  margin: 10px 20px;
  /* padding: 10px 15px; */
  list-style-type: none;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: rgb(228, 228, 228);
}
.list {
  padding-inline-start: 0px;
}
#prompt {
  /* 靠最右边 */
  position: absolute;
  /* display: flex; */
  right: 30px;

  /* margin-left: 30px; */
}
</style>
