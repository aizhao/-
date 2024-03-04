<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">推荐歌手</el-menu-item>
      <el-submenu index="7">
        <template slot="title">华语歌手</template>
        <el-menu-item index="7-1">华语男歌手</el-menu-item>
        <el-menu-item index="7-2">华语女歌手</el-menu-item>
        <el-menu-item index="7-3">华语乐队/组合</el-menu-item>
      </el-submenu>
      <el-submenu index="96">
        <template slot="title">欧美歌手</template>
        <el-menu-item index="96-1">欧美男歌手</el-menu-item>
        <el-menu-item index="96-2">欧美女歌手</el-menu-item>
        <el-menu-item index="96-3">欧美乐队/组合</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">日本歌手</template>
        <el-menu-item index="8-1">日本男歌手</el-menu-item>
        <el-menu-item index="8-2">日本女歌手</el-menu-item>
        <el-menu-item index="8-3">日本乐队/组合</el-menu-item>
      </el-submenu>
      <el-submenu index="16">
        <template slot="title">韩国歌手</template>
        <el-menu-item index="16-1">韩国男歌手</el-menu-item>
        <el-menu-item index="16-2">韩国女歌手</el-menu-item>
        <el-menu-item index="16-3">韩国乐队/组合</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-tabs v-model="activeName" v-show="area != '1'">
      <el-tab-pane label="热门" name="-1"></el-tab-pane>
      <el-tab-pane label="A" name="a"></el-tab-pane>
      <el-tab-pane label="B" name="b"></el-tab-pane>
      <el-tab-pane label="C" name="c"></el-tab-pane>
      <el-tab-pane label="D" name="d"></el-tab-pane>
      <el-tab-pane label="E" name="e"></el-tab-pane>
      <el-tab-pane label="F" name="f"></el-tab-pane>
      <el-tab-pane label="G" name="g"></el-tab-pane>
      <el-tab-pane label="H" name="h"></el-tab-pane>
      <el-tab-pane label="I" name="i"></el-tab-pane>
      <el-tab-pane label="J" name="j"></el-tab-pane>
      <el-tab-pane label="K" name="k"></el-tab-pane>
      <el-tab-pane label="L" name="l"></el-tab-pane>
      <el-tab-pane label="M" name="m"></el-tab-pane>
      <el-tab-pane label="N" name="n"></el-tab-pane>
      <el-tab-pane label="O" name="o"></el-tab-pane>
      <el-tab-pane label="P" name="p"></el-tab-pane>
      <el-tab-pane label="Q" name="q"></el-tab-pane>
      <el-tab-pane label="R" name="r"></el-tab-pane>
      <el-tab-pane label="S" name="s"></el-tab-pane>
      <el-tab-pane label="T" name="t"></el-tab-pane>
      <el-tab-pane label="U" name="u"></el-tab-pane>
      <el-tab-pane label="V" name="v"></el-tab-pane>
      <el-tab-pane label="W" name="w"></el-tab-pane>
      <el-tab-pane label="X" name="x"></el-tab-pane>
      <el-tab-pane label="Y" name="y"></el-tab-pane>
      <el-tab-pane label="Z" name="z"></el-tab-pane>
    </el-tabs>

    <div>
      <Sinnerlist :sinnerlist="sinnerlist"></Sinnerlist>
    </div>
    <div v-show="area != '1'">
      <el-row>
        <el-col :span="2" v-for="(item, index) in list" :key="index">
          <div class="sinnername">
            <i class="el-icon-user-solid"></i>
            <el-tooltip placement="bottom" effect="light" open-delay="500">
              <div slot="content">{{ item.name }}</div>
              <el-link @click="goto(item.id)" :underline="false">{{
                item.name
              }}</el-link></el-tooltip
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get_sinner } from "@/api/sinner.js";
import { get_hotsinner } from "@/api/sinner.js";
import Sinnerlist from "@/components/sinner/SinnerList.vue";
export default {
  components: {
    Sinnerlist: Sinnerlist,
  },
  data() {
    return {
      activeIndex: "1",
      activeName: "-1",
      area: "1",
      type: "1",
      sinnerlist: [],
      list: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    goto(id) {
      this.$router.push({
        path: "/sinner",
        query: {
          id: id,
        },
      });
    },
    handleSelect(key, keyPath) {
      var str = keyPath.toString();
      this.area = str.charAt(0);
      if (this.area != "1" && this.area != "7" && this.area != "8") {
        this.area = str.slice(0, 2);
      }
      this.type = str.slice(-1);

      this.load();
    },
    load() {
      //    console.log(this.area)
      if (this.area !== "1") {
        get_sinner(60, this.type, this.area, this.activeName).then((res) => {
          this.sinnerlist = res.artists.slice(0, 12);
          this.list = res.artists.slice(12, 60);
        });
      } else {
        get_hotsinner(42).then((res) => {
          this.sinnerlist = res.artists;
        });
      }
    },
  },
  watch: {
    activeName(val) {
      if (val) {
        this.load();
      }
    },
    $route(val) {
      if (val) {
        this.load();
      }
    },
  },
};
</script>

<style scoped>
.sinnername :deep(.el-link--inner) {
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 10px 5px;
}
</style>
