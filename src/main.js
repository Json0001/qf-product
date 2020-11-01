import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/base.css"
import "./assets/el-reset.css"
import axios from "axios"
import "./icon/iconfont.css"
import "./util/recursionRoutes"
import bus from "./util/bus"
import has from "./util/has"
import subMenu from "qf-sub-menu"
Vue.prototype.$has = has;
Vue.prototype.$bus = bus
//插件渲染，里面记得印射mapState的menuList
import qfSubMenu from "qf-sub-menu"
Vue.use(qfSubMenu)
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(subMenu)

// Vue.config.productionTip = false
//定义全局自定义指令 判断是否具备相应按钮权限
Vue.directive("haspermission", {

  bind(el, binding, VNode) {
    // console.log(el)
    let buttons = localStorage.getItem("wf-permission-buttons")
    if (!has(buttons, binding.value)) {
      //禁用按钮
      // console.log(el.className)
      //先储存class类名 在这基础上加上is-disabled禁用按钮
      let className = el.className;
      el.className = className + " " + "is-disabled"
      el.disabled = true
      // console.log(el)
    }
  }
})

//路由守卫（前置钩子），为了防止客户乱填地址，让他都跳转到登陆页面
router.beforeEach((to, from, next) => {
  //next()  视图加载放行
  // console.log(to);
  // console.log(from);
  let token = localStorage.getItem("qf-token")
  if(token){ 
    //存在token过期的情况，再判断是否有menuList,有的话才放行，要不然不知道去哪个页面
    if(store.state.menuList.length>0){
      next()
    }else{
      //如果没有触发action，请求数据
      store.dispatch("FETCH_MENULIST").then(()=>{
        next({path:to.path})   //固定写法 不要问  确保addRoutes生效了，要不然一直是空白页面。
      })
    }
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
//处理面包虾使用后置钩子
router.afterEach((to, from) => {
  var routerList = to.matched.slice(1)
  store.commit('SET_CRUBMS', routerList)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
