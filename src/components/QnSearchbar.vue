<template>
  <div class="search-box">
    <input type="text" class="search-txt" name="" placeholder="请输入歌曲或歌手"/>
    <a class="search-btn" href="#"><i class="el-icon-search"></i></a>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.search-box{
    transform: translateY(-50%,-50%);
    background-color: #2f3640;
    height: 30px;
    border-radius: 40px;
    padding: 10px;
}
.search-box:hover > .search-txt{
    width: 230px;
    padding: 0 6px;
}
.search-box:hover > .search-btn{
    background: white;
}
.search-btn{
    color: #e84118;
    float: right;
    width: 40px;
    height: 30px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-txt{
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
}
</style>