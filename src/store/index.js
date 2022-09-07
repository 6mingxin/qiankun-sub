import { createPinia } from 'pinia'

export function setupStore(app) {
  const store = createPinia()
  app.use(store)
}
