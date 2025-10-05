<template>
  <div class="select-wrapper">
    <select
      v-model="localValue"
      @change="emitUpdate"
      class="select-field"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  options: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  val => {
    if (val !== localValue.value) localValue.value = val
  }
)

const emitUpdate = () => {
  emit('update:modelValue', localValue.value)
}
</script>

<style scoped lang="scss">
.select-wrapper {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.select-field {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid $border;
  background: $input-bg;
  color: $text;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='#{$text}' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
