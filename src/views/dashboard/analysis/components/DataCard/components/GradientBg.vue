<template>
  <n-el class="box" tag="div" :style="{ backgroundImage: gradientStyle }">
    <slot></slot>
  </n-el>
</template>

<script setup>
const props = defineProps({
  startColor: {
    type: String,
    default: '#56cdf3',
  },
  endColor: {
    type: String,
    default: '#719de3',
  },
})

const gradientStyle = computed(() => `linear-gradient(to bottom right, ${props.startColor}, ${props.endColor})`)
</script>
<style scoped lang="scss">
.box {
  padding: 16px;
  border-radius: 16px;
}
</style>
