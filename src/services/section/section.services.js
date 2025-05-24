// services/section/section.services.js
import API from '../../api/authApi'

// export const addSection = async (data) => {
//   const response = await API.post('/course-lesson/admin', data)
//   return response.data
// }
export const addSection = async (data) => {
  const response = await API.post('/course-sections/', data)
  return response.data
}

export const updateSection = async (id, data) => {
  const response = await API.put(`/course-lesson/admin/${id}`, data)
  return response.data
}

// export const fetchAllSections = async () => {
//   const response = await API.get('/course-lesson/admin')
//   return response.data.data.courseLessons
// }
export const fetchAllSections = async (courseId) => {
  const response = await API.get(`/course-sections/course/${courseId}`)
  return response.data.data.sections
}


export const fetchAllSectionsByCourseId = async (courseId) => {
  const response = await API.get(`course-lesson/admin/${courseId}`)
  console.log('response ', response?.data?.data?.lessons)
  return response?.data?.data?.lessons
}

export const fetchCourseById = async (id) => {
  const response = await API.get(`/course-lesson/${id}`)
  return response.data.data
}

export const deleteLessonById = async (id) => {
  const response = await API.delete(`course-lesson/admin/${id}`)
  return response.data
}
