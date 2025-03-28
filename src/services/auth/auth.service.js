// services/auth/auth.service.js
import API from '../../api/authApi'
export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data)
  return response.data
}
