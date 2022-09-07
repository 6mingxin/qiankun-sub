<template>
  <n-config-provider class="app" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="theme" :theme="isDark">
    <router-view />
  </n-config-provider>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

const { $store } = getCurrentInstance().appContext.config.globalProperties
const app = $store.useAppStore()

const isDark = shallowRef(app.inverted ? darkTheme : null)
const theme = shallowRef(app.naiveThemeOverrides)

app.$subscribe((mutation, state) => {
  isDark.value = app.inverted ? darkTheme : null
  theme.value = app.naiveThemeOverrides
})
</script>

<style lang="scss">
#app-micro {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: var(--container-height);
}
.app {
  height: 100%;
}
</style>
