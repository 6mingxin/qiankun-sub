// const importViews = import.meta.glob('./**/index.vue')
const files = require.context('@/views', true, /index.vue$/)

let importViews = {}
files.keys().forEach(key => {
  importViews[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

const COMPONENTS_KEY = 'components'
const PREFIX = './'
const SUFFIX = '/index'
const PATH_SPLIT_MARK = '/'
const ROUTE_KEY_SPLIT_MARK = '_'

/** 过滤掉组件文件 */
const viewKeys = Object.keys(importViews).filter(key => !key.includes(COMPONENTS_KEY))

/**
 *
 * @returns views文件夹下的文件集合{ key = routerNmae, value = component }
 */
function getQiankunViewComponent() {
  const components = {}
  viewKeys.forEach(key => {
    const routeKey = key.replace(PREFIX, '').replace(SUFFIX, '').replace(new RegExp(PATH_SPLIT_MARK, 'g'), ROUTE_KEY_SPLIT_MARK)
    components[routeKey] = importViews[key]
  })
  console.log(components)

  return components
}
/**
 *
 * @returns views文件夹下的文件集合{ key = routerNmae, value = component }
 */
function getViewComponent() {
  const components = []
  viewKeys.forEach(key => {
    const name = key.replace(PREFIX, '').replace(SUFFIX, '').replace(new RegExp(PATH_SPLIT_MARK, 'g'), ROUTE_KEY_SPLIT_MARK)
    const path = '/' + key.replace(SUFFIX, '')
    components.push({
      name,
      path,
      component: importViews[key],
    })
  })

  const onePath = components[0].path
  components.unshift({
    name: 'root',
    path: '/',
    redirect: onePath,
    meta: {
      title: 'Root',
    },
  })
  console.log(components)
  return components
}
// 1.获取所有views文件夹下的文件   importViews
// 2.过滤页面级组件，并拿到过滤后的文件key集合   viewKeys
// 3.循环过滤后的文件key集合
// 4.将key的 / 处理成 _ 与路由表name相同		routeKey
// 5.返回一个对象，key = 处理后的key ,value = importViews[key]

export const views = window.__POWERED_BY_QIANKUN__ ? getQiankunViewComponent() : getViewComponent()
