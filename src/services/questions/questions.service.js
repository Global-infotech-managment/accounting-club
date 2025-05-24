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
