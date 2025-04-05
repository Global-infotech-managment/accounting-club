// services/auth/course.service.js
import API from '../../api/authApi'

export const addSection = async (data) => {
  const response = await API.post('/course-lesson/admin', data)
  console.log(response, 'create course response')
  return response.data
}
