<template>
  <button
    :class="['button', `button--${variant}`]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ButtonTypes, type ButtonType } from '@/types/button'

const props = defineProps<{
  variant?: ButtonType
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variant = props.variant ?? ButtonTypes.PRIMARY
</script>

<style scoped lang="scss">
.button {
  padding: 0.3rem 0.9rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  min-width: 80px;
  text-align: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.button--primary {
  background: rgba($primary, 0.15);
  color: $primary;
  border: 1px solid rgba($primary, 0.3);

  &:hover:not(:disabled) {
    background: rgba($primary, 0.25);
  }
}

.button--secondary {
  background: rgba($secondary, 0.08);
  color: $text;
  border: 1px solid rgba($text, 0.15);

  &:hover:not(:disabled) {
    background: rgba($secondary, 0.15);
  }
}

.button--danger {
  background: rgba($error, 0.15);
  color: $error;
  border: 1px solid rgba($error, 0.3);

  &:hover:not(:disabled) {
    background: rgba($error, 0.25);
  }
}
</style>
