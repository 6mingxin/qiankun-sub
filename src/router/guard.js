/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router) {
  router.beforeEach(async (to, from, next) => {
    next()
  })
  router.afterEach(to => {
    // 设置document title
    if (to.meta.title) window.document.title = to.meta.title
  })
}
