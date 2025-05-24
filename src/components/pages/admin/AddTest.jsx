import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import Button from '../../common/Button'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import { fetchAllCourses } from '../../../services/course/course.service'
import { fetchAllSections } from '../../../services/section/section.services' // chapters
import { addLessonTest } from '../../../services/lessonTest/lessonTest.services'

export default function AddTest() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  // 1) form data state
  const [formData, setFormData] = useState({
    courseId: '',
    testCode: '',
    exerciseName: '',
    topic: '',
    totalQuestions: '',
    passingPercentage: '',
    timeAllowed: '60',
    maxAttempts: '1',
    resultDeclaration: '',
    otherInfo: '',
  })

  // 2) chapterId state
  const [chapterId, setChapterId] = useState('')

  // 3) pull IDs from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cId = params.get('courseId') || ''
    const lId = params.get('lessonId') || '' // if you need lessonId later
    const chId = params.get('chapterId') || ''

    setFormData((f) => ({ ...f, courseId: cId }))
    setChapterId(chId)
  }, [location.search])

  // 4) fetch courses
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  })

  // 5) fetch chapters when course changes
  const {
    data: chapters = [],
    isLoading: isChaptersLoading,
    isError: isChaptersError,
  } = useQuery({
    queryKey: ['chapters', formData.courseId],
    queryFn: () => fetchAllSections(formData.courseId),
    enabled: !!formData.courseId,
  })

  // 6) mutation to create test
  const { mutate: createTest, isLoading: isSubmitting } = useMutation({
    mutationFn: addLessonTest,
    onSuccess: (newTestId) => {
      toast.success('Test created successfully!')
      queryClient.invalidateQueries(['tests', chapterId])
      // navigate with only testId
      navigate(
        `/admin-dashboard?activeSidebar=add-question&testId=${encodeURIComponent(newTestId)}`
      )
    },
    onError: (err) => {
      toast.error(`Error creating test: ${err.message}`)
    },
  })

  // 7) input handlers
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'courseId') {
      // reset chapter when course changes
      setChapterId('')
      // remove chapterId from URL
      const params = new URLSearchParams(location.search)
      params.delete('chapterId')
      navigate(`?${params.toString()}`, { replace: true })
    }
  }

  // 8) submit
  const handleSubmit = () => {
    if (
      !chapterId ||
      !formData.testCode ||
      !formData.exerciseName ||
      !formData.topic
    ) {
      toast.error('Please fill all required fields')
      return
    }
    const payload = {
      chapterId,
      testCodeNumber: Number(formData.testCode),
      exerciseName: formData.exerciseName,
      topic: formData.topic,
      totalQuestions: Number(formData.totalQuestions) || 0,
      passingPercentage: Number(formData.passingPercentage) || 0,
      timeAllowed: Number(formData.timeAllowed) || 60,
      maximumAttempts:
        formData.maxAttempts === 'unlimited'
          ? Number.MAX_SAFE_INTEGER
          : Number(formData.maxAttempts) || 1,
      resultDeclaration:
        formData.resultDeclaration === 'immediate'
          ? 'IMMEDIATE'
          : 'AFTER_REVIEW',
      otherInformation: formData.otherInfo || undefined,
    }
    createTest(payload)
  }

  // 9) dropdown options
  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((c) => ({ value: c.id, label: c.name })),
  ]
  const chapterOptions = [
    { value: '', label: 'Select Chapter' },
    ...chapters.map((ch) => ({ value: ch.id, label: ch.name })),
  ]
  const attemptOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'unlimited', label: 'Unlimited' },
  ]
  const resultDeclarationOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'after_review', label: 'After Review' },
  ]

  return (
    <div className="rounded-xl border border-black/30 bg-black/5 p-5">
      <h2 className="text-lg mb-4 font-semibold">Add Test</h2>

      <div className="space-y-4">
        {/* Course & Chapter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dropdown
            name="courseId"
            label="Select Course"
            options={courseOptions}
            value={formData.courseId}
            onChange={(n, v) => handleInputChange(n, v)}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />
          <Dropdown
            name="chapterId"
            label="Select Chapter"
            options={chapterOptions}
            value={chapterId}
            onChange={(_, v) => {
              setChapterId(v)
              const params = new URLSearchParams(location.search)
              params.set('chapterId', v)
              navigate(`?${params.toString()}`, { replace: true })
            }}
            isLoading={isChaptersLoading}
            isError={isChaptersError}
            disabled={!formData.courseId}
          />
        </div>

        {/* Basic Info */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="testCode"
            label="Test Code No"
            placeholder="302"
            value={formData.testCode}
            onChange={(e) => handleInputChange('testCode', e.target.value)}
          />
          <Input
            name="exerciseName"
            label="Exercise Name"
            placeholder="Basic Course"
            value={formData.exerciseName}
            onChange={(e) => handleInputChange('exerciseName', e.target.value)}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="topic"
            label="Topic"
            placeholder="Test Topic"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
          />
          <Input
            name="totalQuestions"
            label="Total Questions"
            placeholder="50"
            type="number"
            value={formData.totalQuestions}
            onChange={(e) =>
              handleInputChange('totalQuestions', e.target.value)
            }
          />
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="passingPercentage"
            label="Passing %"
            placeholder="33"
            type="number"
            value={formData.passingPercentage}
            onChange={(e) =>
              handleInputChange('passingPercentage', e.target.value)
            }
          />
          <Input
            name="timeAllowed"
            label="Time Allowed (mins)"
            placeholder="60"
            type="number"
            value={formData.timeAllowed}
            onChange={(e) => handleInputChange('timeAllowed', e.target.value)}
          />
        </div>

        {/* Restrictions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dropdown
            name="maxAttempts"
            label="Max Attempts"
            options={attemptOptions}
            value={formData.maxAttempts}
            onChange={(n, v) => handleInputChange(n, v)}
          />
          <Dropdown
            name="resultDeclaration"
            label="Result Declaration"
            options={resultDeclarationOptions}
            value={formData.resultDeclaration}
            onChange={(n, v) => handleInputChange(n, v)}
          />
        </div>

        <Input
          name="otherInfo"
          label="Other Info"
          placeholder="Additional details..."
          textarea
          value={formData.otherInfo}
          onChange={(e) => handleInputChange('otherInfo', e.target.value)}
        />
      </div>

      <Button
        className="mt-6 w-full"
        disabled={
          !chapterId ||
          !formData.testCode ||
          !formData.exerciseName ||
          !formData.topic ||
          isSubmitting
        }
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Submitting...' : 'Save And Next'}
      </Button>
    </div>
  )
}
