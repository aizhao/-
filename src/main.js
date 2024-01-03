import Vue from 'vue'
import App from './App.vue'
import QnNavbar from '@/components/QnNavbar'
import QnSearchbar from '@/components/QnSearchbar'
import "font-awesome/css/font-awesome.min.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import QnRecommend from '@/components/QnRecommend'
import store from './store'
import request from '@/until/request'
import router from '@/router/index'
import VueCookies from 'vue-cookies';
import LeftList from '@/components/left-list'
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('QnNavbar',QnNavbar)
Vue.component('QnSearchbar',QnSearchbar)
Vue.component('QnRecommend',QnRecommend)
Vue.component('LeftList',LeftList)
Vue.prototype.request=request
//跨域问题解决方面

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
