// services/auth/course.service.js
import API from '../../api/authApi'

export const addSection = async (data) => {
  const response = await API.post('/course/admin', data)
  console.log(response, 'create course response')
  return response.data
}
