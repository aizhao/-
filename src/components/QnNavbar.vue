<template>
  <div class="nav">
    <ul>
      <li class="li-left">
        <router-link :to="{ path: '/QnHome' }">首页</router-link>
      </li>
      <li class="li-left">
        <router-link :to="{ path: '/QnRecmend' }">个性推荐</router-link>
      </li>
      <li class="li-left"><a href="/artists">歌手</a></li>
      <li class="li-left"><a href="/charts">排行榜</a></li>
      <li class="li-left"><QnSearchbar></QnSearchbar></li>
      <li class="li-left" id="login">
        <router-link :to="{ path: '/QnAvator' }"
          ><el-avatar :src="uidurl"></el-avatar
        ></router-link>
      </li>
      <li v-show="flag !== 0" class="li-left" id="login">
        <router-link :to="{ path: '/QnLogin' }">登录</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Status } from "@/api/login";
export default {
  data() {
    return {
      flag: 1,
      uidurl: "",
    };
  },
  // 获取登录状态
  mounted() {
    Status().then((res) => {
      console.log(res);
      if (res.data.account.status === 0) {
        this.flag = 0;
        this.uidurl = res.data.profile.avatarUrl;
      }
      else{
        this.$router.push({
        path: "/QnLogin",
      });
      }
    });
  },
};
</script>

<style scoped>
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
  margin-left: 20%;
}
</style>
