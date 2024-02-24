<template>
  <div class="songs">

    <div class="tableheader">
      <p>共{{ MusicList.length }}首歌</p>
    </div>
    <div class="songstable">
      <el-table
        v-loading="loading"
        :data="
          piclist.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        stripe
        style="width:1000px height: 750px;"
      >
        <el-table-column type="index" :index="indexMethod"> </el-table-column>
        <el-table-column width="50"
          ><template slot-scope="scope">
            <el-button size="small" circle @click="Goto(scope.row.id)"
              ><i class="iconfont icon-bofang"> </i></el-button
          ></template>
        </el-table-column>
        <el-table-column width="80"
          ><template slot-scope="scope">
            <el-avatar
              :size="60"
              :src="scope.row.al.picUrl + '?param=75y75'"
              @error="errorHandler"
              shape="square"
            ></el-avatar
          ></template>
        </el-table-column>
        <el-table-column label="歌曲标题" width="200">
          <template slot-scope="scope">
            <el-link @click="goto(scope.row.id)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="200">
          <template slot-scope="scope">
            <span>{{ dayjs(scope.row.dt).format("mm:ss") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手" width="260">
          <template slot-scope="scope">
            <el-link
              @click="goto(scope.row.id)"
              target="_blank"
              v-for="(item, idx) in scope.row.ar.slice(
                0,
                scope.row.ar.length > 3 ? 2 : scope.row.ar.length - 1
              )"
              :key="idx"
              >{{ item.name }}/</el-link
            >
            <el-link
              v-if="scope.row.ar.length < 4"
              @click="goto(scope.row.id)"
              target="_blank"
              >{{ scope.row.ar[scope.row.ar.length - 1].name }}</el-link
            >
            <el-link
              v-if="scope.row.ar.length > 3"
              @click="goto(scope.row.id)"
              target="_blank"
              >{{ scope.row.ar[2].name }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="专辑" width="360">
          <template slot-scope="scope">
            <el-link href="https://element.eleme.io" target="_blank">{{
              scope.row.al.name
            }}</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[1, 3, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes,  prev, pager, next, jumper"
        :total="MusicList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { CheckMusic } from "@/api/Music-Play";
import { songdetail } from "@/api/music-list";
export default {
  props: {
    MusicList: [],
  },
  data() {
    return {
      Color: "black",
      dayjs: dayjs,
      list: [],
      loading: true,
      currentPage: 1, // 初始页
      pagesize: 10,
      level: "standard",
      songInfo: {
        title: "", //歌曲名称
        artist: " ", //演唱者
        src: "", //音频文件的 URL
        pic: "",
        lrc: "", //LRC 歌词或者歌词文件的 URL
        theme: "",
      },
      num: 0,
      piclist: this.MusicList,
    };
  },
  watch: {
    MusicList(val) {
      console.log(val);
      this.getpic();
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
   
  },
  methods: {
    getpic() {
      var s = "";
      for (let i = 0; i < this.MusicList.length; i++) {
        if (i != this.MusicList.length - 1) s = s + this.MusicList[i].id + ",";
        else s = s + this.MusicList[i].id;
      }
      console.log(s);
      songdetail(s).then((res) => {
        console.log(res);
        this.piclist = res.songs;
        console.log(this.piclist);
      });
    },
    errorHandler() {
      return true;
    },
    Goto(id){
      this.$store.commit('OpenMask')
      CheckMusic(id).then((res) => {
        if (res.success === true) {
          console.log(this.$store.state.palylist)
          if(this.$store.state.palylist.length===0||this.$store.state.palylist[0].uid!==id) {
            this.$Addmusic(id,1);

          }
       
          
        } else {
          this.$alert("亲爱的，暂无版权", "抱歉", {
            confirmButtonText: "返回",
            callback: () => {
              this.$message({
                type: "info",
              });
            },
          });
        }
      });
      
    },
    updateCurrent(){
      
    },

    goto(id) {
      CheckMusic(id).then((res) => {
        if (res.success === true) {
          this.$Addmusic(id,1);
          console.log(this.$store.state.palylist);
        } else {
          this.$alert("亲爱的，暂无版权", "抱歉", {
            confirmButtonText: "返回",
            callback: () => {
              this.$message({
                type: "info",
              });
            },
          });
        }
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size; //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage; //点击第几页
    },
  },
  // 解决打开弹窗 el-table 抖动问题
};
</script>

<style scoped>
:deep(.el-pagination) {
  margin: 20px 40px;
}
h2 {
  display: inline;
}
.songs {
  height: 120%;
}
.fen {
  width: 1px;
}
.songs p {
  margin-left: 20px;
  display: inline;
  font-size: 15px;
  color: #656565;
}
:deep(.el-icon-video-play) {
  font-size: 18px;
}
</style>
