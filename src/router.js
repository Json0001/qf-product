import Vue from "vue";
import Router from "vue-router";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Stu1 from "./pages/Home/stu1";
import allRoutes from "./allRoutes/index"

Vue.use(Router);
//解决路由导航到统一路径重复报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
   
    // {
    //   path: "/stu1",
    //   name: "stu1",
    //   component: () => import(/* webpackChunkName: "stu" */ "./pages/Home/stu1")
    // },
  ]
});
