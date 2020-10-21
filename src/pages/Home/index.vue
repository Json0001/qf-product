<template>
  <div class="home">
    <el-container>
      <el-aside width="">
        <!-- 侧边栏 -->

        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <!-- 1 -->
          <el-menu-item index="2">
            <i class="el-icon-s-claim"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title"></span>
              <el-menu-item index="1-1">学员项目管理</el-menu-item>
              <el-menu-item index="1-2">学员资料</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">学员宿舍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2 -->

          <!-- 3 -->

          <!-- 4 -->
          <el-menu-item index="4">
            <i class="el-icon-mouse"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-loading"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header>
          <div>
            <el-button
              icon="el-icon-s-fold"
              @click="isCollapse = !isCollapse"
            ></el-button>
          </div>

          <div><span>千锋管理系统</span></div>

          <el-row class="demo-avatar">
            <el-col>
              <div class="">
                <div class="block">
                  <el-avatar
                    size="large"
                    src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4056769380,3332572838&fm=11&gp=0.jpg"
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
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
import {mapState} from "vuex"
//侧边栏操作
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  mounted() {
    console.log(this.userInfo.nickname);
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  computed: {
    ...mapState(["userInfo"]),
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
  background-color: #ccc;
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
  background: #ccc;
  border: 0;
  font-size: 45px;
}
.el-aside {
  background-color: #aaa;
  color: black;
  text-align: center;
  line-height: 200px;
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
