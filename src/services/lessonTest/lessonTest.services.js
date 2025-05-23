// services/auth/course.service.js
import API from '../../api/authApi'

export const addLessonTest = async (data) => {
  const response = await API.post('/course-tests', data)
  console.log(response, 'create course-lesson-test response')
  return response.data
}

export const updateLessonTest = async (testId, data) => {
  const response = await API.patch(`/course-lesson-test/admin/${testId}`, data)
  return response.data
}

export const fetchAllTestsByLessonId = async (lessonId) => {
  console.log('lessonId line 16 ', lessonId)
  const response = await API.get(`/course-lesson-test/admin/${lessonId}`)
  console.log('response line 17 ', response?.data?.data?.courseLessonTests)
  return response?.data?.data?.courseLessonTests
}

export const getLessonTest = async (id) => {
  const response = await API.get(`/course-lesson-test/lesson/${id}`)
  console.log(response, 'create course-lesson-test response')
  return response.data.data
}

export const getLessonTestById = async (id) => {
  const response = await API.get(`/course-lesson-test/${id}`)
  console.log(response?.data?.data, 'create course-lesson-test response')
  return response.data.data
}

export const deleteLessonTest = async (testId) => {
  const response = await API.delete(`/course-lesson-test/admin/${testId}`)
  return response.data
}
export const deleteLessonTestById = async (testId) => {
  const response = await API.delete(`/course-lesson-test/admin/${testId}`)
  return response.data
}
