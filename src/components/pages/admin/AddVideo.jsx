'use client'
import React, { useContext, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation } from '@tanstack/react-query'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'

const AddVideo = () => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'study-materials'),
    onSuccess: (response) => {
      const uploadedId = response.id || response
      showToast.success('Study material uploaded successfully')
      updateCourseData({ studyMaterialId: uploadedId })
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

  const formSubmit = async (e) => {
    e.preventDefault()

    const requiredFields = [
      'name',
      'lessonNumber',
      'chapter',
      'mandatory',
      'videoDescription',
      'embedCode',
      'status',
      'studyMaterialId',
    ]

    const isValid = requiredFields.every((field) => !!courseData[field])

    if (!isValid) {
      showToast.error('Please fill all required fields')
      return
    }

    showToast.success('Video section updated successfully!')

    // ✅ Add delay for visual effect and debug
    setTimeout(() => {
      console.log('Navigating to: /admin-dashboard?activeSidebar=add-test')
      navigate('/admin-dashboard?activeSidebar=add-test')
    }, 500)
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      {/* <div className="flex justify-between items-center pb-3">
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">Add Video</p>
        /admin-dashboard?activeSidebar=add-test
      </div> */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
          Add Video And Study Material        </p>
        <div className="flex items-center gap-2">
         
          <Link to="/admin-dashboard?activeSidebar=add-test">
            <button className="rounded text-nowrap bg-[#252466] px-3 py-1.5 text-sm text-white">Add test
            </button>
          </Link>
        
        </div>
      </div>

      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>

        <div>
          <Dropdown
           label="Select Course"
            options={[
              { value: 'lesson first', label: 'lesson first' },
              { value: 'lesson second', label: 'lesson second' }
            ]}
            onChange={handleDropdownChange('name')}
          />
        </div>
        <div>
          <Dropdown
           label="Select Chapter"
            options={[
              { value: 'Select Chapter', label: 'Select Chapter' },
              { value: 'Select Chapter', label: 'Select Chapter' }
            ]}
            onChange={handleDropdownChange('name')}
          />
        </div>
        <div>
          <Dropdown
            label="Is it mandatory to move for next"
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]}
            onChange={handleDropdownChange('mandatory')}
          />
        </div>
        <div>
          <Input
          label="Chapter No."
            id="embedCode"
            name="embedCode"
            placeholder="1"
            value={courseData.embedCode || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
          label="Chapter Description"
            id="embedCode"
            name="embedCode"
            placeholder="Chapter Description"
            value={courseData.embedCode || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="videoDescription" className="text-sm"></label>
          <Input
          label="Video Description"
            id="videoDescription"
            name="videoDescription"
            placeholder="Short summary of the video..."
            value={courseData.videoDescription || ''}
            onChange={handleInputChange}
          />
        </div>   
        <div>
          <Input
          label="Video Embed Code"
            id="embedCode"
            name="embedCode"
            placeholder="<iframe src='...' />"
            value={courseData.embedCode || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col items-start">
          <Input
           label="Study Material"
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
          <Dropdown
            label="Status"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' }
            ]}
            onChange={handleDropdownChange('status')}
          />
        </div>

        <Button
          type="submit"
          className="col-span-2 w-full mt-4"
          bgBtn="Add Video"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default AddVideo
