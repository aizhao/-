import VueRouter from 'vue-router'
import QnHome from '@/views/QnHome';
import QnLogin from '@/views/QnLogin'
import QnRecmend from '@/views/QnRecmend'
import QnRegister from '@/views/QnRegister'
import QnAvator from '@/views/QnAvator'
import QnPhone from '@/views/login-phone'
import SongList from '@/views/SongList'
import Vue from 'vue'
import MainPage from '@/views/MainPages';
import index from '@/views/index'
Vue.use(VueRouter)
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
        {path:'/SongList',name:'SongList',component:SongList,meta:{keepAlive:false}}
      ]
    },
    {path:'/QnLogin',name:'QnLogin',component:QnLogin,children:[{path:'login-phone',component:QnPhone}],meta:{keepAlive:true}},
    {path:'/QnAvator',name:'QnAvator',component:QnAvator,meta:{keepAlive:true}},      
    {path:'/QnRegister',name:'QnRegister',component:QnRegister,meta:{keepAlive:true}}, 
   
    ]

})
export default router