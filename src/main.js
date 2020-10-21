import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/base.css"
import "./assets/el-reset.css"
import axios from "axios"
Vue.use(ElementUI);
Vue.config.productionTip = false;

//路由守卫（前置钩子），为了防止客户乱填地址，让他都跳转到登陆页面
router.beforeEach((to, from, next) => {
  //next()  视图加载放行
  // console.log(to);
  // console.log(from);
  let token = localStorage.getItem("qf-token")
  if(token){    
    next()
  }else{
    if(to.path==="/login"){  //如果是登陆页面，放行
      next()
    }else{
      next({
        path:"/login"  //如果不是登陆页面，就跳转到登陆页
      })
    }
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
