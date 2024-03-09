<template>
  <div
    class="search"
    @mousedown="show = true"
    @mouseleave="hide()"
    @mouseenter="show1()"
  >
    <div class="search-box">
      <input
        type="text"
        class="search-txt"
        name=""
        placeholder="请输入歌曲或歌手"
        ref="input1"
        v-model="msg"
        @keyup.enter="goto()"
      />
      <a class="search-btn" @click="goto()"><i class="el-icon-search"></i></a>
    </div>
    <el-card class="box-card" v-show="show == true">
      <el-table
        :data="hotlist"
        class="table"
        style="width: 230px"
        v-show="!msg"
      >
        <el-table-column type="index" :index="indexMethod" width="50">
        </el-table-column>
        <el-table-column label="热门搜索" width="180">
          <template slot-scope="scope">
            <el-link :underline="false" target="_blank" @click="addmsg(scope.row.searchWord)">{{
              scope.row.searchWord
            }}</el-link>
          </template>
        </el-table-column>
      </el-table>
      歌曲：
      <el-table
        :data="suggestlist.songs"
        style="width: 230px"
        :show-header="false"
        v-show="msg"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-link :underline="false" @click="add(scope.row.id)"
              >{{ scope.row.name }}—{{ scope.row.artists[0].name }}</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      歌手：
      <el-table
        :data="suggestlist.artists"
        style="width: 230px"
        :show-header="false"
        v-show="msg"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-link :underline="false" @click="gotosinner(scope.row.id)">{{
              scope.row.name
            }}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { _searchhot } from "@/api/search";
import { _suggest } from "@/api/search";
export default {
  data() {
    return {
      show: false,
      index: 0,
      msg: "",
      hotlist: [],
      suggestlist: [],
    };
  },
  mounted() {
    _searchhot().then((res) => {
      this.hotlist = res.data;
    });
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    show1() {
      this.$refs.input1.style.width = "230px";
      this.$refs.input1.style.padding = "0 6px";
    },
    hide() {
      this.show = false;
      this.$refs.input1.style.width = "0";
      this.$refs.input1.style.padding = "0 ";
    },
    add(id) {
      this.$Addmusic(id, 1);
      this.$store.commit("OpenMask");
    },
    addmsg(Msg) {
      this.msg = Msg;
    },
    goto() {
      this.$router.push({
        path: "/SearchList",
        query: {
          msg: this.msg,
        },
      });
    },
    gotosinner(id) {
      this.$router.push({
        path: "/sinner",
        query: {
          id: id,
        },
      });
    },
  },
  watch: {
    msg(val) {
      if (val) {
        _suggest(val).then((res) => {
          this.suggestlist = res.result;
        });
      }
    },
  },
};
</script>

<style scoped>
.search-box {
  transform: translateY(-50%, -50%);
  background-color: #2f3640;
  height: 30px;
  border-radius: 40px;
  padding: 10px;
}

.search-box:hover > .search-btn {
  background: white;
}

.search-btn {
  cursor: pointer;
  color: #e84118;
  float: right;
  width: 40px;
  height: 30px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}

.box-card {
  height: 500px;
  widows: 300px;
  transition: 0.4s;
}
</style>
