<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script></script>

<style lang="scss" scoped>
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
