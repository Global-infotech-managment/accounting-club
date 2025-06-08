import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import {
  getQuestion,
  updateQuestion,
} from '../../../services/questions/questions.service'
import { useEffect, useState } from 'react'

export default function UpdateQuestion() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const questionId = searchParams.get('id') || ''
  const testId = searchParams.get('testId') || ''
  const lessonId = searchParams.get('lessonId') || ''

  const [questionType, setQuestionType] = useState('MCQ')
  const [testLevel, setTestLevel] = useState('EASY')
  const [marks, setMarks] = useState(1)
  const [negativeMarks, setNegativeMarks] = useState(0)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')

  // Fetch question data
  const { data, isLoading, error } = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => getQuestion(questionId),
    enabled: !!questionId,
  })

  // Set form data when question data is fetched
  useEffect(() => {
    if (data?.data) {
      const questionData = data.data
      setQuestionType(questionData.questionType)
      setTestLevel(questionData.testLevel)
      setMarks(questionData.marks)
      setNegativeMarks(questionData.negativeMarks)
      setQuestion(questionData.question)
      setOptions(
        questionData?.options?.length ? questionData.options : ['', '', '', '']
      )
      setCorrectAnswer(questionData.answer)
    }
  }, [data])

  // Mutation for updating question
  const { mutate: updateQuestionData, isLoading: isSubmitting } = useMutation({
    mutationFn: (payload) => updateQuestion(questionId, payload),
    onSuccess: () => {
      toast.success('Question updated successfully!')
      navigate(
        `admin-dashboard?activeSidebar=all-questions&lessonId=${lessonId}`
      )
    },
    onError: (error) => {
      toast.error(error?.message || 'Failed to update question')
    },
  })

  const handleDropdownChange = (name, value) => {
    switch (name) {
      case 'questionType':
        setQuestionType(value)
        if (value !== 'MCQ') setOptions(['', '', '', ''])
        setCorrectAnswer('')
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
    setQuestion(e.target.value)
  }

  const handleOptionChange = (idx, value) => {
    const updatedOptions = [...options]
    updatedOptions[idx] = value
    if (correctAnswer === options[idx]) {
      setCorrectAnswer('')
    }
    setOptions(updatedOptions)
  }

  const isFormValid = () => {
    if (!question?.trim()) return false
    if (questionType === 'MCQ') {
      return options.every((o) => o?.trim()) && !!correctAnswer?.trim()
    }
    if (questionType === 'TRUE_FALSE') {
      return correctAnswer === 'TRUE' || correctAnswer === 'FALSE'
    }
    if (questionType === 'FILL_IN_THE_BLANK') {
      return !!correctAnswer?.trim()
    }
    return false
  }

  const handleCorrectAnswer = (value) => {
    setCorrectAnswer(value)
  }

  const handleSubmit = () => {
    if (!questionId || !testId) {
      toast.error('Missing questionId or testId in URL')
      return
    }
    if (!isFormValid()) {
      toast.error('Please complete all required fields')
      return
    }

    const payload = {
      testId,
      questionType,
      testLevel,
      marks,
      negativeMarks,
      question,
      options: questionType === 'MCQ' ? options : [],
      answer: correctAnswer,
    }

    updateQuestionData(payload)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

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
        value={question}
        onChange={handleQuestionChange}
      />

      {questionType === 'MCQ' && (
        <div className="mt-4 space-y-2">
          <p className="font-medium">Options & Correct Answer</p>
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 font-bold">{['A', 'B', 'C', 'D'][i]}</span>
              <Input
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
              <button
                onClick={() => handleCorrectAnswer(opt)}
                className={
                  correctAnswer === opt
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
                correctAnswer === v
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
            value={correctAnswer}
            onChange={(e) => handleCorrectAnswer(e.target.value)}
          />
        </div>
      )}

      <button
        style={{
          marginTop: '1.5rem',
          borderRadius: '0.50rem',
          padding: '0.5rem',
        }}
        className="w-full border-[2px] border-[#4f46e5] text-[#4f46e5]"
        disabled={isSubmitting || !isFormValid()}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Updating...' : 'Update Question'}
      </button>
    </div>
  )
}
