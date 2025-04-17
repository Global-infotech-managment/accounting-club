// services/auth/course.service.js
import API from '../../api/authApi'

export const addLessonTest = async (data) => {
  const response = await API.post('/course-lesson-test/admin', data)
  console.log(response, 'create course-lesson-test response')
  return response.data
}

export const updateLessonTest = async (testId, data) => {
  const response = await API.patch(`/course-lesson-test/admin/${testId}`, data)
  return response.data
}

export const getLessonTest = async (id) => {
  const response = await API.get(`/course-lesson-test/lesson/${id}`)
  console.log(response, 'create course-lesson-test response')
  return response.data.data
}
