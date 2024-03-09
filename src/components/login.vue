<template>
  <div class="container" ref="lo1" v-show="fl">
    <div class="fanhui" @click="show()">
      <i class="el-icon-close"></i>
    </div>
    <div class="fanhui1" @click="show()">
      <i class="el-icon-close"></i>
    </div>
    <div class="div-description">
      <!-- <div class="img" ref="qrCodeUrl"></div> -->
      <div ref="qrCodeUrl1" v-if="url" @click="update" style="cursor: pointer;"></div>
      <span>更多体验可使用网易云音乐app扫码登录~</span>
    </div>
    <div class="div-form">
      <form action="" class="form-login">
        <h1>login</h1>
        <input type="text" placeholder="帐号" v-model="phone" class="input" />
        <input
          type="password"
          placeholder="密码"
          v-model="password"
          class="input"
        />
        <el-button class="submit" @click="login()">Login</el-button>
        <div class="control">
          <span>没有帐号？<a href="#">Register</a></span>
        </div>
      </form>
      <form action="" class="form-register disappear">
        <h1>Register</h1>

        <input
          type="text"
          name="nickname"
          placeholder="请输入昵称"
          v-model="nickname"
          class="input"
        /><i class="el-icon-refresh" @click="huan()" v-if="rev"></i>

        <input type="text" placeholder="帐号" v-model="phone" class="input" />
        <input
          type="password"
          placeholder="密码"
          v-model="password"
          class="input"
        />
        <div class="yan">
          <input
            type="text"
            name="verify"
            placeholder="请输入验证码"
            class="op"
            v-model="verify"
          />
          <el-button
            v-if="!disabled"
            type="primary"
            @click="send()"
            :disabled="disabled"
            size="mini"
            >发送验证码</el-button
          >
          <el-button
            v-if="disabled"
            type="primary"
            :disabled="disabled"
            size="medium"
            >{{ countDown }}秒发送</el-button
          >
        </div>
        <el-button @click="check_phone()" class="submit">Register</el-button>
        <div class="control">
          <span>已有帐号？<a href="#">Login</a></span>
        </div>
      </form>
    </div>
    <div class="div-description">
      <div ref="qrCodeUrl" v-if="url" @click="update" style="cursor: pointer;"></div>
      <!-- <img id="qrImg1" :src="qrurl" v-if="qrurl" /> -->
      <span>更多体验可使用网易云音乐app扫码登录~</span>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { _login } from "@/api/login";
