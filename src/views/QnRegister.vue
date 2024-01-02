<template>
    <div class="container">
            <div class="login-wrapper">
                <div class="header">Register</div>
                <div class="form-wrapper">
                    <input type="text" name="username" placeholder="手机号" class="input-item">
                    <input type="password" name="password" placeholder="密码" class="input-item">
                    <input type="password" name="repassword" placeholder="再次确认密码" class="input-item">
                    <el-button type="primary" class="btn">立即注册</el-button>
                    <p class="btn1">已经有账号了？<a href="#/QnLogin">立即登录</a></p>
                </div>
            </div>
        </div>
</template>
    
<script>
    export default {
        name:"QnRegister"
    }
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
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
    margin: 0 auto;
}
.btn1 {
    text-align: center;
    padding: 10px;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 12px;
    color:#a6c1ee;
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
