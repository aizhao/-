<template>
  <div>
    <el-card
      style="width: 800px; margin-top: 20px; margin-left: 20px"
      shadow="hover"
    >
      <el-form label-width="80px" size="small">
        <el-upload
          class="avatar-uploader"
          :action="'http://localhost:9090/file/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <el-form-item
          label="用户名"
          style="margin-left: 200px; margin-top: -150px"
        >
          <el-input
            v-model="form.username"
            disabled
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" style="margin-left: 200px">
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" style="margin-left: 200px">
          <el-select
            v-model="form.sex"
            placeholder="请选择您的性别"
            style="width: 400px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" style="margin-left: 200px">
          <el-input
            v-model="form.email"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" style="margin-left: 200px">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" style="margin-left: 200px">
          <el-input
            type="textarea"
            v-model="form.address"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保 存</el-button>
          <!--          <el-button type="primary" @click="sign"><i class="el-icon-location" />定位</el-button>-->
          <el-button type="primary" @click="return1">返回主页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { GetUser } from "@/api/login";
export default {
  name: "QnAvator",
  data() {
    //电话号码校验
    const checkPhone = (rule, value, callback) => {
      if (!this.validatePhone.test(value)) {
        return callback(new Error("手机号格式不合法"));
      }
      callback();
    };
    return {
      form: {
        phone: "",
      },
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      options: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      value: "",
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      rulesPhone: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
      interval: null,
      validatePhone: /^1[3,4,5,6,7,8,9][0-9]{9}$/,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      const uid = localStorage.getItem("uid");
      console.log(uid);
      if (!uid) {
        this.$message.error("当前无法获取用户信息!");
        return;
      }
      GetUser(uid).then((res) => {
        this.form = res;
        this.form.avatarUrl = res.profile.avatarUrl;
        this.form.nickname = res.profile.nickname;
        this.form.username = res.profile.nickname;
        if (res.profile.gender) this.form.sex = "男";
        else this.form.sex = "女";
      });
    },
    // 头像上传
    handleAvatarSuccess(res) {
      // res就是头像文件路径
      this.form.avatarUrl = res;
    },
    return1() {
      this.$router.push("/QnHome");
    },
  },
};
</script>

<style>
.avatar-uploader {
  text-align: left;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
</style>
