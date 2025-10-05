<template>
  <transition name="toast-fade">
    <div
      v-if="visible"
      class="toast"
      :class="`toast--${type}`"
      role="alert"
    >
      <div class="toast__content">
        <span class="toast__icon">
          <slot name="icon" />
        </span>
        <span class="toast__message text-center">{{ message }}</span>
      </div>

      <button
        class="toast__close"
        @click="close"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from 'vue'

import type { ToastType } from '@/composables/useToast'

const props = defineProps<{
  id: number
  message: string
  type?: ToastType
  duration?: number
  onClose?: (id: number) => void
}>()

const visible = ref(true)
const timeoutId = ref<number | undefined>()

watchEffect(() => {
  if (props.duration !== 0) {
    timeoutId.value = window.setTimeout(() => {
      close()
    }, props.duration ?? 4000)
  }
})

const close = () => {
  visible.value = false
  props.onClose?.(props.id)
}

onUnmounted(() => {
  if (timeoutId.value) clearTimeout(timeoutId.value)
})
</script>

<style scoped lang="scss">
@use 'sass:color';

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 280px;
  max-width: 400px;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  backdrop-filter: blur(1.5rem);
  box-shadow: $shadow;
  border: 1px solid $border;
  color: $text;
  margin: 0.5rem 0;
  animation: slideIn 0.25s ease;
}

.toast__content {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.toast__close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0 0.4rem;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.toast--success {
  background: $success;
  border-color: color.adjust($success, $lightness: -10%);
}

.toast--error {
  background: $error;
  border-color: color.adjust($error, $lightness: -10%);
}

.toast--info {
  background: $info;
  border-color: color.adjust($info, $lightness: -10%);
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
