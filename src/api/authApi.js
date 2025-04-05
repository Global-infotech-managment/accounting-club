// api/authApi.js
import axios from 'axios'
import Cookies from 'js-cookie'

const API = axios.create({
  baseURL: 'https://n1znxhvw-4000.inc1.devtunnels.ms/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor for adding token automatically
API.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
