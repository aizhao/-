import VueRouter from 'vue-router'
import QnHome from '@/views/QnHome';
import QnLogin from '@/views/QnLogin'
import QnRecmend from '@/views/QnRecmend'
import QnRegister from '@/views/QnRegister'
import QnAvator from '@/views/QnAvator'
import QnPhone from '@/views/login-phone'
import SongList from '@/views/SongList'
import Vue from 'vue'
import MainPage from '@/views/QnHome';
Vue.use(VueRouter)
const router =new VueRouter({
    routes:[
      {path:'/',
      name:'Main',
      component:MainPage,
      redirect:'QnHome',
      children:[
      ]
    },
    {path:'/QnHome',name:'QnHome',component:QnHome},
    {path:'/QnLogin',name:'QnLogin',component:QnLogin,children:[{path:'login-phone',component:QnPhone}]},
    {path:'/QnRecmend',name:'QnRecmend',component:QnRecmend},
    {path:'/QnAvator',name:'QnAvator',component:QnAvator},      
    {path:'/QnRegister',name:'QnRegister',component:QnRegister}, 
    {path:'/SongList',name:'SongList',component:SongList}
    ]

})
export default router