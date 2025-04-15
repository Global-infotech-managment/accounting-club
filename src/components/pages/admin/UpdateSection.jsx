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

const UpdateSection = () => {
  const [fileId, setFileId] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  // Upload Thumbnail
  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'thumbnails'),
    onSuccess: (response) => {
      showToast.success('Thumbnail uploaded successfully')
      setFileId(response.id || response)
    },
    onError: () => {
      showToast.error('Thumbnail upload failed')
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const handleDropdownChange = (selectedOption) => {
    updateCourseData({ mandatory: selectedOption.value })
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCourseData({ selectedFile: file })
      setPreviewUrl(URL.createObjectURL(file))
      await uploadFileMutation.mutateAsync(file)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()

    if (
      !courseData.name ||
      !courseData.description ||
      !courseData.chapter ||
      !courseData.mandatory ||
      !courseData.selectedFile
    ) {
      showToast.error('Please fill all required fields')
      return
    }

    showToast.success('Section updated successfully!')
    navigate('/admin-dashboard?activeSidebar=section')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
        <div className='flex justify-between items-center pb-3'>
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">
          Edit Section
        </p>
        <div className='flex items-center gap-4'>
        <a href="/admin-dashboard?activeSidebar=update-video"><Button type="submit" className="col-span-2 mt-4 w-[149px] text-nowrap" bgBtn="Update Video" disabled={uploadFileMutation.isLoading || uploadFileMutation.isLoading} /></a>
        <a href="/admin-dashboard?activeSidebar=update-test"><Button type="submit" className="col-span-2 mt-4 !py-2 px-5 !bg-transparent" bgBtn="Update Test" disabled={uploadFileMutation.isLoading || uploadFileMutation.isLoading} /></a>
        </div>
      </div>
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        <div>
          <span className="text-sm">Select Course*</span>
          <Input
            name="name"
            placeholder="Basics of Business Accounting"
            value={courseData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span className="text-sm">Section Name*</span>
          <Input
            name="chapter"
            placeholder="Chapter-1"
            value={courseData.chapter}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span className="text-sm">Description*</span>
          <Input
            name="description"
            placeholder="Basics of Accounting"
            value={courseData.description}
            onChange={handleInputChange}
          />
        </div>
        <Dropdown
          label="Is mandatory to move next*"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          onChange={handleDropdownChange}
        />
        <div className="flex flex-col items-start">
          <span>Course Thumbnails*</span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
        <Button
          type="submit"
          className="col-span-2 w-full mt-4"
          bgBtn="Update Section"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default UpdateSection
