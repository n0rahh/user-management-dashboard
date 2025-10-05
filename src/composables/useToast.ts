import { createApp, h, reactive } from 'vue'
import { Toast } from '@/components/UI'

export type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: number
  message: string
  type: ToastType
  duration?: number
}

const state = reactive<{ toasts: ToastMessage[] }>({
  toasts: [],
})

let id = 0

function addToast(message: string, type: ToastType, duration = 4000) {
  const newToast = { id: ++id, message, type, duration }
  state.toasts.push(newToast)
}

function removeToast(id: number) {
  const index = state.toasts.findIndex(t => t.id === id)
  if (index !== -1) state.toasts.splice(index, 1)
}

export function useToast() {
  return {
    success: (msg: string, duration?: number) => addToast(msg, 'success', duration),
    error: (msg: string, duration?: number) => addToast(msg, 'error', duration),
    info: (msg: string, duration?: number) => addToast(msg, 'info', duration),
  }
}

let mounted = false
export function mountToastContainer() {
  if (mounted) return
  mounted = true

  const container = document.createElement('div')
  container.className = 'toast-container'
  document.body.appendChild(container)

  const app = createApp({
    setup() {
      return () =>
        h(
          'div',
          { class: 'toast-stack' },
          state.toasts.map(t =>
            h(Toast, {
              key: t.id,
              id: t.id,
              message: t.message,
              type: t.type,
              duration: t.duration,
              onClose: removeToast,
            })
          )
        )
    },
  })

  app.mount(container)
}
