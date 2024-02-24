import VueRouter from 'vue-router'
import QnHome from '@/views/QnHome';
import QnLogin from '@/views/QnLogin'
import QnRecmend from '@/views/QnRecmend'
import QnRegister from '@/views/QnRegister'
import QnAvator from '@/views/QnAvator'
import Song1List from '@/views/Song1List'
import Vue from 'vue'
import index from '@/views/index'
import MusicPlay from '@/components/MusicPlay'
import Aplayer from '@/components/Aplayer'
import SearchList from '@/views/SearchList'
import searchbar from '@/components/QnSearchbar'
import sinner from '@/views/sinner'
import QnSinner from '@/views/QnSinner'
import rankingList from '@/views/rankingList'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router =new VueRouter({
    routes:[
      {path:'/',
      name:'Main',
      component:index,
      meta:{keepAlive:true},
      redirect:'QnHome',
      children:[
        {path:'/QnHome',name:'QnHome',component:QnHome,meta:{keepAlive:true}},
        {path:'/QnRecmend',name:'QnRecmend',component:QnRecmend,meta:{keepAlive:true}},
        {path:'/Song1List',name:'Song1List',component:Song1List,meta:{keepAlive:false}},
        {path:'/SearchList',name:'SearchList',component:SearchList,meta:{keepAlive:false}},
        {path:'/sinner',name:'sinner',component:sinner,meta:{keepAlive:false}},
        {path:'/QnSinner',name:'QnSinner',component:QnSinner,meta:{keepAlive:false}},
        {path:'/rankingList',name:'rankingList',component:rankingList,meta:{keepAlive:false}},
  
      ]
    },
    {path:'/QnLogin',name:'QnLogin',component:QnLogin,children:[],meta:{keepAlive:true}},
    {path:'/QnAvator',name:'QnAvator',component:QnAvator,meta:{keepAlive:false}},      
    {path:'/QnRegister',name:'QnRegister',component:QnRegister,meta:{keepAlive:true}}, 
    {path:'/MusicPlay',name:'MusicPlay',component:MusicPlay,meta:{keepAlive:true}},
    {path:'/Aplayer',name:'Aplayer',component:Aplayer,meta:{keepAlive:true}},
    {path:'/searchbarr',name:'searchbar',component:searchbar,meta:{keepAlive:true}},
    

  ]
})
export default router