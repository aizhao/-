<template>
   <div class="box">
  
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
               <h1>{{list.name}}</h1>
               </div>
               <div>
                <div class="box-card1">
                  <div class="avator">
                  <el-avatar shape="square" size="medium" :src="creator.avatarUrl" ></el-avatar>
                  <p>{{creator.nickname}}&nbsp;&nbsp;{{Time}}创建</p></div>
                  <div class="buttom">
                  <el-button  icon="el-icon-caret-right" size="medium" type="primary" round>播放</el-button>
                  <el-button  icon="el-icon-s-comment" size="medium" type="info" round>评论({{list.commentCount}})</el-button></div>
                  <div>
                    <ul>标签：
                      <li v-for="(item,index) in list.tags" :key="index">{{item}}</li>
                    </ul>
                  </div>
                  <div class="description">
                    介绍：{{list.description}}
                  </div>
                    
                </div>
               </div>
      </div>
      <div class="songs">
        <div class="tableheader">
        <h2>歌曲列表 </h2>
        <p>{{list.trackCount}}首歌</p>
        <p class="bo">播放：{{list.playCount}}次</p>
        </div>
        <div class="songstable">
          <el-table
          v-loading="loading"
    :data="MusicList"
    stripe
    style="width: 100%"
    max-height="500px">
    <el-table-column
      type="index"
      :index="indexMethod">
      
    </el-table-column>
    <el-table-column
    width="60">
    <el-button type="primary" size="small"  circle><i class="el-icon-video-play"> </i></el-button>
    </el-table-column>
    <el-table-column
      prop="name"
      label="歌曲标题"
      width="280">
    </el-table-column>
    <el-table-column
      prop="dt"
      label="时长"
      width="180">
      <template slot-scope="scope">
        <span >{{ dayjs(scope.row.dt).format('mm:ss')  }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="ar.0.name"
      label="歌手">
    </el-table-column>
    <el-table-column
      prop="al.name"
      label="专辑">
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
        </div>
      </div>
  
  </div>
</template>

<script>
import {_getMusicList} from '@/api/music-list'
import moment from 'moment';
import dayjs from 'dayjs'
export default {
  data(){
    return{
      dayjs:dayjs,
      id:0,
      url:'',
      list:[],
      MusicList:[],
      Time:'暂无',
      creator:[],
      loading: true
    }
  },
  created(){
   this.id=this.$route.query.id
    this.load()
    setTimeout(() => {
    this.loading = false;
      }, 2000);
      
  },
  methods:{
    load(){
      _getMusicList(this.id).then((res)=>{
      console.log(res)
      if(res.code===406) return
      this.list=res.playlist
      this.MusicList=this.list.tracks
      this.url=this.list.coverImgUrl
      this.creator=this.list.creator
      let num=this.list.createTime
      this.Time=moment(num).format('YYYY-MM-DD')
      
    })
    },
    indexMethod(index){
      return index+1
    }
  }
}
</script>

<style scoped>
.box{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 92%;
  width: 80%;
}
.bo{
  position: relative;
  left: 75%;
  color: red;
}
.songs p{
  display: inline;
  font-size: 15px;
}
.songs p:first{
  color: #656565;
}
h2{
  display: inline;
}
h1{
  width: 200px;
}
.description{
  position: relative;
  top: -20px;
  line-height: 2;
  font-size: 15px;
  color: #656565;
}
.buttom{
  position: relative;
  top: -20px;
}
ul{
  color: #656565;
  position: relative;
  top: -20px;
  left: -40px;
  font-size: 15px;
}
ul li{
  margin: 0 10px;
  padding: 0 10px;
  list-style-type: none;
  display: inline;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(228, 228, 228);
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
  color: #656565;
}
.box-card1 p{
  position: relative;
  left: 50px;
  top: -50px;
}
.box-card1{
  position: relative;
  left: 460px;
  top: 20px;
  width: 30%;
  height: 300px;
}
.avator{
  position: relative;
  top: 20px;
}
.header{
  width:100%;
  height:40%;
}
.songs{
  width:100%;
  height:70%;

}
.block{
  position: absolute;
  top: 50px;
  left: 100px;
  width: 300px;
  height: 300px;

}
.tableheader{
  position: relative;
  top: 50px;
  left: 100px;

}
.songstable{
  position: relative;
  top: 50px;
  left: 100px;
}
.tatel{
  width: 20%;
  position: relative;
  left: 500px;
  top: 30px;
  text-align: left;
}
.el-icon-service{
  position: absolute;
  left: -40px;
  font-size: 25px;
}
.el-icon-video-play{
  font-size: 18px;
}
</style>