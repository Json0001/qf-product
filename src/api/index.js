import axios from "./config"  //从config引入
//登入接口
export const login = (username,password) => axios({
    url:"/users/login",
    method : "post",
    data:{
        username,
        password 
    }
})

//获取登入日志
export const getLoginLog = () => axios.get("/getloginlog")
//然后配置前端代理

//获取权限接口
export const getMenuList = () => axios({
    url:"/permission/getMenuList"
})