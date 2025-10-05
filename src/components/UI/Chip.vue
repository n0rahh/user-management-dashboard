<template>
  <span
    class="chip"
    :class="type"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { StatusType } from '@/types/status'

defineProps<{
  label: string
  type: StatusType
}>()
</script>

<style scoped lang="scss">
@use 'sass:color';

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  text-transform: capitalize;
  letter-spacing: 0.4px;
  font-weight: 500;
  line-height: 1.5;
  min-width: 80px;
  border: 1px solid transparent;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border 0.25s ease;
}

.active {
  background: rgba($success, 0.1);
  color: color.adjust($success, $lightness: 20%);
  border-color: rgba($success, 0.25);
}

.inactive {
  background: rgba($error, 0.08);
  color: color.adjust($error, $lightness: 20%);
  border-color: rgba($error, 0.25);
}

.chip:hover {
  filter: brightness(1.15);
}
</style>
