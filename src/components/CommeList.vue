<template>
  <div class="momment">
    <el-table
      :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 1000px height: 750px"

    >
      <el-table-column label="" width="100px">
        <template slot-scope="scope">
          <div class="avatar">
            <el-avatar :src="scope.row.user.avatarUrl"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="" width="1300px">
        <template slot-scope="scope">
          <div class="nc">
            <a @click="moment1">{{ scope.row.user.nickname }}:</a
            >{{ scope.row.content }}
          </div>
          <div class="rp">
            <div class="time">{{ moment1(scope.row.time) }}</div>
            <a @click="liked(scope.$index)"> <i class="icon-ala-039_dianzan5" :style="{color:Color(scope.row.liked)}"></i>({{ scope.row.likedCount
 }})</a>
          </div>
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
      :total="list.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { commentList } from "@/api/music-list";
import moment from "moment";
export default {
  props: {
    id: String,
  },
  data() {
    return {
      list: [],
      currentPage: 1, // 初始页
      pagesize: 10,
      f:0
    };
  },
  created() {
    commentList(this.id, 50).then((res) => {
      console.log(res);
      this.list = res.comments;
    });

  },
  methods: {
    moment1(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    handleSizeChange: function (size) {
      this.pagesize = size; //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage; //点击第几页
    },
    liked(index){
      if(this.list[index].liked!==true)
      {this.list[index].likedCount++
      this.list[index].liked=true}
      else{
        this.list[index].likedCount--
      this.list[index].liked=false
      }
    },
    Color(f){
      if(f===true) return "Red"
      return "black"
    }
  },
};
</script>

<style scoped>
.momment {
  height: 120%;
  width: 100%;
}
.avatar {
  text-align: center;
  width: 100px;
  height: 100px;
}
.el-pagination {
  margin: 20px 40px;
}
.nc a {
  cursor: pointer;
  color: blue;
}
.nc a:hover {
  /* 字体变蓝，出现下划线 */
  text-decoration: underline;
}
.rp {
  margin-top: 45px;
  text-align: right;
}
.nc {
  width: 60%;
  text-align: left;
}
.time {
  font-size: 12px;
  float: left;
  margin: 0 !important;
  color: #999;
}
.rp a{
  margin-right: 30px;
  text-decoration: none;
    color: #333;
    cursor: pointer;
}
.rp i{
  font-size: 25px;
}
.rp i:hover{
  color: #fdfdfd;
}
</style>
