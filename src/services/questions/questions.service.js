// services/auth/course.service.js
import API from '../../api/authApi'

export const addquestion = async (data) => {
  const response = await API.post('/course-tests/questions', data)
  console.log(response, 'create course-lesson-test response')
  return response.data
}