import { check_register } from "@/api/login";
import { verify_captcha } from "@/api/login";
import { Register } from "@/api/login";
import { send_captcha } from "@/api/login";
import { check_nickname } from "@/api/login";
import { get_key } from "@/api/login";
import { get_info } from "@/api/login";
import { check_info } from "@/api/login";
import { Status } from "@/api/login";
export default {
  props: {
    flag: Boolean,
    default() {
      return {};
    },
  },
  name: "QnLogin",
  data() {
    return {
      phone: "",
      password: "",
      phoneMessage: "",
      pwdMessage: 0,
      verify: "",
      deadline: Date.now() + 1000 * 60,
      disabled: false,
      countDown: 60,
      nickname: "",
      idx: 0,
      rename: [],
      rev: false,
      qrurl: location.href,
      key: "",
      fl: false,
      url: "",
    };
  },
  methods: {
    update() {
      this.load();
    },
    creatQrCode() {
      var that = this;

      setTimeout(() => {
        this.$refs.qrCodeUrl.innerHTML = '';
        console.log(this.url + this.key);
        var qrcode = new QRCode(that.$refs.qrCodeUrl, {
          text: this.url + this.key, // 需要转换为二维码的内容F
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }, 100);
      setTimeout(() => {
        this.$refs.qrCodeUrl1.innerHTML = '';
        var qrcode = new QRCode(that.$refs.qrCodeUrl1, {
          text: this.url + this.key, // 需要转换为二维码的内容
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }, 100);
    },
    show() {
      this.fl = false;
    },
    info() {
      Status().then((res) => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem("info", 1);
        localStorage["flag"] = 1;
        // sessionStorage.setItem("userid", res.profile.userId);
        sessionStorage["token"] = JSON.stringify(res.token);
        sessionStorage["cookie"] = JSON.stringify(res.cookie);
        this.$store.commit("addUser", res);
        localStorage.setItem("cookie", res.cookie);
        localStorage.setItem("avatar", res.profile.avatarUrl);
        localStorage.setItem("uid", res.profile.userId);
        localStorage.setItem("token", res.token);
        this.$cookies.set("token", res.cookie);
        // console.log(localStorage.getItem("cookie"));
        this.$message({
          message: "登陆成功",
          type: "success",
        });
        this.show();
        this.$emit("update:flag", !this.flag);
        // console.log(this.flag);
        // this.$router.go(0)
      });
    },
    login() {
      _login(this.phone, this.password).then((res) => {
        if (res.code != 200) {
          this.$message({
            message: "用户名或密码错误",
            type: "warning",
          });
          this.pwdMessage++;
        } else {
          localStorage.clear();
          localStorage.setItem("info", 1);
          localStorage["flag"] = 1;
          sessionStorage.setItem("userid", res.profile.userId);
          sessionStorage["token"] = JSON.stringify(res.token);
          sessionStorage["cookie"] = JSON.stringify(res.cookie);
          this.$store.commit("addUser", res);
          localStorage.setItem("cookie", res.cookie);
          localStorage.setItem("avatar", res.profile.avatarUrl);
          localStorage.setItem("uid", res.profile.userId);
          localStorage.setItem("token", res.token);
          this.$cookies.set("token", res.cookie);
          // console.log(localStorage.getItem("cookie"));
          this.$message({
            message: "登陆成功",
            type: "success",
          });
          this.show();
          this.$emit("update:flag", !this.flag);
          // console.log(this.flag);
          // this.$router.go(0)

          // this.$bus.$emit("pullResource", res.data.cookie);
        }
      });
    },
    /**手机号码验证 */
    huan() {
      let len = this.rename.length;
      if (this.idx < len) {
        this.idx++;
      } else {
        this.idx = 0;
      }
      this.nickname = this.rename[this.idx];
    },
    checkregister() {
      check_register(this.phone).then((res) => {
        console.log(res);
        if (res.hasSnsBinded) {
          this.$alert("该手机号已注册", "警告", {
            confirmButtonText: "确定",
          });
        } else {
          this.Register();
        }
      });
    },
    Register() {
      Register(this.captcha, this.phone, this.password, this.nickname).then(
        (res) => {
          if (res.code === 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push({ path: "/QnLogin" });
          }
        }
      );
    },
    check_name() {
      check_nickname(this.nickname).then((res) => {
        console.log(res);
        if (res.duplicated) {
          this.rev = true;
          this.rename = res.candidateNicknames;
          this.$confirm("昵称重复，是否需要推荐可用的昵称？", "提示", {
            confirmButtonText: "确定",
            // cancelButtonText: '取消',
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "已为你推荐!",
              });
              this.nickname = this.rename[this.idx];
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          this.checkregister();
        }
      });
    },
    Verify() {
      verify_captcha(this.phone, this.verify)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.check_name();
            // Register(this.verify,this.phone,this.password,this.nickname).then((res)=>{
            //     console.log(res);
            //     if(res.data.code == 200){
            //         this.$message({
            //             message: "注册成功",
            //             type: "success"
            //         });
            //         this.$router.push({ path: "/QnLogin" });
            //     }else{
            //         this.$message({
            //             message: res.data.msg,
            //             type: "error"
            //         });
            //     }
            // })
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "验证码错误",
            type: "error",
          });
        });
    },
    check_phone() {
      // 检查手机号是否合法
      if (this.phone === "") {
        this.$message({
          message: "请输入手机号!",
          type: "error",
        });
      } else if (this.phone.length != 11) {
        this.$message({
          message: "请输入正确的手机号",
          type: "error",
        });
      } else {
        if (this.nickname === "") {
          this.$message({
            message: "请输入昵称！",
            type: "error",
          });
        } else {
          if (this.password === "") {
            this.$message({
              message: "请输入密码！",
              type: "error",
            });
          } else {
            if (this.verify === "") {
              this.$message({
                message: "请输入验证码！",
                type: "error",
              });
            } else {
              this.Verify();
            }
          }
        }
      }
    },
    send() {
      this.disabled = true;
      let timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(timer);
          this.disabled = false;
          this.countDown = 60;
        }
      }, 1000);
      send_captcha(this.phone).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "验证码发送成功，请注意查收",
            type: "success",
          });
        }
      });
    },
    load() {
      this.GetKey();
    },
    GetKey() {
      get_key()
        .then((res) => {
          if (res.code === 200) {
            console.log(res);
            // this.qrurl=res.unikey;
            this.GetInfo();
            this.key = res.data.unikey;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "二维码生成失败，请稍后再试",
            type: "error",
          });
        });
    },
    GetInfo() {
      get_info(this.key).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.qrurl = res.data.qrimg;
          this.url = res.data.qrurl;
          this.creatQrCode();
          // document.querySelector("#qrImg").src = res.data.qrimg;
          // document.querySelector("#qrImg1").src = res.data.qrimg;
          // this.creatQrCode();
          this.CheckInfo();
        }
      });
    },
    CheckInfo() {
      check_info(this.key).then((res) => {
        console.log(res);
        if (res.code === 800) {
          this.$message({
            message: "二维码已过期",
            type: "error",
          });
        }
        if (res.code === 803) {
          this.$message({
            message: "登录成功",
            type: "error",
          });
          console.log(res.cookie);
          localStorage.setItem("cookie", res.cookie);
          this.fl = false;
          this.info();
        }
        // if (res.code === 802) {
        //   this.$message({
        //     message: "等待扫码",
        //     type: "error",
        //   });
        // }
        if (this.fl) {
          setTimeout(() => {
            this.CheckInfo();
          }, 5000);
        }
      });

      // else if(res.code===802){
      //   this.$message({
      //     message: "等待确认",
      //     type: "error"
      //   })
      // }
    },
  },
  mounted() {
    // this.load();
    // this.creatQrCode()
    var btn = document.querySelectorAll(".control a");
    var formContainer = document.querySelector(".div-form");
    var form = document.querySelectorAll(".div-form form");

    // 切换注册
    btn[0].addEventListener("click", function () {
      form[0].classList.add("disappear");
      form[1].classList.remove("disappear");
      formContainer.style.transform = "rotateY(180deg)";
    });
    // 切换登录
    btn[1].addEventListener("click", function () {
      form[1].classList.add("disappear");
      form[0].classList.remove("disappear");
      formContainer.style.transform = "none";
    });
  },
  watch: {
    fl(newval) {
      console.log(newval);
      if (newval) {
        this.load();
      }
    },
  },
};
</script>

