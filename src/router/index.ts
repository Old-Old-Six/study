import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home'
import ModuleLayout from '../pages/ModuleLayout'
import ModuleContent from '../pages/ModuleContent'
import { flattenNav, modules } from '../data/modules'

/**
 * 将完整路径转换为模块子路由路径。
 */
const toChildPath = (base: string, full: string) =>
  full.replace(`${base}/`, '')

const moduleRoutes: RouteRecordRaw[] = modules.map((moduleItem) => {
  const children: RouteRecordRaw[] = flattenNav(moduleItem.navTree).map((node) => ({
    path: toChildPath(moduleItem.routeBase, node.route),
    name: `${moduleItem.key}-${node.id}`,
    component: ModuleContent,
    meta: {
      moduleKey: moduleItem.key,
      title: node.title,
    },
  }))

  return {
    path: `${moduleItem.routeBase}`,
    name: `${moduleItem.key}-home`,
    redirect: moduleItem.firstRoute,
    component: ModuleLayout,
    meta: {
      moduleKey: moduleItem.key,
      title: moduleItem.title,
    },
    children,
  }
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...moduleRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
