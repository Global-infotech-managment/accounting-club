'use client'
import React, { useContext, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation } from '@tanstack/react-query'
import { createCourse } from '../../../services/course/course.service'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'

const AdminCoursesAdd = () => {
  const [fileId, setFileId] = useState(null)
  const [loading, setLoading] = useState(false) // State for loading overlay

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

  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'courses'),
    onMutate: () => setLoading(true), // Show loading when upload starts
    onSuccess: (data) => {
      showToast.success('File uploaded successfully')
      setFileId(data) // Save file ID
    },
    onError: () => {
      showToast.error('Failed to upload file')
    },
    onSettled: () => setLoading(false), // Hide loading when upload completes
  })

  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const handleFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      updateCourseData({ selectedFile: event.target.files[0] })
      await uploadFileMutation.mutateAsync(event.target.files[0])
    }
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
      showToast.error('Please fill all fields')
      return
    }
    try {
      const coursePayload = {
        name: courseData.name,
        description: courseData.description,
        price: Number(courseData.price),
        validity: Number(courseData.validity),
        status: courseData.status,
        fileId: fileId,
      }

      await addCourse.mutateAsync(coursePayload)

      updateCourseData({
        name: '',
        description: '',
        price: '',
        validity: '',
        selectedFile: null,
        dragActive: false,
        status: true,
      })

      navigate('/admin-dashboard?activeSidebar=add-section')
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="border-t-transparent h-16 w-16 animate-spin rounded-full border-4 border-white"></div>
        </div>
      )}

      <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
        <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
          Add Course
        </p>
        <hr className="mb-4 w-full bg-black opacity-10" />
        <form className="flex flex-col gap-4" onSubmit={formSubmit}>
          <Input
           label="Course Name"
            name="name"
            placeholder="Course Name"
            value={courseData.name}
            onChange={(e) =>
              updateCourseData({ [e.target.name]: e.target.value })
            }
          />
          <Input
           label="description"
            name="description"
            placeholder="Description"
            value={courseData.description}
            onChange={(e) =>
              updateCourseData({ [e.target.name]: e.target.value })
            }
          />
          <Input
          label="Price"
            name="price"
            type="number"
            placeholder="Price"
            value={courseData.price}
            onChange={(e) =>
              updateCourseData({ [e.target.name]: e.target.value })
            }
          />
          <Input
          label="validity"
            name="validity"
            type="number"
            placeholder="180d"
            value={courseData.validity}
            onChange={(e) =>
              updateCourseData({ [e.target.name]: e.target.value })
            }
          />

          {/* Drag & Drop File Upload */}
          <div
            className={`flex h-[100px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 md:h-[150px] ${courseData.dragActive ? 'border-orange-red' : 'border-primary'}`}
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
            onChange={(selectedOption) =>
              updateCourseData({ status: selectedOption.value })
            }
          />

          <Button
            type="submit"
            className="mt-5 md:mt-10"
            bgBtn="Next"
            disabled={addCourse.isLoading || uploadFileMutation.isLoading}
          />
        </form>
      </div>
    </div>
  )
}

export default AdminCoursesAdd
