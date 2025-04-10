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

const UpdateCourse = () => {
  const [fileId, setFileId] = useState(null)
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  // Mutation to create course
  const addCourse = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      showToast.success('Course created successfully')
      navigate('/admin-dashboard?activeSidebar=add-section')
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || 'Failed to create course'
      )
    },
  })

  // Mutation to upload file
  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'courses'),
    onSuccess: (response) => {
      showToast.success('File uploaded successfully')
      setFileId(response.id || response) // Ensure correct file ID is stored
    },
    onError: () => {
      showToast.error('File upload failed')
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCourseData({ selectedFile: file })
      await uploadFileMutation.mutateAsync(file)
    }
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
      showToast.error('Please fill all required fields')
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
        lessonNumber: courseData.lessonNumber || '',
        chapter: courseData.chapter || '',
        mandatory: courseData.mandatory || '',
        videoDescription: courseData.videoDescription || '',
      }

      await addCourse.mutateAsync(coursePayload)

      // Reset form after successful submission
      updateCourseData({
        name: '',
        description: '',
        price: '',
        validity: '',
        selectedFile: null,
        lessonNumber: '',
        chapter: '',
        mandatory: '',
        videoDescription: '',
        dragActive: false,
        status: true,
      })
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className='flex justify-between items-center pb-3'>
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">
          Edit Course
        </p>
        <div className='flex items-center gap-4'>
        <a href="/admin-dashboard?activeSidebar=update-section"><Button type="submit" className="col-span-2 mt-4 !py-2 px-5 !bg-transparent" bgBtn="Update Section" disabled={addCourse.isLoading || uploadFileMutation.isLoading} /></a>
        <a href="/admin-dashboard?activeSidebar=update-video"><Button type="submit" className="col-span-2 mt-4 w-[149px] text-nowrap" bgBtn="Update Video" disabled={addCourse.isLoading || uploadFileMutation.isLoading} /></a>
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-3 sm:gap-4 " onSubmit={formSubmit}>
        <div>
          <span className="text-sm">Course Name* </span>
          <Input name="name" placeholder="Basics of Business Accounting" value={courseData.name} onChange={handleInputChange} />
        </div>
        <div>
          <span className="text-sm">Description* </span>
          <Input name="description" placeholder="This is basic course for Accountants" value={courseData.description} onChange={handleInputChange} />
        </div>
      
   
        <div>
          <span className="text-sm">Price* </span>
          <Input name="price" placeholder="4900/-" type="text" value={courseData.price} onChange={handleInputChange} />
        </div>
        <div>
          <span className="text-sm">Validity* </span>
          <Input name="validity" placeholder="180 Days" type="text" value={courseData.validity} onChange={handleInputChange} />
        </div>
  
        <Dropdown label="Status" options={[{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]} onChange={handleDropdownChange} />
        <div className="flex flex-col items-start">
          <span>Thumbnail* </span>
          <Input type="file" onChange={handleFileChange} className="file-input" placeholder="Upload from file" />
        </div>
        <Button type="submit" className="col-span-2 w-full mt-4" bgBtn="Next" disabled={addCourse.isLoading || uploadFileMutation.isLoading} />
      </form>
    </div>
  )
}

export default UpdateCourse
