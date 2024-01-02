<template>  
  <nav>  
    <ul>  
      <li class="li-left"><router-link :to="{path:'/QnHome'}">首页</router-link></li>  
      <li class="li-left"><router-link :to="{path:'/QnRecmend'}">个性推荐</router-link></li>  
      <li class="li-left"><a href="/artists">歌手</a></li>  
      <li class="li-left"><a href="/charts">排行榜</a></li>  
      <li class="li-left"><QnSearchbar></QnSearchbar></li> 
      <li class="li-rit"><router-link :to="{path:'/QnRegister'}">注册</router-link></li>
      <li v-if="!flag" class="li-rit"><router-link :to="{path:'/QnLogin'}">登录</router-link></li>
      <li class="li-rit" id="li-img" > <router-link :to="{path:'/QnAvator'}"><el-avatar  :src="uidurl"></el-avatar></router-link></li>
    </ul>  
  </nav>  
</template>
<script>

export default { 
 data() {
    return {
       flag:0,
       uidurl:'',
    };
  },
  created() {
    this.flag=0
    let token=localStorage.getItem("token")
    if(token) this.flag=1;
    this.uidurl=localStorage.getItem('avatar')
  },
}
</script>
  
<style scoped>

nav {  
 
  height: 80px;
  background-color: #1c1d26;
}  
  
nav ul {  
  list-style-type: none;  
  margin: 0;  
  padding: 0;  
  overflow: hidden;  
}  
  
nav ul .li-left {  
  float: left;  
  padding: 14px 34px;
}  
nav ul .li-rit {  
  float: right;  
  padding: 14px 2px;
}   
nav ul .li-left a {  
  display: block;  
  color: #fff;  
  margin: 0 20px;
  padding: 14px 34px;  
  text-align: center;
  text-decoration: none;  
}  
nav ul .li-rit a {  
  display: block;  
  color: #fff;  
  margin: 0 10px;
  padding: 14px 10px;  
  text-align: center;
  text-decoration: none;  
}  
nav ul .li-left a:hover {  
  background-color: #01affd;  
  border-radius: 20px 20px;
}
nav ul .li-rit:not(#li-img) a:hover {  
  background-color: #01affd;  
  border-radius: 20px 20px;
}
img{
  height: 35px;
  margin: -8px -18px; 
}

</style>