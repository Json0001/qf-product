import Vue from "vue";
import Vuex from "vuex";
import router from "./router"
import {getMenuList} from "./api/index"
//引入allRoutes ,引入递归函数 ,引入动态路由
import allRoutes from "./allRoutes"
import recursionRoutes from "./util/recursionRoutes"
import dynamicRoutes from "./routers/dynamicRoutes"
Vue.use(Vuex);

let userInfo = JSON.parse(localStorage.getItem("qf-userInfo"))
let permissionButtons = JSON.parse(localStorage.getItem('wf-permission-buttons')) || {};
//页面刷新 代码重新执行，vuex中的state就变成空对象了，要从本地中获取
export default new Vuex.Store({
  state: {
    userInfo:userInfo || "{}",
    menuList:[],   //这个是对比后侧边栏的路由配置
    crubms: [],
    permissionButtons,
    sideMenu: [],
  },
  mutations: {
    CLEAR_SIDEMENU(state) {
      state.sideMenu = []
    },
    SET_PERMISSION_BUTTONS(state, payload) {
      state.permissionButtons = payload
    },
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    SET_MENULIST(state,payload){
      state.menuList = payload
      //动态的将路由添加到routes，核心方法router.addRoutes(符合路由配置的数据)
      //将对比后的路由配置menuList赋值给动态路由里的children
      let target = dynamicRoutes.find(item=>
        item.path === "/"   //筛选出动态路由中 “/” 的主页路由
      )
      target.children = [...state.menuList]  //赋值给动态路由里的children
      // console.log(dynamicRoutes);  //这就是符合路由配置的数据
      router.addRoutes(dynamicRoutes)
    },
    SET_CRUBMS(state, payload) {
      state.crubms = payload
  }
  },
  actions: {
    async FETCH_MENULIST({commit}){
        //1.发送请求 获取用户菜单数据
      let  userMenu = await  getMenuList()
      // console.log(userMenu);
     let result =  recursionRoutes(allRoutes,userMenu.data.menuList)
      //2.引入allRoutes ,引入递归函数 ,引入动态路由
      // console.log(result);
      //3.通过allRoutes和请求回来的数据结果res对比，将结果提交给mutations
      commit("SET_MENULIST",result)
    }
  },
  getters: {},
  modules:{}
});
