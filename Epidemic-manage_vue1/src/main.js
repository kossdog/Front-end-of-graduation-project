import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import "./assets/css/global.css"
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);

//导入axios
import axios from 'axios'
// import { config } from "vue/types/umd";
//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8080/'
//拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  //需要授权的API，必须在请求头中使用 Authorrization 字段提供 token 令牌
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
