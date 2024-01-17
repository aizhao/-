import VueRouter from 'vue-router'
import QnHome from '@/views/QnHome';
import QnLogin from '@/views/QnLogin'
import QnRecmend from '@/views/QnRecmend'
import QnRegister from '@/views/QnRegister'
import QnAvator from '@/views/QnAvator'
import QnPhone from '@/views/login-phone'
import Song1List from '@/views/Song1List'
import Vue from 'vue'
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
        {path:'/Song1List',name:'Song1List',component:Song1List,meta:{keepAlive:false}}
      ]
    },
    {path:'/QnLogin',name:'QnLogin',component:QnLogin,children:[{path:'login-phone',component:QnPhone}],meta:{keepAlive:true}},
    {path:'/QnAvator',name:'QnAvator',component:QnAvator,meta:{keepAlive:false}},      
    {path:'/QnRegister',name:'QnRegister',component:QnRegister,meta:{keepAlive:true}}, 
   
    ]

})
export default router