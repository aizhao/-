<template>
  <div class="sinner">
    <el-row>
      <el-col :span="4" v-for="(item, index) in albumslist" :key="index">
        <el-card class="box-card1" shadow="hover" @click="goto(item.id)">
          <el-image
            :src="item.blurPicUrl + '?param=150y150'"
            :fit="cover"
            lazy
          ></el-image>
          <div class="albumsbox">
            <el-tooltip placement="bottom" effect="light" open-delay="500">
              <div slot="content">{{ item.name }}</div>
              <el-link class="albumsName" @click="goto(item.id)">{{
                item.name
              }}</el-link></el-tooltip
            >
          </div>
          <div>
            <el-link class="sinnerName" @click="goto(item.id)">{{
              item.artist.name
            }}</el-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    albumslist: [],
  },
  data() {
    return {};
  },
  methods: {
    goto(id) {
      this.$router.push({
        path: "/Song1List",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.albumsbox :deep(.el-link--inner) {
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.box-card1 {
  height: 230px;
  width: 12em;
  cursor: pointer;
  /* 美化外观，，圆角 */
  border-radius: 20px;
}
.el-col {
  margin: 20px 0px;
  padding: 20px 0px;
}
.albumsName {
  /* 文字居中 */
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.sinnerName {
  font-size: 12px;
  color: #999999;
}
</style>
