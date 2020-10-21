//1. npm install axios -S 安装axios 

//2.导入axios
import axios from "axios"
import router from "../router"
import ElementUI from 'element-ui';

//3.配置项目环境，如果是开发环境就是/api ,不是则是服务器的原始地址
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip"

// 4.这句一定要加上，定义默认携带认证，这样服务器才能种下cookie！！！！！！！！！！
axios.defaults.withCredentials = true

//5.这里配置一些默认的请求设置
axios.create({
    timeout: 4000
})


//创建请求拦截器，因为我们每次都要携带cookie里的token请求
axios.interceptors.request.use(
    config => {   //config指的是每个请求对象
        // console.log(config);
        if(config.url === "/users/login"){
            return config
        }else{
            let token = localStorage.getItem('qf-token')
            config.headers['authorization'] = token;
            return config
        }
    }
)
// 响应拦截  请求可以成功，但是返回数据被拦截 为了校验token
axios.interceptors.response.use(config=>{
    //和请求拦截器一样，需要return
    console.log(config);
    if(config.data.code==="1004"){  //在当前页面code 1004代表校验失败，携带的token有问题
        ElementUI.Message.error("用户信息失效")
        router.push("/login")
    }
    return config
  })

export default axios  //导出去  用index引入