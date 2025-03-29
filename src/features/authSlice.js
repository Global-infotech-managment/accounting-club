// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const initialState = {
  user: null,
  role: null,
  token: Cookies.get('token') || null,
}

const decodeToken = (token) => {
  try {
    if (!token) return null
    const decoded = jwtDecode(token)
    return decoded.role || null
  } catch (error) {
    console.error('Token decoding failed:', error)
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    role: decodeToken(initialState.token),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = decodeToken(action.payload.token)
      Cookies.set('token', action.payload.token, { expires: 30 })
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      Cookies.remove('token')
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
