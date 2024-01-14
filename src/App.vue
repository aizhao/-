<template>
  <div id="app">
  
      <router-view></router-view>
</div>
</template>

<script>
import index from '@/views/index.vue'
export default {
name: 'App',
 components:{
        index:index
    },
}
</script>

<style>
#app {

}

</style>
