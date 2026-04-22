/**
 * 导航树节点。
 */
export type NavNode = {
  id: string
  title: string
  route: string
  children?: NavNode[]
}

/**
 * 模块信息。
 */
export type ModuleInfo = {
  key: 'three' | 'css'
  title: string
  desc: string
  routeBase: string
  firstRoute: string
  navTree: NavNode[]
}

/**
 * 模块清单与导航树结构。
 */
export const modules: ModuleInfo[] = [
  {
    key: 'three',
    title: 'ThreeJS 练习',
    desc: '聚焦 Three.js 的基础图形与动画练习。',
    routeBase: '/three',
    firstRoute: '/three/line-basic',
    navTree: [
      {
        id: 'line-basic',
        title: '线条基础',
        route: '/three/line-basic',
      },
      {
        id: 'shape-basic',
        title: '几何体基础',
        route: '/three/shape-basic',
      },
      {
        id: 'materials',
        title: '材质与光照',
        route: '/three/materials',
      },
    ],
  },
  {
    key: 'css',
    title: 'CSS 学习',
    desc: '整理常用 CSS 练习与布局技巧。',
    routeBase: '/css',
    firstRoute: '/css/layout-basic',
    navTree: [
      {
        id: 'layout-basic',
        title: '布局基础',
        route: '/css/layout-basic',
      },
      {
        id: 'animation',
        title: '动效练习',
        route: '/css/animation',
      },
      {
        id: 'components',
        title: '组件样式',
        route: '/css/components',
      },
    ],
  },
]

/**
 * 拉平导航树节点。
 */
export const flattenNav = (nodes: NavNode[]): NavNode[] => {
  const result: NavNode[] = []

  const walk = (items: NavNode[]) => {
    items.forEach((item) => {
      result.push(item)
      if (item.children?.length) {
        walk(item.children)
      }
    })
  }

  walk(nodes)
  return result
}
