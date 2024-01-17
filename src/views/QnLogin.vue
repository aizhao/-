<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input
          type="text"
          name="phone"
          placeholder="请输入您的手机号"
          class="input-item"
          v-model="phone"
        />
        <p>{{ phoneMessage }}</p>
        <input
          type="password"
          name="password"
          placeholder="请输入您的密码"
          class="input-item"
          v-model="password"
        />
        <el-alert title="密码错误" type="error" show-icon v-if="pwdMessage">
        </el-alert>
        <el-button type="primary" class="btn" @click="login"
          >立即登录</el-button
        >
        <p class="btn1">没有账号？<a href="#/QnRegister">立即注册</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { _login } from "@/api/login";

export default {
  name: "QnLogin",
  data() {
    return {
      phone: "",
      password: "",
      phoneMessage: "",
      pwdMessage: 0,
    };
  },
  methods: {
    login() {
      _login(this.phone, this.password).then((res) => {
        if (res.code != 200) {
          this.$message({
            message: "用户名或密码错误",
            type: "warning",
          });
          this.pwdMessage++;
          return;
        } else {
          console.log(res);
          localStorage.clear();
          localStorage.setItem("info", 1);
          localStorage["flag"] = 1;
          sessionStorage.clear();
          sessionStorage.setItem("userid", res.profile.userId);
          sessionStorage["token"] = JSON.stringify(res.token);
          this.$store.commit("addUser", res);
          localStorage.setItem("cookie", res.cookie);
          localStorage.setItem("avatar", res.profile.avatarUrl);
          localStorage.setItem("uid", res.profile.userId);
          localStorage.setItem("token", res.token);
          this.$cookies.set("token", res.token);
          this.$message({
            message: "登陆成功",
            type: "success",
          });
          this.$router.push({ path: "QnHome" });
          // this.$bus.$emit("pullResource", res.data.cookie);
        }
      });
    },
    /**手机号码验证 */
  },
};
</script>

<style scoped>
html {
  height: 100%;
}
body {
  height: 100%;
}
.container {
  /* margin-top: 5%; */
  height: 880px;
  width: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #fff;
  width: 258px;
  height: 358px;
  border-radius: 15px;
  padding: 0 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  margin-top: 10px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.btn1 {
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 12px;
  color: #a6c1ee;
}
.msg {
  text-align: center;
  line-height: 88px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
