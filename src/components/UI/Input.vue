<template>
  <div class="input-wrapper">
    <input
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      class="input-field"
      :style="{ minWidth: minWidth }"
      @input="emitUpdate"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  minWidth?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref(props.modelValue)
const focused = ref(false)

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
.input-wrapper {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid $border;
  background: $input-bg;
  color: $text;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: $muted;
    opacity: 0.8;
  }

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
