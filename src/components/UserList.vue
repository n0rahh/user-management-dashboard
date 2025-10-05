<template>
  <Table
    title="Users"
    :headers="headers"
    :items="filteredUsers"
    :loading="loading"
    :rows-per-page="rowsPerPage"
  >
    <template #controls>
      <Input
        v-model="localSearch"
        placeholder="Search by name or email..."
        type="text"
        min-width="220px"
      />
      <Select
        v-model="localStatus"
        :options="statusOptions"
        min-width="100px"
      />
    </template>

    <template #cell-status="{ item }">
      <Chip
        :label="String(item.status)"
        :type="mapStatus(String(item.status))"
      />
    </template>

    <template #cell-actions="{ item }">
      <Button
        :variant="ButtonTypes.DANGER"
        @click="onDeleteConfirmationHandler(Number(item.id))"
      >
        Delete
      </Button>
    </template>
  </Table>

  <Dialog
    :visible="confirmVisible"
    title="Confirm Deletion"
    @update:visible="onCancelHandler"
  >
    <p>
      Are you sure you want to delete user
      <strong>{{ getUserName }}</strong>
      ?
    </p>

    <template #footer>
      <Button
        :variant="ButtonTypes.SECONDARY"
        @click="onCancelHandler"
      >
        Cancel
      </Button>
      <Button
        :variant="ButtonTypes.DANGER"
        :loading="loadingDelete"
        @click="onDeleteUserHandler"
      >
        Delete
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

import { Table, Input, Select, Chip, Button, Dialog } from '@/components/UI'
import { useToast } from '@/composables/useToast'
import { useUsers, type User } from '@/composables/useUsers'
import { ButtonTypes } from '@/types/button'
import { StatusTypes, type StatusType } from '@/types/status'

const toast = useToast()

const headers = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Status', key: 'status' },
  { label: 'Actions', key: 'actions' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const { users, loading, fetchUsers, deleteUser } = useUsers()
const items = ref<User[]>([])

watch(
  users,
  newUsers => {
    items.value = [...newUsers]
  },
  { immediate: true }
)

const rowsPerPage = ref(10)

const updateRowsPerPage = () => {
  const width = window.innerWidth
  if (width <= 530) {
    rowsPerPage.value = 5
  } else {
    rowsPerPage.value = 10
  }
}

const localSearch = ref('')
const localStatus = ref<'all' | StatusType>('all')

const filteredUsers = computed(() => {
  const search = localSearch.value.trim().toLowerCase()
  return items.value
    .filter(u => localStatus.value === 'all' || u.status === localStatus.value)
    .filter(
      u =>
        !search || u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
    )
    .sort((a, b) => a.name.localeCompare(b.name))
})

const getUserName = computed(() => {
  const user = items.value.find(u => u.id === userToDelete.value)
  return user ? user.name : ''
})

const mapStatus = (value: string): StatusType => {
  switch (value.toLowerCase()) {
    case 'active':
      return StatusTypes.ACTIVE
    case 'inactive':
      return StatusTypes.INACTIVE
    default:
      return StatusTypes.UNKNOWN
  }
}

const confirmVisible = ref(false)
const userToDelete = ref<number | null>(null)
const loadingDelete = ref(false)

const onDeleteConfirmationHandler = (id: number) => {
  userToDelete.value = id
  confirmVisible.value = true
}

const onCancelHandler = () => {
  confirmVisible.value = false
  userToDelete.value = null
}

const onDeleteUserHandler = async () => {
  if (userToDelete.value === null) return

  loadingDelete.value = true
  const id = userToDelete.value
  const result = await deleteUser(id)

  if (result) {
    toast.success('User deleted successfully.')
  } else {
    toast.error('Failed to delete user. Please try again.')
  }

  confirmVisible.value = false
  userToDelete.value = null
  loadingDelete.value = false
}

const loadUsers = async () => {
  const success = await fetchUsers()
  if (!success) {
    toast.error('Failed to load users. Please try again later.')
  }
}

onMounted(() => {
  loadUsers()
  updateRowsPerPage()
  window.addEventListener('resize', updateRowsPerPage)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateRowsPerPage)
})
</script>
