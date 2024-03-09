<template>
  <div class="nav">
    <ul>
      <li class="li-left">
        <router-link :to="{ path: '/QnHome' }">首页</router-link>
      </li>
      <li class="li-left">
        <router-link :to="{ path: '/QnRecmend' }">个性推荐</router-link>
      </li>
      <li class="li-left">
        <router-link :to="{ path: '/QnSinner' }">歌手</router-link>
      </li>
      <li class="li-left">
        <router-link :to="{ path: '/rankingList' }">排行榜</router-link>
      </li>
      <li class="li-left"><QnSearchbar></QnSearchbar></li>
      <li class="li-left" id="login" v-show="!flag">
        <el-popover placement="bottom" width="150" trigger="hover">
          <div class="elogin">
            <div class="item">
              <el-button type="info" icon="el-icon-user" @click="Goto()"
                >个人信息</el-button
              >
            </div>
            <div class="item">
              <el-button type="danger" icon="el-icon-back" @click="out()"
                >退出登录</el-button
              >
            </div>
          </div>

          <router-link  :to="{ path: '/' }" slot="reference"
            ><el-avatar   :src="uidurl"></el-avatar
          ></router-link>
        </el-popover>
      </li>
      <li  class="li-left" id="login" v-show="flag">
        <el-link   @click="Show()">登录</el-link>
      </li>
    </ul>
    <div class="login" ref="lo1">
    <login ref="lo" :flag.sync="flag"></login></div>
  </div>
</template>
<script>
import { logout } from "@/api/login";
import login from '@/components/login'
export default {
  data() {
    return {
      show: false,
      flag: true,
      uidurl: "",
    };
  },
  components: {
    login:login
  },
  // 获取登录状态
  mounted() {
    this.load()
  },
  methods: {
    load(){
      var u =localStorage.getItem("uid")
    if(u){
      this.uidurl=localStorage.getItem('avatar')
      this.flag=false
    }
    else{
      this.flag=true
    }
    },
    Show(){
      console.log(this.$refs.lo)
      this.$refs.lo.fl="true"
      // this.$refs.lo.$refs.lo1.style='display:flex;';
      // this.$refs.lo1.style='display:block;';
    },
    Goto() {
      this.$message.error("功能暂未开发！");
    },
    out() {
      logout().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$notify({
            title: "已成功退出",
            type: "success",
            duration: 2000,
          });
          this.flag = 1;
          localStorage.clear();
          this.$store.state.uid="";
          // this.$router.push({
          //   path: "/QnLogin",
          // });
        }
      });
    },
  },
  watch: {
    "$store.state.uid"(Val) {
      if (Val) {
       this.load()
      } 
    },

  },
};
</script>

<style scoped>
/* .login{
  display: none;
} */
.elogin {
  display: flex;

  align-items: center;

  flex-direction: column;
}

.item {
  margin: 3px;
}
.nav {
  height: 80px;
  /* 添加下边框 */
  border-bottom: 1px solid #ccc;
  /* 给导航栏添加背景色 */
  background-color: #fff;
  /* 给导航栏添加圆角 */
  border-radius: 5px;
  /* 给导航栏添加边框 */

  /* 给导航栏添加��影 */
}

div ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

div ul .li-left {
  float: left;
  padding: 14px 34px;
}
div ul .li-left a {
  display: block;
  color: #fff;
  color: black;
  margin: 0 20px;
  padding: 14px 34px;
  text-align: center;
  text-decoration: none;
}
div ul .li-left:not(#login) a:hover {
  background-color: #01affd;
  border-radius: 20px 20px;
}
img {
  height: 35px;
  margin: -8px -18px;
}
#login {
  margin-right: 50px;
  float: right;
}
</style>
