<template>
  <div class="box">
    <ul class="List">
      推荐
      <li>
        <i class="el-icon-headset"
          ><el-link :to="{ path: '/QnHome' }" id="name">发现音乐</el-link></i
        >
      </li>
      <li>
        <i class="el-icon-mobile-phone"
          ><el-link :to="{ path: '/QnHome' }" id="name">推荐视频</el-link></i
        >
      </li>
    </ul>
    <ul class="List">
      我的音乐
      <li>
        <i class="el-icon-cloudy"
          ><el-link :to="{ path: '/QnHome' }" id="name"
            >我的音乐云盘</el-link
          ></i
        >
      </li>
    </ul>
    <el-collapse>
      <el-collapse-item title="我的歌单" name="1" class="mylist">
        <ul class="list">
          <li v-for="(item,index) in list" :key="index">
            <div class="list1">
              <el-avatar :src="item.coverImgUrl + '?param=100y100'"></el-avatar>
              <el-link
  
              
                id="name"
                @click="goto(index)"
                >{{ item.name }}</el-link
              >
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
export default {
  data() {
    return {
      list: [], // 推荐歌单数据
    };
  },
  mounted() {
    let uid = localStorage.getItem("uid");
    _getUserList(uid, 5).then((res) => {
      this.list = res.playlist;
      console.log(res);
    });
  },
  methods: {
    goto(index) {
      this.$router.push({
        path: "/Song1List",
        query: {
          id: this.list[index].id,
        },
      });
    },
  },
};
</script>

<style scoped>
#name {
  text-align: left;
  margin-left: 14px;
  line-height: 1;
}
.mylist {
  padding-inline-start: 0px;
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
</style>
