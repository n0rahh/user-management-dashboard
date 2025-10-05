<template>
  <div class="table-wrap">
    <div class="table-header">
      <div class="title">{{ title }}</div>
      <div class="controls">
        <slot name="controls" />
      </div>
    </div>

    <div
      v-if="loading"
      class="loading"
    >
      <span class="loading-text"> Loading </span> <Loader />
    </div>

    <table
      v-else
      class="table"
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in paginatedItems"
          :key="index"
        >
          <td
            v-for="header in headers"
            :key="header.key"
          >
            <slot
              :name="`cell-${header.key}`"
              :item="item"
            >
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="!paginatedItems.length">
          <td
            :colspan="headers.length"
            class="empty"
          >
            No data found.
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="items.length"
      class="pagination"
    >
      <div class="info">
        Showing
        <strong>{{ startIndex + 1 }}</strong> -
        <strong>{{ Math.min(endIndex, items.length) }}</strong>
        of
        <strong>{{ items.length }}</strong>
      </div>

      <div class="buttons">
        <button
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          ‹
        </button>
        <span>Page {{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Loader } from '@/components/UI'

const props = defineProps<{
  title?: string
  headers: { label: string; key: string }[]
  items: Record<string, unknown>[]
  loading?: boolean
  rowsPerPage?: number
}>()

const currentPage = ref(1)
const perPage = computed(() => props.rowsPerPage || 10)
const totalPages = computed(() => Math.ceil(props.items.length / perPage.value))

const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => startIndex.value + perPage.value)
const paginatedItems = computed(() => props.items.slice(startIndex.value, endIndex.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped lang="scss">
.table-wrap {
  max-width: 980px;
  margin: 2.2rem auto;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: $background;
  border: 1px solid $border;
  box-shadow: $shadow;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $primary;
}

.controls {
  display: flex;
  gap: 0.6rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  color: $muted;

  &-text {
    margin-right: 1rem;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.table thead th {
  text-align: left;
  padding: 0.85rem 0.5rem;
  font-size: 0.9rem;
  color: $secondary;
  border-bottom: 1px solid $border;
}

.table tbody td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid $border;
  color: $text;
}

.empty {
  text-align: center;
  padding: 1.5rem;
  color: $secondary;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: $muted;

  .info {
    strong {
      color: $primary;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    button {
      background: $button-bg;
      border: none;
      color: $primary;
      padding: 0.4rem 0.7rem;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: $button-hover;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
}

@media (max-width: 720px) {
  .table-wrap {
    padding: 1rem;
  }

  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
