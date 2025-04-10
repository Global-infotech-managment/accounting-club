'use client'
import React, { useContext, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation } from '@tanstack/react-query'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'

const UpdateVideo = () => {
  const [fileId, setFileId] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'study-materials'),
    onSuccess: (response) => {
      showToast.success('Study material uploaded successfully')
      setFileId(response.id || response)
    },
    onError: () => {
      showToast.error('Study material upload failed')
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const handleDropdownChange = (field) => (selectedOption) => {
    updateCourseData({ [field]: selectedOption.value })
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCourseData({ studyMaterial: file })
      setPreviewUrl(URL.createObjectURL(file))
      await uploadFileMutation.mutateAsync(file)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()
    const requiredFields = [
      'name',
      'lessonNumber',
      'chapter',
      'mandatory',
      'videoDescription',
      'embedCode',
      'status',
      'studyMaterial',
    ]

    const isValid = requiredFields.every((field) => courseData[field])
    if (!isValid) {
      showToast.error('Please fill all required fields')
      return
    }

    showToast.success('Video section updated successfully!')
    navigate('/admin-dashboard?activeSidebar=section')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="flex justify-between items-center pb-3">
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">Edit Video</p>
        <div className="flex items-center gap-4">
          <a href="/admin-dashboard?activeSidebar=update-course">
              <Button
                type="submit"
                className="col-span-2 mt-4 !py-2 px-5 !bg-transparent"
                bgBtn="Update Course"
                disabled={uploadFileMutation.isLoading}
              />
          </a>
          <a href="/admin-dashboard?activeSidebar=update-video">
              <Button
                type="submit"
                className="col-span-2 mt-4 w-[149px] text-nowrap"
                bgBtn="Update Video"
                disabled={uploadFileMutation.isLoading}
              />
          </a>
        </div>
      </div>

      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        <div>
          <label htmlFor="name" className="text-sm">Select Course*</label>
          <Input
            id="name"
            name="name"
            placeholder="Basics of Business Accounting"
            value={courseData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="lessonNumber" className="text-sm">Lesson Number*</label>
          <Input
            id="lessonNumber"
            name="lessonNumber"
            placeholder="1"
            value={courseData.lessonNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="chapter" className="text-sm">Select Chapter*</label>
          <Input
            id="chapter"
            name="chapter"
            placeholder="Chapter 1 - Introduction"
            value={courseData.chapter}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="text-sm">Is it mandatory to move for next*</label>
          <Dropdown
            label=""
            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
            onChange={handleDropdownChange('mandatory')}
          />
        </div>

        <div>
          <label htmlFor="videoDescription" className="text-sm">Video Description*</label>
          <Input
            id="videoDescription"
            name="videoDescription"
            placeholder="Short summary of the video..."
            value={courseData.videoDescription}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="embedCode" className="text-sm">Video Embed Code*</label>
          <Input
            id="embedCode"
            name="embedCode"
            placeholder="<iframe src='...' />"
            value={courseData.embedCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="studyMaterial" className="text-sm">Study Material*</label>
          <Input
            id="studyMaterial"
            name="studyMaterial"
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={handleFileChange}
          />
          {previewUrl && (
            <p className="text-xs text-gray-600 mt-1">
              File selected: {courseData.studyMaterial?.name || 'Preview available'}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm">Status</label>
          <Dropdown
            label=""
            options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
            onChange={handleDropdownChange('status')}
          />
        </div>

        <Button
          type="submit"
          className="col-span-2 w-full mt-4"
          bgBtn="Update Video"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default UpdateVideo
