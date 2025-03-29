// src/utils/toast.js
import { toast } from 'sonner'

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  promise: (promise, messages) => toast.promise(promise, messages),
  custom: (jsx) => toast(jsx),
}
