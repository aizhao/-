<template>
  <div class="songs">
    <div class="tableheader">
      <h2>歌曲列表</h2>
      <p>共{{ MusicList.length }}首歌</p>
    </div>
    <div class="songstable">
      <el-table
        v-loading="loading"
        :data="
          MusicList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        stripe
        style="width: 100%"
        max-height="750px"
      >
        <el-table-column type="index" :index="indexMethod"> </el-table-column>
        <el-table-column width="60" >
          <el-button type="primary" size="small" circle
            ><i class="el-icon-video-play"> </i
          ></el-button>
        </el-table-column>
        <el-table-column prop="name" label="歌曲标题" width="280" >
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="180" >
          <template slot-scope="scope">
            <span>{{ dayjs(scope.row.dt).format("mm:ss") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar.0.name" label="歌手"  width="160"> </el-table-column>
        <el-table-column prop="al.name" label="专辑"  width="260"> </el-table-column>
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
export default {
  props: {
    MusicList: [],
  },
  data() {
    return {
      dayjs: dayjs,
      loading: true,
      currentPage: 1, // 初始页
      pagesize: 10,
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
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

<style>
.el-pagination{
    margin: 20px 40px;
}
h2 {
  display: inline;
}
.songs {
  width: 100%;
  height: 120%;
}
.tableheader {
  margin: 20px 40px;
}
.bo {
  position: relative;
  left: 75%;
  color: red;
}
.songstable {
  margin: 20px 40px;
}
.songs p {
  margin-left: 20px;
  display: inline;
  font-size: 15px;
  color: #656565;
}
.el-icon-video-play {
  font-size: 18px;
}
</style>
