'use client'
import React, { useContext, useState, useEffect } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
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
  const handleDropdownChange = (name, value) => {
    updateCourseData({ [name]: value })
  
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(name, value) 
    navigate(`?${searchParams.toString()}`, { replace: true })
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
  {/* ─── Course ───────────────────────────── */}
  <Dropdown
    label="Select Course"
    options={courseOptions}
    value={courseData.courseId || ''}
    onChange={handleDropdownChange}
    isLoading={isCoursesLoading}
    isError={isCoursesError}
  />

  {/* ─── Chapter ──────────────────────────── */}
  <Dropdown
    label="Select Chapter"
    options={chapterOptions}
    value={courseData.chapter || ''}
    onChange={(val) => handleDropdownChange('chapter', val)}
    isLoading={isLessonLoading}
    isError={isLessonError}
    disabled={!selectedCourseId || isLessonLoading}
  />

  {/* ─── Mandatory ────────────────────────── */}
   <Dropdown
            name="isMandatory"
            label="Is mandatory to move next"
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
            value={courseData.isMandatory}
            onChange={handleDropdownChange}
          />

  {/* ─── Lesson Number ────────────────────── */}
  <Input
    label="Chapter No."
    id="lessonNumber"
    name="lessonNumber"
    placeholder="1"
    value={courseData.lessonNumber || ''}
    onChange={handleInputChange}
  />

  {/* ─── Chapter Description ──────────────── */}
  <Input
    label="Chapter Description"
    id="chapterDescription"
    name="chapterDescription"
    placeholder="Chapter Description"
    value={courseData.chapterDescription || ''}
    onChange={handleInputChange}
  />

  {/* ─── Video Description ────────────────── */}
  <Input
    label="Video Description"
    id="videoDescription"
    name="videoDescription"
    placeholder="Short summary of the video..."
    value={courseData.videoDescription || ''}
    onChange={handleInputChange}
  />

  {/* ─── Video Embed Code ─────────────────── */}
  <Input
    label="Video Embed Code"
    id="embedCode"
    name="embedCode"
    placeholder="<iframe src='...' />"
    value={courseData.embedCode || ''}
    onChange={handleInputChange}
  />

  {/* ─── Study Material ───────────────────── */}
  <Input
    label="Study Material"
    id="studyMaterial"
    name="studyMaterial"
    type="file"
    accept=".pdf,.docx,.pptx"
    onChange={handleFileChange}
  />
  {courseData.studyMaterial && (
    <p className="mt-1 text-xs text-gray-600">
      File selected: {courseData.studyMaterial.name || 'Preview available'}
    </p>
  )}

  {/* ─── Status ───────────────────────────── */}
    <Dropdown
            name="status"
            label="Status"
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Disable' },
            ]}
            value={courseData.status}
            onChange={handleDropdownChange}
          />

  {/* ─── Submit ───────────────────────────── */}
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