import Hone from "../pages/Home"
let dynamicRoutes = [
    {
        path: "/",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
          children:[]
      },
      {
        path: "*",
        component:()=>import(/* webpackChunkName: "stu" */ "../pages/page404")
      }
]