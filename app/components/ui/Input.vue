<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password'
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="input-container">
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="['input-field', { 'input-error': error }]"
      />
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

.input-container {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background-color: white;
  border: 2px solid var(--color-bg-secondary);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-field:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(217, 137, 79, 0.1);
}

.input-field:disabled {
  background-color: var(--color-bg-secondary);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-field.input-error {
  border-color: #dc2626;
}

.input-field.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-message {
  font-size: 0.875rem;
  color: #dc2626;
  margin: 0;
  font-family: var(--font-sans);
}

.input-field::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}
</style>
