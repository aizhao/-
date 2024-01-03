<template>
  <div class="box">
   <ul class="List">推荐
    <li><i class="el-icon-headset"><router-link :to="{path:'/QnHome'}">发现音乐</router-link></i></li>
    <li><i class="el-icon-mobile-phone"><router-link :to="{path:'/QnHome'}">推荐视频</router-link></i></li>
   </ul>
   <ul class="List">我的音乐
    <li><i class="el-icon-cloudy"><router-link :to="{path:'/QnHome'}">我的音乐云盘</router-link></i></li>
   </ul>
   <ul class="list">我的歌单
    <li v-for="item in list" :key="item.id">
         <div><el-avatar :src="item.coverImgUrl"></el-avatar>
        <router-link :to="{path:'/QnHome'}"><p>{{item.name}}</p></router-link></div>
    </li>
   </ul>
  </div>
</template>

<script>
import {_getUserList} from '@/api/music-list'
export default {
    data() {
    return {
       list: [], // 推荐歌单数据
    };
  },
 mounted(){
        let uid=localStorage.getItem("uid")
      _getUserList(uid,5).then((res)=>{
        this.list=res.playlist
        console.log(res)
      })
    
        },
}
</script>

<style scoped>
p{
  text-decoration: none;
  position: relative;
  top: -40px;
  left: 45px;
  width: 160px;
  text-align: left;
}
.box{
    height: 1000px;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: rgb(228, 228, 228);
}
ul li{
    height: 50px;
    margin: 20px 20px;
    padding: 10px 15px;
    list-style-type: none;
    border-bottom-style: dashed;
    border-bottom-width: 1px;
    border-bottom-color: rgb(228, 228, 228);
}
.List li a{
    position: relative;
    margin: auto 12px;
    text-decoration: none;
    color: #161a21;
}
.router-link-active{
    text-decoration: none;
    padding: 0 10px;
}
.list li{
    margin: 10px 10px;
}
.list li a{
    color: #161a21;
    position: relative;
    top: -10px;
    text-align: center;
}

</style>