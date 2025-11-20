<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  block: false,
})

const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
  
  const variants = {
    primary: 'bg-accent text-white hover:brightness-110 shadow-md hover:shadow-lg',
    secondary: 'bg-bg-secondary text-text-primary hover:bg-opacity-80',
    outline: 'border border-text-primary text-text-primary hover:bg-text-primary hover:text-white',
    ghost: 'text-text-primary hover:bg-bg-secondary',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  }

  const width = props.block ? 'w-full' : ''

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    width,
  ].join(' ')
})
</script>

<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :type="!to && !href ? type : undefined"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </component>
</template>
