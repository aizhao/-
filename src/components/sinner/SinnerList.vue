<template>
  <div class="sinner">
    <el-row>
      <el-col :span="4" v-for="(item, index) in sinnerlist" :key="index">
        <el-card class="box-card1" shadow="hover" @click="goto(item.id)">
          <el-image
            :src="item.img1v1Url + '?param=150y150'"
            fit="cover"
            lazy
          ></el-image>
          <div>
          <el-link class="sinnerName" @click="goto(item.id)" :underline="false">{{ item.name }}</el-link></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    sinnerlist: [],
  },
  data() {
    return {};
  },
  methods:{
    goto(id){
      this.$router.push({
        path: "/sinner",
        query: {
          id: id,
        },
      });
    }
  }
};
</script>

<style scoped>

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
.sinnerName{
    /* 文字居中 */
    font-size: 16px;
    text-align: center;
    
}
</style>
