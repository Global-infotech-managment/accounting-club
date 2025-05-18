// services/auth/auth.service.js
import API from '../../api/authApi'

export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data)
  return {
    token: response.data.data.token,
    user: null,
  }
}

export const updateStatus = async (data) => {
  const response = await API.put('/auth/status', data)
  return {
    token: response,
  }
}
export const fetchStudents = async (params) => {
  const response = await API.get('/auth', {
    params,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    },
  })
  return {
    data: response.data.data.users,
    total: response.data.data.total,
  }
}

export const deleteStudent = async (id) => {
  await API.delete(`/auth/${id}`)
}

export const updateStudentProfile = async (userId, profileData) => {
  const response = await API.put(`/auth/${userId}`, profileData)
  return response.data.data
}
