import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL='http://localhost:3000';//设置基址

axios.defaults.withCredentials = true // 跨域保存session

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$cookie = VueCookies   

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import { MessageBox } from 'mint-ui';
Vue.prototype.$messagebox = MessageBox   
import { Toast  } from 'mint-ui';
Vue.prototype.$toast  = Toast    
//引入第三方图标
import './assets/icon/iconfont.css'
//时间格式化插件
import moment from 'moment'; 
Vue.prototype.$moment  = moment    


//回到顶部插件
import VBack from 'v-back'
Vue.use(VBack)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
