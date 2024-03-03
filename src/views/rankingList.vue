<template>
  <div class="Rank">
    <div>
      <el-tabs tab-position="top">
        <el-tab-pane
          stretch="true"
          v-for="item in list"
          :key="item.id"
          :lazy="true"
        >
          <div slot="label" class="rank-tab">
            <el-avatar
              :size="90"
              :src="item.coverImgUrl + '?param=90y90'"
              @error="errorHandler"
              shape="square"
            ></el-avatar>
            <el-tooltip placement="right" effect="light" :open-delay="500">
              <div slot="content">{{ item.name }}</div>
              <div class="rank_name">
                {{ item.name }}
                <p>{{ item.updateFrequency }}</p>
              </div></el-tooltip
            >
          </div>
          <div>
            <Song1List :Id="item.id.toString()"></Song1List>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { get_rank } from "@/api/music-list";
import Song1List from "@/views/Song1List";
export default {
  components: {
    Song1List: Song1List,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      get_rank().then((res) => {
        this.list = res.list;
      });
    },
    errorHandler() {
      return true;
    },
  },
};
</script>

<style scoped>
.rank-tab {
  display: flex;
  height: 120px;
}
.rank_name {
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rank_name p {
  color: #999999;
}
:deep(.el-tabs__nav-prev) {
  top: 20px;
}
:deep(.el-tabs__nav-next) {
  top: 20px;
  color: black;
}
:deep(.el-tabs__nav-wrap.is-scrollable) {
  padding: 0 40px;
}
:deep(.el-tabs__item) {
  height: 120px;
}
</style>
