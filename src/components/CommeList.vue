<template>
  <div class="momment">
    <div class="tableheader">
      <h2>评论</h2>
    </div>
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      label=""
      width="150px">
      <template slot-scope="scope">
        <div class="avatar">
        <el-avatar :src="scope.row.user.avatarUrl"></el-avatar>
          <p>{{ scope.row.user.nickname }}</p></div>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      width="1000px">
      <template slot-scope="scope">
        <div>
          <p>{{ }}</p>
          <p>{{ scope.row.content}}</p>
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {commentList} from '@/api/music-list'
import moment from "moment";
export default {
  props: {
    id:String
  },
  data() {
    return{
      list:[],
      Time:0
    }
  },
  created() {
    commentList(this.id,50).then(res => {
      console.log(res)
      this.list = res.comments
    })
  }

  

}
</script>

<style>
.momment{
  margin-top: 10px;
  height: 120%;
}
.avatar{
  text-align: center;
  width: 100px;
  height: 100px;
}
</style>