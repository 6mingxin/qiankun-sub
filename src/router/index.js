import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from './guard'
import { views } from '@/views'
import Layout from '@/layout/index.vue'

/**
 * 路由表中的路由与文件实例映射
 * @param routers
 * @returns
 */
export function handleRouter(routers) {
  // addRoute
  const routes = routers.map(e => {
    if (views[e.name]) {
      e.component = views[e.name]
    } else {
      e.component = Layout
    }

    if (e.children && e.children.length) e.children = handleRouter(e.children)
    return e
  })
  return routes
}

export let router = []

export async function setupRouter(app, routes) {
  router = createRouter({
    history: createWebHistory(),
    routes: window.__POWERED_BY_QIANKUN__ ? handleRouter(routes) : views,
  })
  app.use(router)
  createRouterGuard(router) //路由守卫
  await router.isReady() //路由是否挂载完成
}
