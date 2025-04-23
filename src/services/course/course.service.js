// services/auth/course.service.js
import API from '../../api/authApi'

export const fetchCourses = async (params) => {
  const response = await API.get('/course/admin', {
    params,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    },
  })
  return {
    data: response.data.data.courses,
    total: response.data.data.total,
  }
}

export const fetchCoursesForStudent = async (params) => {
  const response = await API.get('/course/student', {
    params,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    },
  })
  return {
    data: response.data.data.courses,
    total: response.data.data.total,
  }
}

export const fetchAllCourses = async () => {
  const response = await API.get('/course/admin')
  return response.data.data.courses
}

export const createCourse = async (data) => {
  const response = await API.post('/course/admin', data)
  console.log(response, 'create course response')
  return response.data.data
}

export const updateCourse = async (data) => {
  const response = await API.patch(`/course/admin`, data)
  console.log(response, 'update course response')
  return response.data.data
}

export const deleteCourseById = async (id) => {
  await API.delete(`/course/admin/${id}`)
}

export const findCourseById = async (slug) => {
  console.log('slug 58', slug)
  const response = await API.get(`/course/${slug}`)
  console.log('response data', response.data.data)
  return response.data.data
}
export const findCourseByCourseId = async (courseId) => {
  const response = await API.get(`/course/${courseId}`)
  console.log('response data', response.data.data)
  return response.data.data
}

export const deleteCourse = async (id) => {
  await API.delete(`/course/admin/${id}`)
}

export const toggleCourseStatus = async (id, status) => {
  //   await API.patch(`/course/admin/${id}/status`, { status })
}
