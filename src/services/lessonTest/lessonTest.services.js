// services/auth/course.service.js
import API from '../../api/authApi'

export const addLessonTest = async (data) => {
  const response = await API.post('/course-lesson-test/admin', data)
  console.log(response, 'create course-lesson-test response')
  return response.data
}
