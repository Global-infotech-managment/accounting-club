import API from '../../api/authApi'

export const fetchAllchapters = async (sectionId) => {
  const response = await API.get(
    `course-sections/chapters/section/ ${sectionId}`
  )
  console.log('response ', response?.data?.data?.chapters)
  return response?.data?.data?.chapters
}
