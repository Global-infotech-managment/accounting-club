import { createAction } from '@reduxjs/toolkit'
import API from '../../api/authApi'

export const fetchAllchapters = async (sectionId) => {
  const response = await API.get(
    `course-sections/chapters/section/ ${sectionId}`
  )
  console.log('response ', response?.data?.data?.chapters)
  return response?.data?.data?.chapters
}


export const createChapter = async (data) => {
  const response = await API.post('/course-sections/chapters', data)
  console.log(response, 'create chapter response')
  return response.data.data
}