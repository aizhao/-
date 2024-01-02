<template>
   <div class="box">
    <el-card class="box-card">
      <div class="header">
            <div class="block">
              <el-image :src="url" fit="scale-down">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              </div>
              <div class="tatel">
              <i class="el-icon-service"></i>
               <h2>{{list.name}}</h2></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {_getMusicList} from '@/api/music-list'
export default {
  data(){
    return{
      id:0,
      url:'',
      list:[],
      MusicList:[],
    }
  },
  created(){
   this.id=this.$route.query.id
    console.log(this.name)
    _getMusicList(this.id).then((res)=>{
      this.list=res.playlist
      this.url=res.playlist.coverImgUrl
      this.musiclist=res.privileges
      console.log(res)
    })
  },
  mounted(){
   
  }
}
</script>

<style scoped>
.box{
  display: flex;
  flex-wrap: wrap;
}
.box-card{
  position: relative;
  width: 100%;
  height: 1000px;
}
.header{
  position: absolute;
  width:100%;
  height:40%;
  background-color: #b8b8b8;
}
.block{
  position: absolute;
  top: 50px;
  left: 100px;
  width: 300px;
  height: 300px;
  background-color: #e00000;
}
.tatel{
  position: relative;
  left: 500px;
  top: 30px;
  text-align: left;
}
.el-icon-service{
  position: absolute;
  left: -25px;
  top: 10px;
}
</style>