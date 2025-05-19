import { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import Button from '../../common/Button'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'

import { useCreateTest } from '../../../hooks/useAuth'
import { fetchAllCourses } from '../../../services/course/course.service'
import {  fetchAllSectionsChapters } from '../../../services/section/section.services'

import { AppContext } from '../../../utils/AppContext'
import { toast } from 'sonner'

export default function AddTest() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const { courseData, updateCourseData } = useContext(AppContext)

  const [selectedLessonId, setSelectedLessonId] = useState('')

  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({ queryKey: ['courses'], queryFn: fetchAllCourses })

  const {
    data: lessons = [],
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery({
    queryKey: ['lessons', courseData.courseId],
    // queryFn: () => fetchAllSections(courseData.courseId),
    queryFn: fetchAllSectionsChapters,
    // enabled: !!courseData.courseId,
  })

  const { mutate: createTest, isPending } = useCreateTest()

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((c) => ({ value: c.id, label: c.chapterNumber })),
  ]

  const lessonOptions = [
    { value: '', label: 'Select Chapter' },
    ...lessons?.map((l) => ({ value: l.id, label: l.name })),
  ]

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const lessonIdFromURL = params.get('lessonId')
    if (lessonIdFromURL) setSelectedLessonId(lessonIdFromURL)
  }, [location.search])

  const handleLessonChange = (_name, value) => {
    setSelectedLessonId(value)

    const params = new URLSearchParams(location.search)
    params.set('lessonId', value)
    navigate(`?${params.toString()}`, { replace: true })
  }

  const handleFieldChange = (name, value) => {
    updateCourseData({ [name]: value })

    // Reset selected lesson when course changes
    if (name === 'courseId') {
      setSelectedLessonId('')
    }
  }

  const isFormValid = () => Boolean(selectedLessonId)

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error('Please fill all fields and select a lesson')
      return
    }

    const payload = {
      ...courseData,
      lessonId: selectedLessonId,
    }

    createTest(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tests', selectedLessonId] })
        toast.success('Test created successfully!')
        navigate('/admin-dashboard?activeSidebar=add-question')
      },
      onError: (error) => toast.error(`Error creating test: ${error.message}`),
    })
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-3 text-[16px] font-semibold text-black sm:mb-0 lg:text-[18px]">
          Add Test
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Dropdown
            name="courseId"
            label="Select Course"
            options={courseOptions}
            value={courseData.courseId}
            onChange={handleFieldChange}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />

          <Dropdown
            name="lessonId"
            label="Select Chapter"
            options={lessonOptions}
            value={selectedLessonId}
            onChange={handleLessonChange}
            isLoading={isLessonLoading}
            isError={isLessonError}
            disabled={!courseData.courseId}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Input
            name="testCode"
            label="Test Code No"
            placeholder="302"
            value={courseData.testCode}
            onChange={handleFieldChange}
          />
          <Input
            name="exerciseName"
            label="Exercise Name"
            placeholder="This is basic course for Accountants"
            value={courseData.exerciseName}
            onChange={handleFieldChange}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Input
            name="topic"
            label="Topic"
            placeholder="This is basic course for Accountants"
            value={courseData.topic}
            onChange={handleFieldChange}
          />
          <Input
            name="totalQuestions"
            label="Total Questions"
            placeholder="50"
            value={courseData.totalQuestions}
            onChange={handleFieldChange}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Input
            name="passingPercentage"
            label="Passing Percentage"
            placeholder="33%"
            value={courseData.passingPercentage}
            onChange={handleFieldChange}
          />
          <Input
            name="timeAllowed"
            label="Time Allowed"
            placeholder="30 min"
            value={courseData.timeAllowed}
            onChange={handleFieldChange}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Dropdown
  name="maxAttempts"
  label="Maximum Attempts"
  options={[
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'unlimited', label: 'Unlimited' },
  ]}
  value={courseData.maxAttempts || ''}
  onChange={handleFieldChange}
/>

<Dropdown
  name="resultDeclaration"
  label="Result Declaration"
  options={[
    { value: 'immediate', label: 'Immediate' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'manual', label: 'Manual' },
  ]}
  value={courseData.resultDeclaration}
  nChange={handleFieldChange}
/>

        </div>

        <Input
          name="otherInfo"
          label="Other Information"
          placeholder="Additional details..."
          value={courseData.otherInfo}
          onChange={handleFieldChange}
        />
      </div>
      <Button
        disabled={!isFormValid() || isPending}
        onClick={handleSubmit}
        bgBtn={isPending ? 'Submitting...' : 'Save And Next'}
        className="mt-4 w-full"
      />
    </div>
  )
}
