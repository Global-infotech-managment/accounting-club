// services/auth/auth.service.js
import API from '../../api/authApi'

export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data)
  return {
    token: response.data.data.token,
    user: null,
  }
}
