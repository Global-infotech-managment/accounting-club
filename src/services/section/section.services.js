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

export const fetchAllsectionByCourseId = async (courseId) => {
  const response = await API.get(`lessons/course/${courseId}`)
  return response.data.data // Adjust based on your API response structure
}


export const deletesectionById = async (id) => {
  const response = await API.delete(`course-sections/course/${id}`)
  return response.data
}
