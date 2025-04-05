import React, { useState } from 'react'
import { fetchAllCourses } from '../../../services/course/course.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dropdown } from '../../common/Dropdown'
import { addLessonTest } from '../../../services/lessonTest/lessonTest.services'
import { showToast } from '../../../services/toast/toast.service'
import { fetchAllSections } from '../../../services/section/section.services'

const AddVideo = () => {
  const [form, setForm] = useState({
    lessonId: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  })

  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: fetchAllSections,
    onSuccess: (data) => {
      if (data?.lessons?.length > 0) {
        setForm((prev) => ({ ...prev, lessonId: data.lessons[0].id }))
      }
    },
  })

  const leesonTest = useMutation({
    mutationFn: addLessonTest,
    onSuccess: () => {
      showToast.success('Lesson test created successfully')
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        showToast.error('Test already added with this lesson')
      } else {
        showToast.error(
          error.response?.data?.message || 'Failed to create lesson test'
        )
      }
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDropdownChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options]
    updatedOptions[index] = value
    setForm({ ...form, options: updatedOptions })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!form.lessonId) {
      showToast.error('Please select a lesson')
      setIsSubmitting(false)
      return
    }
    // Validation
    const filledOptions = form.options.filter((opt) => opt.trim() !== '')
    if (filledOptions.length < 4) {
      showToast.error('Please fill all 4 options')
      setIsSubmitting(false)
      return
    }

    if (!form.options.includes(form.answer)) {
      showToast.error('Answer must match one of the options')
      setIsSubmitting(false)
      return
    }

    leesonTest.mutate({
      lessonId: form.lessonId,
      question: form.question,
      options: form.options,
      answer: form.answer,
    })

    // Reset
    setForm({
      lessonId: '',
      question: '',
      options: ['', '', '', ''],
      answer: '',
    })
    setIsSubmitting(false)
  }

  const courseOptions = [
    { value: '', label: 'Please select a lesson' },
    ...(lessons?.map((lesson) => ({
      value: lesson.id,
      label: lesson.name,
    })) || []),
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-md mx-auto max-w-xl space-y-4 rounded-lg bg-white p-6"
    >
      <h2 className="text-2xl mb-4 font-semibold">Create Lesson Test</h2>

      <Dropdown
        name="lessonId"
        label="Select Lesson"
        options={courseOptions}
        value={form.lessonId}
        onChange={handleDropdownChange}
        isLoading={isLoading}
        isError={isError}
      />

      <div>
        <label className="block font-medium">Question</label>
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Options</label>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={form.options[index]}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block font-medium">Answer</label>
        <input
          type="text"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="hover:bg-green-700 w-full rounded py-2 font-semibold text-dark-black disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default AddVideo
