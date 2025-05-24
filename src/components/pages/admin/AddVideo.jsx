'use client'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'
import { fetchAllCourses } from '../../../services/course/course.service'
import { fetchAllSections } from '../../../services/section/section.services'
import { createChapter } from '../../../services/chapters/chapter.service'

export default function AddVideo() {
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedLessonId, setSelectedLessonId] = useState('')

  // 1) Sync URL params → state & context
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlCourseId = params.get('courseId') || ''
    const urlLessonId = params.get('lessonId') || ''

    if (urlCourseId) {
      setSelectedCourseId(urlCourseId)
      updateCourseData({ courseId: urlCourseId })
    }
    if (urlLessonId) {
      setSelectedLessonId(urlLessonId)
      updateCourseData({ lessonId: urlLessonId })
    }
  }, [location.search, updateCourseData])

  // 2) Fetch dropdown data
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  })
  const {
    data: lessons = [],
    isLoading: isLessonsLoading,
    isError: isLessonsError,
  } = useQuery({
    queryKey: ['lessons', selectedCourseId],
    queryFn: () => fetchAllSections(selectedCourseId),
    enabled: !!selectedCourseId,
  })

  // 3) Helpers to keep URL in sync
  const syncSearchParams = (key, value) => {
    const params = new URLSearchParams(location.search)
    if (value) params.set(key, value)
    else params.delete(key)
    navigate(`?${params.toString()}`, { replace: true })
  }

  const handleCourseChange = useCallback(
    (_name, value) => {
      setSelectedCourseId(value)
      setSelectedLessonId('')
      updateCourseData({ courseId: value, lessonId: '' })
      syncSearchParams('courseId', value)
    },
    [updateCourseData, syncSearchParams]
  )

  const handleLessonChange = useCallback(
    (_name, value) => {
      setSelectedLessonId(value)
      updateCourseData({ lessonId: value })
      syncSearchParams('lessonId', value)
    },
    [updateCourseData, syncSearchParams]
  )

  const handleGenericDropdown = (_name, value) => {
    updateCourseData({ [_name]: value })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  // 4) File upload mutation
  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'study-materials'),
    onSuccess: (response) => {
      const uploadedId = response.id || response
      showToast.success('Study material uploaded successfully')
      updateCourseData({ studyMaterialId: uploadedId })
    },
    onError: () => showToast.error('Study material upload failed'),
  })

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      updateCourseData({ studyMaterial: file })
      await uploadFileMutation.mutateAsync(file)
    }
  }

  // 5) Chapter-creation mutation
  const createVideoMutation = useMutation({
    mutationFn: (payload) => createChapter(payload),
    onSuccess: (createdChapter) => {
      // createdChapter.id should be the new chapter ID
      const chapterId = createdChapter.id || createdChapter
      showToast.success('Chapter created successfully!')
      // Append chapterId to URL along with existing search params
      const params = new URLSearchParams(location.search)
      params.set('chapterId', chapterId)
      navigate(`/admin-dashboard?activeSidebar=add-test&${params.toString()}`)
    },
    onError: (error) => {
      showToast.error(`Error creating chapter: ${error.message}`)
    },
  })

  // 6) Form submit
  const formSubmit = (e) => {
    e.preventDefault()
    // validate required fields per DTO
    const required = [
      'courseId',
      'lessonId',
      'lessonNumber', // maps to chapterNumber
      'chapterDescription',
      'videoDescription',
      'embedCode', // maps to videoCode
      'status',
      'studyMaterialId',
    ]
    const isValid = required.every((k) => courseData[k])
    if (!isValid) {
      showToast.error('Please fill all required fields')
      return
    }

    // Build payload matching CreateCourseSectionChapterSchema
    const payload = {
      sectionId: selectedLessonId,
      name: courseData.chapterDescription, // DTO requires `name`: you can choose name or map differently
      chapterNumber: Number(courseData.lessonNumber),
      chapterDescription: courseData.chapterDescription,
      videoDescription: courseData.videoDescription,
      videoCode: courseData.embedCode,
      isMandatory:
        courseData.isMandatory === 'true' || courseData.isMandatory === true,
      status: courseData.status === 'true' || courseData.status === true,
      studyMaterialId: courseData.studyMaterialId,
    }

    createVideoMutation.mutate(payload)
  }

  // 7) Dropdown options
  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((c) => ({ value: c.id, label: c.name })),
  ]
  const lessonOptions = [
    { value: '', label: 'Select Lesson' },
    ...lessons.map((l) => ({ value: l.id, label: l.name })),
  ]
  const yesNo = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ]
  const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Disable' },
  ]

  return (
    <div className="rounded-xl border border-black/30 bg-black/5 px-4 py-5">
      {/* Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="md:text-lg text-base font-semibold">Add Chapter</p>
        <Link to="/admin-dashboard?activeSidebar=add-test">
          <button className="rounded bg-[#252466] px-3 py-1.5 text-sm text-white">
            Add test
          </button>
        </Link>
      </div>

      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <Dropdown
          name="courseId"
          label="Select Course"
          options={courseOptions}
          value={selectedCourseId}
          onChange={handleCourseChange}
          isLoading={isCoursesLoading}
          isError={isCoursesError}
        />

        <Dropdown
          name="lessonId"
          label="Select Chapter"
          options={lessonOptions}
          value={selectedLessonId}
          onChange={handleLessonChange}
          isLoading={isLessonsLoading}
          isError={isLessonsError}
          disabled={!selectedCourseId}
        />

        <Input
          label="Chapter No."
          name="lessonNumber"
          placeholder="1"
          value={courseData.lessonNumber || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Chapter Description"
          name="chapterDescription"
          placeholder="Description..."
          value={courseData.chapterDescription || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Video Description"
          name="videoDescription"
          placeholder="Summary..."
          value={courseData.videoDescription || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Video Embed Code"
          name="embedCode"
          placeholder="<iframe ... />"
          value={courseData.embedCode || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Study Material"
          name="studyMaterial"
          type="file"
          accept=".pdf,.docx,.pptx"
          onChange={handleFileChange}
        />
        {courseData.studyMaterial?.name && (
          <p className="text-xs text-gray-600">
            File: {courseData.studyMaterial.name}
          </p>
        )}

        <Dropdown
          name="isMandatory"
          label="Is Mandatory?"
          options={yesNo}
          value={courseData.isMandatory || ''}
          onChange={handleGenericDropdown}
        />

        <Dropdown
          name="status"
          label="Status"
          options={statusOptions}
          value={courseData.status || ''}
          onChange={handleGenericDropdown}
        />

        <Button
          type="submit"
          bgBtn="Create Chapter"
          disabled={
            uploadFileMutation.isLoading || createVideoMutation.isLoading
          }
        />
      </form>
    </div>
  )
}
