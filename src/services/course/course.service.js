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

export const deleteCourse = async (id) => {
  //   await API.delete(`/course/admin/${id}`)
}

export const toggleCourseStatus = async (id, status) => {
  //   await API.patch(`/course/admin/${id}/status`, { status })
}
