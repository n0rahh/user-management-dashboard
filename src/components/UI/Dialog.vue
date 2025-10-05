<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="overlay"
    >
      <div class="dialog">
        <header class="header">
          <h3>{{ title }}</h3>
          <span
            class="close"
            @click="emit('update:visible', false)"
          >
            &times;
          </span>
        </header>

        <div class="content">
          <slot />
        </div>

        <footer v-if="$slots.footer">
          <div class="actions">
            <slot name="footer" />
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  visible: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: $overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: $dialog-bg;
  padding: 1.5rem 2rem;
  border-radius: 0.75rem;
  width: 360px;
  max-width: 90%;
  box-shadow: $shadow;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: $text;
    }
  }

  .content {
    margin-bottom: 1.5rem;
    color: $text;
    font-size: 1rem;
    line-height: 1.4;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close {
    font-size: 1.5rem;
    font-weight: bold;
    color: $text;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: $muted;
    }
  }
}
</style>
