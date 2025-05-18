'use client'
import React, { useContext, useState, useEffect } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown, Dropdown2 } from '../../common/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'
import { fetchAllCourses } from '../../../services/course/course.service'
import { fetchAllSections } from '../../../services/section/section.services'

const AddVideo = () => {
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  // Initialize selectedCourseId from URL param if exists
  const [selectedCourseId, setSelectedCourseId] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlCourseId = params.get('courseId') || ''
    if (urlCourseId) {
      setSelectedCourseId(urlCourseId)
      updateCourseData({ courseId: urlCourseId, chapter: '' })
    }
  }, [])

  // Fetch all courses
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  })

  // Fetch sections when selectedCourseId changes
  const {
    data: lessons = [],
    isLoading: isLessonLoading,
    isError: isLessonError,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ['lessons', selectedCourseId],
    queryFn: () => fetchAllSections(selectedCourseId),
    enabled: !!selectedCourseId,
  })

  // Update context and refetch lessons on courseId change
  useEffect(() => {
    updateCourseData({ courseId: selectedCourseId, chapter: '' })
    if (selectedCourseId) {
      refetchLessons()
    }
  }, [selectedCourseId])

  // Mutation for uploading file
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

  // Handle dropdown changes, update URL query param on course select
  const handleDropdownChange = (field) => (selectedOption) => {
    if (field === 'courseId') {
      const newCourseId = selectedOption?.value || ''
      setSelectedCourseId(newCourseId)
      updateCourseData({ courseId: newCourseId, chapter: '' })

      // Update URL query param for courseId
      const params = new URLSearchParams(window.location.search)
      if (newCourseId) {
        params.set('courseId', newCourseId)
      } else {
        params.delete('courseId')
      }
      navigate(`${window.location.pathname}?${params.toString()}`, {
        replace: true,
      })
    } else {
      updateCourseData({ [field]: selectedOption?.value || '' })
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCourseData({ studyMaterial: file })
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

    setTimeout(() => {
      navigate('/admin-dashboard?activeSidebar=add-test')
    }, 500)
  }

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((course) => ({
      value: course.id,
      label: course.name,
    })),
  ]

  const chapterOptions = [
    { value: '', label: 'Select Chapter' },
    ...lessons.map((lesson) => ({
      value: lesson.id,
      label: lesson.name,
    })),
  ]

  const mandatoryOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  const selectedCourse =
    courseOptions.find((opt) => opt.value === selectedCourseId) ||
    courseOptions[0]

  const selectedChapter =
    chapterOptions.find((opt) => opt.value === courseData.chapter) ||
    chapterOptions[0]

  const selectedMandatory =
    mandatoryOptions.find((opt) => opt.value === courseData.mandatory) ||
    mandatoryOptions[0]

  const selectedStatus =
    statusOptions.find((opt) => opt.value === courseData.status) ||
    statusOptions[0]

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
          Add Video And Study Material
        </p>
        <div className="flex items-center gap-2">
          <Link to="/admin-dashboard?activeSidebar=add-test">
            <button className="text-nowrap rounded bg-[#252466] px-3 py-1.5 text-sm text-white">
              Add test
            </button>
          </Link>
        </div>
      </div>

      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        <div>
          <Dropdown
            label="Select Course"
            options={courseOptions}
            value={selectedCourse}
            onChange={handleDropdownChange('courseId')}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />
        </div>

        <div>
          <Dropdown
            label="Select Chapter"
            options={chapterOptions}
            value={selectedChapter}
            onChange={handleDropdownChange('chapter')}
            isLoading={isLessonLoading}
            isError={isLessonError}
            disabled={!selectedCourseId || isLessonLoading}
          />
        </div>

        <div>
          <Dropdown
            label="Is it mandatory to move for next"
            options={mandatoryOptions}
            value={selectedMandatory}
            onChange={handleDropdownChange('mandatory')}
          />
        </div>

        <div>
          <Input
            label="Chapter No."
            id="lessonNumber"
            name="lessonNumber"
            placeholder="1"
            value={courseData.lessonNumber || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Input
            label="Chapter Description"
            id="chapterDescription"
            name="chapterDescription"
            placeholder="Chapter Description"
            value={courseData.chapterDescription || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
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
          {courseData.studyMaterial && (
            <p className="text-xs text-gray-600 mt-1">
              File selected:{' '}
              {courseData.studyMaterial.name || 'Preview available'}
            </p>
          )}
        </div>

        <div>
          <Dropdown
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={handleDropdownChange('status')}
          />
        </div>

        <Button
          type="submit"
          className="col-span-2 mt-4 w-full"
          bgBtn="Add Video"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default AddVideo
