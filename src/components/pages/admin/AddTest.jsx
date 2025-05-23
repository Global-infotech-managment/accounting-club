import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import Button from '../../common/Button'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import { fetchAllCourses } from '../../../services/course/course.service'
import { fetchAllSections } from '../../../services/section/section.services'
import { addLessonTest } from '../../../services/lessonTest/lessonTest.services'

export default function AddTest() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    courseId: '',
    testCode: '',
    exerciseName: '',
    topic: '',
    totalQuestions: '',
    passingPercentage: '',
    timeAllowed: '60', // Default to 60 minutes
    maxAttempts: '1', // Default to 1 attempt
    resultDeclaration: '',
    otherInfo: '',
  })
  const [selectedChapterId, setSelectedChapterId] = useState('')

  // Fetch courses
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  })

  // Fetch chapters when course is selected
  const {
    data: chapters = [],
    isLoading: isChaptersLoading,
    isError: isChaptersError,
  } = useQuery({
    queryKey: ['chapters', formData.courseId],
    queryFn: () => fetchAllSections(formData.courseId),
    enabled: !!formData.courseId,
  })

  // Check for chapterId in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const chapterIdFromUrl = params.get('lessonId')
    if (chapterIdFromUrl) setSelectedChapterId(chapterIdFromUrl)
  }, [location.search])

  // Mutation for creating test
  const { mutate: createTest, isPending: isSubmitting } = useMutation({
    mutationFn: addLessonTest,
    onSuccess: () => {
      toast.success('Test created successfully!')
      queryClient.invalidateQueries(['tests', selectedChapterId])
      navigate('/admin-dashboard?activeSidebar=add-question')
    },
    onError: (error) => {
      toast.error(`Error creating test: ${error.message}`)
    },
  })

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Reset chapter selection when course changes
    if (name === 'courseId') {
      setSelectedChapterId('')
      // Clear chapterId from URL if needed
      const params = new URLSearchParams(location.search)
      params.delete('lessonId')
      navigate(`?${params.toString()}`, { replace: true })
    }
  }

  const handleChapterChange = (name, value) => {
    setSelectedChapterId(value)
    // Update URL with chapterId
    const params = new URLSearchParams(location.search)
    params.set('lessonId', value)
    navigate(`?${params.toString()}`, { replace: true })
  }

  const handleSubmit = () => {
    // Basic validation
    if (
      !selectedChapterId ||
      !formData.testCode ||
      !formData.exerciseName ||
      !formData.topic
    ) {
      toast.error('Please fill all required fields')
      return
    }

    // Prepare payload according to CreateCourseTestSchema
    const payload = {
      chapterId: selectedChapterId,
      testCodeNumber: Number(formData.testCode),
      exerciseName: formData.exerciseName,
      topic: formData.topic,
      totalQuestions: Number(formData.totalQuestions) || 0,
      passingPercentage: Number(formData.passingPercentage) || 0,
      timeAllowed: Number(formData.timeAllowed) || 60,
      maximumAttempts:
        formData.maxAttempts === 'unlimited'
          ? Infinity
          : Number(formData.maxAttempts) || 1,
      resultDeclaration:
        formData.resultDeclaration === 'immediate'
          ? 'IMMEDIATE'
          : 'AFTER_REVIEW',
      otherInformation: formData.otherInfo || undefined,
    }

    createTest(payload)
  }

  // Prepare dropdown options
  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((course) => ({ value: course.id, label: course.name })),
  ]

  const chapterOptions = [
    { value: '', label: 'Select Chapter' },
    ...chapters.map((chapter) => ({ value: chapter.id, label: chapter.name })),
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
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] p-5">
      <h2 className="text-lg mb-4 font-semibold">Add Test</h2>

      <div className="space-y-4">
        {/* Course and Chapter Selection */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dropdown
            name="courseId"
            label="Select Course"
            options={courseOptions}
            value={formData.courseId}
            onChange={handleInputChange}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />
          <Dropdown
            name="chapterId"
            label="Select Chapter"
            options={chapterOptions}
            value={selectedChapterId}
            onChange={handleChapterChange}
            isLoading={isChaptersLoading}
            isError={isChaptersError}
            disabled={!formData.courseId}
          />
        </div>

        {/* Test Basic Info */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="testCode"
            label="Test Code No"
            placeholder="302"
            value={formData.testCode}
            onChange={(e) => handleInputChange('testCode', e.target.value)}
            required
          />
          <Input
            name="exerciseName"
            label="Exercise Name"
            placeholder="Basic Accountants Course"
            value={formData.exerciseName}
            onChange={(e) => handleInputChange('exerciseName', e.target.value)}
            required
          />
        </div>

        {/* Test Details */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="topic"
            label="Topic"
            placeholder="Test Topic"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            required
          />
          <Input
            name="totalQuestions"
            label="Total Questions"
            placeholder="50"
            value={formData.totalQuestions}
            onChange={(e) =>
              handleInputChange('totalQuestions', e.target.value)
            }
            type="number"
          />
        </div>

        {/* Test Settings */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            name="passingPercentage"
            label="Passing Percentage"
            placeholder="33"
            value={formData.passingPercentage}
            onChange={(e) =>
              handleInputChange('passingPercentage', e.target.value)
            }
            type="number"
          />
          <Input
            name="timeAllowed"
            label="Time Allowed (mins)"
            placeholder="60"
            value={formData.timeAllowed}
            onChange={(e) => handleInputChange('timeAllowed', e.target.value)}
            type="number"
          />
        </div>

        {/* Test Restrictions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dropdown
            name="maxAttempts"
            label="Maximum Attempts"
            options={attemptOptions}
            value={formData.maxAttempts}
            onChange={handleInputChange}
          />
          <Dropdown
            name="resultDeclaration"
            label="Result Declaration"
            options={resultDeclarationOptions}
            value={formData.resultDeclaration}
            onChange={handleInputChange}
          />
        </div>

        {/* Additional Info */}
        <Input
          name="otherInfo"
          label="Other Information"
          placeholder="Additional details..."
          value={formData.otherInfo}
          onChange={(e) => handleInputChange('otherInfo', e.target.value)}
          textarea
        />
      </div>

      {/* Submit Button */}
      <Button
        className="mt-6 w-full"
        disabled={
          !selectedChapterId ||
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