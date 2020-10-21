import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let userInfo = JSON.parse(localStorage.getItem("qf-userInfo"))
//页面刷新 代码重新执行，vuex中的state就变成空对象了，要从本地中获取
export default new Vuex.Store({
  state: {
    userInfo:userInfo || "{}"
  },
  mutations: {
    SET_USERINFO(state,payload){
      state.userInfo = payload
    }
  },
  actions: {},
  getters: {},
  modules:{}
});
