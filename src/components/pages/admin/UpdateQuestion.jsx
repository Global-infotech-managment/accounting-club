import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import Button from '../../common/Button'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import { addquestion } from '../../../services/questions/questions.service'

export default function UpdateQuestion() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const testId = searchParams.get('testId') || ''

  const [questionType, setQuestionType] = useState('MCQ')
  const [testLevel, setTestLevel] = useState('EASY')
  const [marks, setMarks] = useState(1)
  const [negativeMarks, setNegativeMarks] = useState(0)

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  const mutation = useMutation({
    mutationFn: addquestion,
    onSuccess: (_, variables) => {
      toast.success('Question added!')
      queryClient.invalidateQueries(['tests', variables.testId])
      navigate('/admin-dashboard?activeSidebar=dashboard')
    },
    onError: (error) => {
      toast.error(error?.message || 'Failed to add question')
    },
  })

  const { mutate: createQuestion, isLoading: isSubmitting } = mutation

  const handleDropdownChange = (name, value) => {
    switch (name) {
      case 'questionType':
        setQuestionType(value)
        setQuestions([
          { question: '', options: ['', '', '', ''], correctAnswer: '' },
        ])
        setCurrentIndex(0)
        break
      case 'testLevel':
        setTestLevel(value)
        break
      case 'marks':
        setMarks(Number(value))
        break
      case 'negativeMarks':
        setNegativeMarks(Number(value))
        break
      default:
        break
    }
  }

  const handleQuestionChange = (e) => {
    const updated = [...questions]
    updated[currentIndex].question = e.target.value
    setQuestions(updated)
  }

  const handleOptionChange = (idx, value) => {
    const updated = [...questions]
    updated[currentIndex].options[idx] = value

    // If the option being changed was the correct answer, reset it
    if (
      updated[currentIndex].correctAnswer ===
      questions[currentIndex].options[idx]
    ) {
      updated[currentIndex].correctAnswer = ''
    }

    setQuestions(updated)
  }

  const handleCorrectAnswer = (value) => {
    const updated = [...questions]
    updated[currentIndex].correctAnswer = value
    setQuestions(updated)
  }

  const isCurrentValid = () => {
    const q = questions[currentIndex]
    if (!q.question.trim()) return false
    if (questionType === 'MCQ') {
      return q.options.every((o) => o.trim()) && !!q.correctAnswer.trim()
    }
    if (questionType === 'TRUE_FALSE') {
      return q.correctAnswer === 'TRUE' || q.correctAnswer === 'FALSE'
    }
    if (questionType === 'FILL_IN_THE_BLANK') {
      return !!q.correctAnswer.trim()
    }
    return false
  }

  const addNew = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ])
    setCurrentIndex(questions.length)
  }

  const next = () => {
    if (!isCurrentValid()) return
    if (currentIndex === questions.length - 1) addNew()
    else setCurrentIndex(currentIndex + 1)
  }

  const prev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1)

  const handleSubmit = () => {
    if (!testId) {
      toast.error('Missing testId in URL')
      return
    }
    if (!isCurrentValid()) {
      toast.error('Complete current question')
      return
    }

    const current = questions[currentIndex]
    const payload = {
      testId,
      questionType,
      testLevel,
      marks,
      negativeMarks,
      question: current.question,
      options: questionType === 'MCQ' ? current.options : [],
      answer: current.correctAnswer,
    }

    createQuestion(payload)
  }

  return (
    <div className="shadow rounded bg-white p-6">
      <h2 className="text-2xl mb-4 font-semibold">Update Question</h2>

      <div className="mb-4 flex gap-4">
        <Dropdown
          name="questionType"
          label="Type"
          options={[
            { value: 'MCQ', label: 'Multiple Choice' },
            { value: 'TRUE_FALSE', label: 'True / False' },
            { value: 'FILL_IN_THE_BLANK', label: 'Fill in the Blank' },
          ]}
          value={questionType}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="testLevel"
          label="Level"
          options={[
            { value: 'EASY', label: 'Easy' },
            { value: 'MEDIUM', label: 'Medium' },
            { value: 'HARD', label: 'Hard' },
          ]}
          value={testLevel}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="marks"
          label="Marks"
          options={[1, 2, 3, 4, 5].map((n) => ({ value: n, label: `${n}` }))}
          value={marks}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="negativeMarks"
          label="Neg. Marks"
          options={[0, 0.5, 1, 1.5, 2].map((n) => ({
            value: -n,
            label: `-${n}`,
          }))}
          value={negativeMarks}
          onChange={handleDropdownChange}
        />
      </div>

      <Input
        placeholder="Enter question"
        value={questions[currentIndex].question}
        onChange={handleQuestionChange}
      />

      {questionType === 'MCQ' && (
        <div className="mt-4 space-y-2">
          <p className="font-medium">Options & Correct Answer</p>
          {questions[currentIndex].options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 font-bold">{['A', 'B', 'C', 'D'][i]}</span>
              <Input
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
              <button
                onClick={() => handleCorrectAnswer(opt)}
                className={
                  questions[currentIndex].correctAnswer === opt
                    ? 'text-green-600 font-bold'
                    : 'text-gray-400'
                }
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      )}

      {questionType === 'TRUE_FALSE' && (
        <div className="mt-4 flex gap-4">
          {['TRUE', 'FALSE'].map((v) => (
            <button
              key={v}
              onClick={() => handleCorrectAnswer(v)}
              className={
                questions[currentIndex].correctAnswer === v
                  ? 'bg-blue-500 rounded px-4 py-2 text-light-blue'
                  : 'bg-gray-200 rounded px-4 py-2'
              }
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {questionType === 'FILL_IN_THE_BLANK' && (
        <div className="mt-4">
          <Input
            placeholder="Enter correct answer"
            value={questions[currentIndex].correctAnswer}
            onChange={(e) => handleCorrectAnswer(e.target.value)}
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="px-4 py-2"
        >
          Previous
        </button>
        <span>
          Q {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={next}
          disabled={!isCurrentValid()}
          className="px-4 py-2"
        >
          Next
        </button>
      </div>

      <button
        style={{
          border: '2px solid #4f46e5',
          marginTop: '1.5rem',
          width: '100%',
          borderRadius: '0.50rem',
          padding: '0.5rem',
          color: '#4f46e5',
        }}
        disabled={isSubmitting || !isCurrentValid()}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Question'}
      </button>
    </div>
  )
}
