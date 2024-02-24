<template>
  <div class="nav">
    <ul>
      <li class="li-left">
        <router-link :to="{ path: '/QnHome' }">首页</router-link>
      </li>
      <li class="li-left">
        <router-link :to="{ path: '/QnRecmend' }">个性推荐</router-link>
      </li>
      <li class="li-left"><router-link :to="{ path: '/QnSinner' }">歌手</router-link></li>
      <li class="li-left"><router-link :to="{ path: '/rankingList' }">排行榜</router-link></li>
      <li class="li-left"><QnSearchbar></QnSearchbar></li>
      <li class="li-left" id="login" v-show="flag===0">
        <el-popover placement="bottom" width="150" trigger="hover">
          <div class="elogin">
            <div class="item">
              <el-button type="info" icon="el-icon-user">个人信息</el-button>
            </div>
            <div class="item">
              <el-button type="danger" icon="el-icon-back" @click="out()">退出登录</el-button>
            </div>
          </div>

          <router-link :to="{ path: '/QnAvator' }" slot="reference"
            ><el-avatar :src="uidurl"></el-avatar
          ></router-link>
        </el-popover>
      </li>
      <li v-show="flag !== 0" class="li-left" id="login">
        <router-link :to="{ path: '/QnLogin' }">登录</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Status } from "@/api/login";
import {logout} from "@/api/login";
export default {
  data() {
    return {
      show: false,
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
    });
  },
  methods: {
    out(){
      logout().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$notify({
          title: '已成功退出',
          type: 'success',
          duration:2000
        });
        this.flag = 1;
        }
      });
    }
  }
};
</script>

<style scoped>
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