<style scoped>
.el-icon-close {
  color: #000;
  font-size: 30px;
  cursor: pointer;
}
.fanhui {
  position: absolute;
  right: 15px;
  top: 15px;
}
.fanhui1 {
  position: absolute;
  left: 15px;
  top: 15px;
}
.yan {
  width: 100%;
  display: flex;
  justify-content: center;
}
.op {
  width: 40% !important;
  margin-right: 10px !important;
  background-color: transparent;
  color: #fff;
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px 0;
  margin: 8px 0;
  text-indent: 5px;
  font-size: 14px;
  letter-spacing: 1px;
}
.div-form .op::placeholder {
  color: #fff;
}
/* body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-image: linear-gradient(120deg, #a1c4fd, #c2e9fb);
  } */
.container {
  /* opacity: 0.9; */
  position: fixed;
  left: 50%;
  top: 50%;
  display: flex;
  /* 视域 */
  perspective: 1200px;
  transform-style: preserve-3d;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /* 阴影 */
  box-shadow: 0px 15px 15px #aaa;
}
.div-description {
  width: 300px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  transform: translateZ(-1px);
}
.div-description:nth-last-child(1) {
  border-radius: 0 5px 5px 0;
}
.div-description .img {
  width: 75%;
  margin-bottom: 15px;
}
.div-description span {
  margin-top: 10px;
  font-size: 12px;
  color: #555;
}

.div-form {
  width: 300px;
  height: 450px;
  position: absolute;
  left: 0;
  transition: 0.5s;
  transform-origin: right;
}
.div-form .form-login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(to right, #48c6ef 0%, #6f86d6 200%);
  border-radius: 5px 0 0 5px;
}
.div-form .form-register {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(to right, #48c6ef -100%, #6f86d6 100%);
  border-radius: 0 5px 5px 0;
  transform: rotateY(180deg);
}
.div-form form.disappear {
  display: none;
}

.div-form h1 {
  margin: 50px 0 25px 0;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
}
.div-form .input {
  background-color: transparent;
  width: 74%;
  color: #fff;
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px 0;
  margin: 8px 0;
  text-indent: 5px;
  font-size: 14px;
  letter-spacing: 1px;
}
.div-form .input::placeholder {
  color: #fff;
}
.div-form .submit {
  width: 70%;
  height: 32px;
  margin: 30px auto 10px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
}
.div-form .submit:hover {
  letter-spacing: 3px;
  background-color: #fff;
  color: #000;
}

.div-form .control {
  color: #fff;
  margin: 5px;
  font-size: 13px;
}
.div-form .control a {
  color: #fff;
  margin: 0 5px;
  letter-spacing: 1px;
}
.div-form .control a:hover {
  color: #000;
}
.el-icon-refresh {
  position: absolute;
  right: 20%;
  top: 25%;
  cursor: pointer;
}
</style>
