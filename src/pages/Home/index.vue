<template>
  <div class="home">
    <el-container>
      
      <el-aside width="">
        <!-- 侧边栏 -->
        <el-menu
        :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 :router="true"
                 :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu='menuList'></qf-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header>
          <div>
            <el-button
              icon="el-icon-s-fold"
              v-if="isCollapse"
              @click="isCollapse = !isCollapse"
            ></el-button>
            <el-button
              icon="el-icon-s-unfold"
            v-else
              @click="isCollapse = !isCollapse"
            ></el-button>
          </div>

          <div><span style="font-size:20px">某某管理系统</span></div>

          <el-row class="demo-avatar">
            <el-col>
              <div class="">
                <div class="block">
                  <el-avatar
                    size="large"
                    src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2922287344,1909197126&fm=26&gp=0.jpg"
                  ></el-avatar>
                </div>
<div class="demo-right">
 欢迎您：<b class="nickname">{{userInfo.nickname}}</b>
                <a href="" @click="quit">退出</a>
</div>
               
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体 -->
        <el-main>
       <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
  
            <el-breadcrumb-item  v-for="item in crubms"
                                :to="{ path:item.path}" 
                                :key="item.path">
              {{item.meta.name}}
            </el-breadcrumb-item>
        
</el-breadcrumb>
       <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLoginLog } from "@/api";
import {mapMutations, mapState} from "vuex"
//侧边栏操作
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    // console.log(this.userInfo.nickname);
    getLoginLog().then(res => {
      console.log(res);
    })
    //
  },
  computed: {
    ...mapState(["userInfo","menuList","crubms"]),
  },
  methods: {
    
    quit(){
      localStorage.removeItem("qf-token")
      localStorage.removeItem("qf-userInfo")
      this.router.push("/login")
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
/* 侧边栏 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  margin-top: 60px;
}
/* 整体布局 */
.el-header {
  background-color: rgb(63, 190, 137);
  color: black;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.block .el-avatar{
  
  vertical-align: middle;
}
.block{
  float: left;
}
.demo-right{
  float: right;
}
.el-header .el-button {
  background:  rgb(63, 190, 137);
  border: 0;
  font-size: 45px;
}
.el-aside {
  background-color: rgb(51, 143, 106);
  color: rgb(50, 179, 140);
  text-align: center;
  line-height: 200px;
}
.iconfont{
  margin-right: 10px;
  color: rgb(50, 179, 140);
}
.el-menu-item{
  color: rgb(50, 179, 140);
}
.nickname{
  font-weight: 900;
  font-family: "宋体";
  margin-right: 8px;
}
.el-main {
  background-color: #e9eef3;
  color: black;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
