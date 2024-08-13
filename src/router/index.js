import { createRouter, createWebHashHistory } from 'vue-router'


//路由数组
const routes = [
  {
    path: "/",
    name: "threejs学习",
    component: () => import('../components/ThreeJs.vue'),
  },
  {
    path: "/test",
    name: "threejs",
    component: () => import('../components/ThreeJs.vue'),
  },
  {
    path: "/test1",
    name: "threejs",
    component: () => import('../components/ThreeJs.vue'),
  },
]

//路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router