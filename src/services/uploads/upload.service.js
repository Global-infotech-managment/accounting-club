import API from '../../api/authApi'

export const uploadFile = async (file, folder) => {
  const formData = new FormData()
  formData.append('files', file)
  formData.append('folder', folder)

  const response = await API.post('/uploads/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response?.data?.data?.savedFiles?.[0]?.id
}
