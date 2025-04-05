// services/auth/course.service.js
import API from '../../api/authApi'

export const addSection = async (data) => {
  const response = await API.post('/course-lesson/admin', data)
  console.log(response, 'create course response')
  return response.data
}

export const fetchAllSections = async () => {
  const response = await API.get('/course-lesson/admin')
  console.log(response, 'fetch all course response')
  return response.data.data.courseLessons
}
