import './public-path.js'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

let instance = null

async function setupApp(props = {}) {
  const { container, store, routerList, window } = props
  instance = createApp(App)
  // 挂载pinia状态
  await setupStore(instance)
  // 挂载路由
  await setupRouter(instance, routerList)
  //全局挂载主应用的store
  instance.config.globalProperties.$store = store || {}
  //全局挂载主应用的window
  instance.config.globalProperties.$window = window || {}
  // 路由准备就绪后挂载 App
  instance.mount(container ? container.querySelector('#app-micro') : '#app-micro')
  console.log(instance)
  console.log(document.getElementById('container'))
}

// 判断是否在乾坤环境下，非乾坤环境下独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  setupApp()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  setupApp(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.unmount()
  console.log('卸载？？？', instance)
  const container = document.getElementById('container')
  container.innerHTML = ''
  instance = null
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}
