// api/authApi.js
import axios from 'axios'
import Cookies from 'js-cookie'

const API = axios.create({
  // baseURL: 'https://ec2-51-20-34-228.eu-north-1.compute.amazonaws.com:4000/api/v1',
  // baseURL: 'http://localhost:4000/api/v1',
  // baseURL: 'https://accountants-club-api.onrender.com/api/v1',

  // sumit render url
  baseURL: 'https://accountants-club-api-n4z5.onrender.com/api/v1',
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
