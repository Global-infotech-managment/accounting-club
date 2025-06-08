// services/auth/course.service.js
import API from '../../api/authApi'

export const addquestion = async (data) => {
  const response = await API.post('/course-tests/questions', data)
  console.log(response, 'create course-lesson-test response')
  return response.data
}

export const gettest = async (data) => {
  const response = await API.get('/course-tests/chapter', data)
  console.log(response, 'get course-lesson-test response')
  return response.data
}

export const getQuestion = async (questionId) => {
  const response = await API.get(`/course-tests/questions/${questionId}`)
  console.log(response?.data, 'get question by id')
  return response.data
}

export const updateQuestion = async (questionId, data) => {
  const response = await API.patch(
    `/course-tests/questions/${questionId}`,
    data
  )
  console.log(response, 'updated question')
  return response.data
}
