// services/section/section.services.js
import API from '../../api/authApi'

export const addSection = async (data) => {
  const response = await API.post('/course-lesson/admin', data)
  return response.data
}

export const updateSection = async (id, data) => {
  const response = await API.put(`/course-lesson/admin/${id}`, data)
  return response.data
}

export const fetchAllSections = async () => {
  const response = await API.get('/course-lesson/admin')
  return response.data.data.courseLessons
}

export const fetchCourseById = async (id) => {
  const response = await API.get(`/course-lesson/${id}`)
  console.log(':response data ', response.data.data)
  return response.data.data
}
