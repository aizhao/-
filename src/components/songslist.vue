<template>
  <div class="songs">
    <div class="tableheader">
      <p>共{{ MusicList.length }}首歌单</p>
    </div>
    <div class="songstable">
      <el-table
        v-loading="loading"
        :data="
          MusicList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        stripe
        style="width:1000px"
      >
        <el-table-column type="index" :index="indexMethod"> </el-table-column>
        <el-table-column width="50"
          ><template slot-scope="scope">
            <el-button size="small" circle @click="goto(scope.row.id)"
              ><i class="iconfont icon-bofang"> </i></el-button
          ></template>
        </el-table-column>
        <el-table-column width="80"
          ><template slot-scope="scope">
            <el-avatar
              :size="60"
              :src="scope.row.coverImgUrl + '?param=75y75'"
              @error="errorHandler"
              shape="square"
            ></el-avatar
          ></template>
        </el-table-column>
        <el-table-column width="300">
          <template slot-scope="scope">
            <el-link @click="goto(scope.row.id)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <p id="font">{{ scope.row.trackCount }}首</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <el-link>by{{ scope.row.creator.nickname }}</el-link>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <p id="font">收藏：{{ scope.row.bookCount }}</p>
          </template>
        </el-table-column>
        <el-table-column width="250">
          <template slot-scope="scope">
            <p id="font">播放：{{ scope.row.playCount }}</p>
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
export default {
  props: {
    MusicList: [],
  },
  data() {
    return {
      Color: "black",
      loading: true,
      currentPage: 1, // 初始页
      pagesize: 10,
      level: "standard",
      num: 0,
    };
  },
  watch: {
    MusicList(val) {
      console.log(val);
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    errorHandler() {
      return true;
    },
    goto(id) {
      this.$router.push({
        path: "/Song1List",
        query: {
          id: id,
        },
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

<style>
.el-pagination {
  margin: 20px 40px;
}
.el-icon-video-play {
  font-size: 18px;
}
#font {
  color: #999999;
}
</style>
