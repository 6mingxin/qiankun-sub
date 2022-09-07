<template>
  <n-el
    class="v-container"
    tag="div"
    :style="{
      backgroundColor: isBg ? 'var(--card-color)' : 'transparen',
      padding,
    }"
  >
    <slot />
  </n-el>
</template>
<script setup>
defineProps({
  isBg: {
    type: Boolean,
    default: true,
  },
  padding: {
    type: String,
    default: '12px',
  },
})
</script>
<style lang="scss" scoped>
.v-container {
  box-sizing: border-box;
  height: 100%;
  border-radius: 12px;
  transition: 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
