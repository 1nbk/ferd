<script setup lang="ts">
interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: 'md',
})

const classes = computed(() => {
  const base = 'bg-white rounded-2xl overflow-hidden border border-bg-secondary/50 transition-all duration-500 ease-out'
  
  const hoverEffect = props.hover 
    ? 'hover:shadow-xl hover:-translate-y-1 hover:border-accent/20' 
    : ''

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return [
    base,
    hoverEffect,
    paddings[props.padding],
  ].join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
