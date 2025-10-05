import { ref, readonly } from 'vue'

export type UserStatus = 'active' | 'inactive'
export interface User {
  id: number
  name: string
  email: string
  status: UserStatus
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active' },
  { id: 5, name: 'Charlie W.', email: 'charlie@example.com', status: 'inactive' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', status: 'active' },
  { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', status: 'active' },
  { id: 8, name: 'Fiona Glenanne', email: 'fiona@example.com', status: 'inactive' },
  { id: 9, name: 'George Clooney', email: 'george@example.com', status: 'active' },
  { id: 10, name: 'Hannah Montana', email: 'hannah@example.com', status: 'inactive' },
  { id: 11, name: 'Ian Fleming', email: 'ian@example.com', status: 'active' },
  { id: 12, name: 'Jack Ryan', email: 'jack@example.com', status: 'inactive' },
]

export function useUsers() {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      await delay(1000)
      users.value = [...mockUsers]
      return true
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch users'
      return false
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(id: number) {
    try {
      await delay(500)
      users.value = users.value.filter(u => u.id !== id)
      return true
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to delete user'
      return false
    }
  }

  return {
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    fetchUsers,
    deleteUser,
  }
}
