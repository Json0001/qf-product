//根据服务器用户返回的menuList数据和用户完整的路由配置allRoutes进行匹配，得到符合当前用户的有效路由配置
import allRoutes from "../allRoutes"
const recursionRoutes = (allRoutes,menuList) =>{
    let userRoutes = []
    allRoutes.forEach(item=>{
        menuList.forEach(v=>{
          if(item.meta.name === v.name)  {
              if(v.children){
                item.children = recursionRoutes(item.children,v.children)
              }
            userRoutes.push(item)
          }
        })
    })
    return userRoutes
}
export default recursionRoutes
