'use client'
import React, { useContext, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCourse } from '../../../services/course/course.service'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'

const AdminCoursesAdd = () => {
  const [fileId, setFileId] = useState(null)

  //add course mutation
  const addCourse = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      showToast.success('Course created successfully')
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || 'Failed to create course'
      )
    },
  })

  // Add file upload mutation
  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'courses'),
    onSuccess: () => {
      showToast.success('File uploaded successfully')
    },
  })
  const { courseData, updateCourseData } = useContext(AppContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const navigate = useNavigate()

  const handleFileChange = async (event) => {
    console.log(event.target.files, 'file')
    if (event.target.files && event.target.files.length > 0) {
      updateCourseData({ selectedFile: event.target.files[0] })
    }

    if (event.target.files[0]) {
      const uploadResponse = await uploadFileMutation.mutateAsync(
        event.target.files[0]
      )
      console.log(uploadResponse, 'upload response')
      setFileId(uploadResponse) // Adjust based on your API response
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    updateCourseData({ dragActive: true })
  }

  const handleDragLeave = () => {
    updateCourseData({ dragActive: false })
  }

  const handleDrop = (event) => {
    event.preventDefault()
    updateCourseData({
      dragActive: false,
      selectedFile: event.dataTransfer.files[0],
    })
  }

  const handleDropdownChange = (selectedOption) => {
    updateCourseData({ status: selectedOption.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (
      !courseData.name ||
      !courseData.description ||
      !courseData.price ||
      !courseData.validity ||
      !courseData.selectedFile
    ) {
      showToast.error('Please fill allfields')
      return
    }
    try {
      // Prepare course data
      const coursePayload = {
        name: courseData.name,
        description: courseData.description,
        price: Number(courseData.price),
        validity: Number(courseData.validity),
        status: courseData.status,
        fileId: fileId,
      }
      console.log(coursePayload, 'file id')

      // Create course
      await addCourse.mutateAsync(coursePayload)

      // Reset form
      updateCourseData({
        name: '',
        description: '',
        price: '',
        validity: '',
        selectedFile: null,
        dragActive: false,
        status: true,
      })
    } catch (error) {
      console.error('Error creating course:', error)
    }

    showToast.success('Course created successfully')

    navigate('/admin-dashboard?activeSidebar=add-section')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Course
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <Input
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleInputChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleInputChange}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={courseData.price}
          onChange={handleInputChange}
        />
        <Input
          name="validity"
          type="number"
          placeholder="Validity"
          value={courseData.validity}
          onChange={handleInputChange}
        />

        {/* Drag & Drop File Upload */}
        <div
          className={`flex h-[100px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 md:h-[150px] ${courseData.dragActive ? 'border-orange-red' : 'border-primary'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-800 text-center">
            Drag & Drop files or{' '}
            <label
              htmlFor="fileInput"
              className="cursor-pointer font-semibold text-orange-red"
            >
              Select files
            </label>{' '}
            to upload
          </p>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {courseData.selectedFile && (
          <p className="text-gray-700 mt-2">
            Uploaded File: {courseData.selectedFile.name}
          </p>
        )}

        <Dropdown
          label="Status"
          options={[
            { value: true, label: 'Active' },
            { value: false, label: 'Disable' },
          ]}
          defaultValue="Active"
          onChange={handleDropdownChange}
        />

        <Button
          type="submit"
          className="mt-5 md:mt-10"
          bgBtn="Next"
          disabled={addCourse.isLoading || uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default AdminCoursesAdd
