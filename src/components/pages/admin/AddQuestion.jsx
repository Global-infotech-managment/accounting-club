// import { useContext, useState, useEffect } from 'react'
// import {
//   useNavigate,
//   useLocation,
//   useSearchParams,
//   Link,
// } from 'react-router-dom'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'

// import Button from '../../common/Button'
// import Input from '../../common/Input'
// import { Dropdown } from '../../common/Dropdown'
// import { fetchAllCourses } from '../../../services/course/course.service'
// import { fetchAllSections } from '../../../services/section/section.services'
// import { useCreateTest } from '../../../hooks/useAuth'
// import { AppContext } from '../../../utils/AppContext'
// // import { useSearchParams } from 'next/navigation'
// export default function AddQuestion() {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [searchParams] = useSearchParams()
//   const testId = searchParams.get('testId') || ''

//   console.log('testid', testId)

//   // const { courseData, updateCourseData } = useContext(AppContext)

//   const [questionType, setQuestionType] = useState('MCQ') // MCQ|TF|FIB
//   const [testLevel, setTestLevel] = useState('EASY') // EASY|MEDIUM|HARD
//   const [marks, setMarks] = useState(1)
//   const [negativeMarks, setNegativeMarks] = useState(0)

//   const [questions, setQuestions] = useState([
//     { question: '', options: ['', '', '', ''], correctAnswer: '' },
//   ])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const { mutate: createTestQuestion, isPending } = useCreateTest()

//   // Fetch courses and lessons if needed...
//   const {
//     data: courses = [],
//     isLoading: isCoursesLoading,
//     isError: isCoursesError,
//   } = useQuery({ queryKey: ['courses'], queryFn: fetchAllCourses })

//   const {
//     data: lessons = [],
//     isLoading: isLessonLoading,
//     isError: isLessonError,
//   } = useQuery({ queryKey: ['lessons'], queryFn: fetchAllSections })

//   /* Handlers for dropdowns */
//   const handleDropdownChange = (name, value) => {
//     if (name === 'questionType') {
//       setQuestionType(value)
//       setQuestions([
//         { question: '', options: ['', '', '', ''], correctAnswer: '' },
//       ])
//       setCurrentIndex(0)
//     } else if (name === 'testLevel') {
//       setTestLevel(value)
//     } else if (name === 'marks') {
//       setMarks(Number(value))
//     } else if (name === 'negativeMarks') {
//       setNegativeMarks(Number(value))
//     }
//   }

//   /* Question text and options */
//   const handleQuestionChange = (e) => {
//     const qs = [...questions]
//     qs[currentIndex].question = e.target.value
//     setQuestions(qs)
//   }

//   const handleOptionChange = (idx, val) => {
//     const qs = [...questions]
//     qs[currentIndex].options[idx] = val
//     setQuestions(qs)
//   }

//   const handleCorrectAnswerChange = (ans) => {
//     const qs = [...questions]
//     qs[currentIndex].correctAnswer = ans
//     setQuestions(qs)
//   }

//   /* Navigation */
//   const isCurrentValid = () => {
//     const cur = questions[currentIndex]
//     if (!cur.question.trim()) return false
//     if (questionType === 'MCQ')
//       return cur.options.every((o) => o.trim()) && !!cur.correctAnswer
//     if (questionType === 'TF')
//       return cur.correctAnswer === 'TRUE' || cur.correctAnswer === 'FALSE'
//     if (questionType === 'FIB') return !!cur.correctAnswer.trim()
//     return false
//   }

//   const addNew = () => {
//     setQuestions([
//       ...questions,
//       { question: '', options: ['', '', '', ''], correctAnswer: '' },
//     ])
//     setCurrentIndex(questions.length)
//   }
//   const next = () =>
//     isCurrentValid() &&
//     (currentIndex === questions.length - 1
//       ? addNew()
//       : setCurrentIndex(currentIndex + 1))
//   const prev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1)

//   /* Submit */
//   const handleSubmit = () => {
//     if (!testId) {
//       toast.error('Missing testId in URL')
//       return
//     }
//     if (!isCurrentValid()) {
//       toast.error('Please complete the current question')
//       return
//     }

//     const cur = questions[currentIndex]
//     // Map FIB→FILL_IN_THE_BLANK
//     const qType = questionType === 'FIB' ? 'FILL_IN_THE_BLANK' : questionType
//     // Determine answer: for MCQ, convert A/B/C/D to actual option text
//     let answer = cur.correctAnswer
//     if (questionType === 'MCQ') {
//       const idx = ['A', 'B', 'C', 'D'].indexOf(answer)
//       answer = cur.options[idx] || ''
//     }

//     const payload = {
//       testId,
//       questionType: qType,
//       testLevel,
//       marks,
//       negativeMarks,
//       question: cur.question,
//       options: questionType === 'MCQ' ? cur.options : [],
//       answer,
//       explanation: cur.explanation || undefined,
//     }

//     createTestQuestion(payload, {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['tests', testId])
//         toast.success('Question added!')
//         // reset or navigate on finish
//         navigate('/admin-dashboard?activeSidebar=dashboard')
//       },
//       onError: (e) => {
//         toast.error(`Error: ${e.message}`)
//       },
//     })
//   }

//   /* Render */
//   return (
//     <div className="bg-gray-50 rounded p-5">
//       <h2 className="text-xl mb-4 font-semibold">Add Question</h2>

//       {/* Dropdowns */}
//       <div className="mb-4 flex gap-4">
//         <Dropdown
//           name="questionType"
//           label="Type"
//           options={[
//             { value: 'MCQ', label: 'Multiple Choice' },
//             { value: 'TF', label: 'True/False' },
//             { value: 'FIB', label: 'Fill in the Blank' },
//           ]}
//           value={questionType}
//           onChange={handleDropdownChange}
//         />

//         <Dropdown
//           name="testLevel"
//           label="Level"
//           options={[
//             { value: 'EASY', label: 'Easy' },
//             { value: 'MEDIUM', label: 'Medium' },
//             { value: 'HARD', label: 'Hard' },
//           ]}
//           value={testLevel}
//           onChange={handleDropdownChange}
//         />

//         <Dropdown
//           name="marks"
//           label="Marks"
//           options={Array.from({ length: 5 }, (_, i) => ({
//             value: i + 1,
//             label: `${i + 1}`,
//           }))}
//           value={marks}
//           onChange={handleDropdownChange}
//         />

//         <Dropdown
//           name="negativeMarks"
//           label="Neg. Marks"
//           options={Array.from({ length: 5 }, (_, i) => ({
//             value: -(i + 1) / 2,
//             label: `-${(i + 1) / 2}`,
//           }))}
//           value={negativeMarks}
//           onChange={handleDropdownChange}
//         />
//       </div>

//       {/* Question Input */}
//       <Input
//         placeholder="Enter question"
//         value={questions[currentIndex].question}
//         onChange={handleQuestionChange}
//       />

//       {/* MCQ Options */}
//       {questionType === 'MCQ' && (
//         <div className="mt-3 space-y-2">
//           <p className="font-medium">Options &amp; Correct Answer</p>
//           {questions[currentIndex].options.map((opt, i) => (
//             <div key={i} className="flex items-center gap-2">
//               <span className="w-6">{String.fromCharCode(65 + i)}</span>
//               <Input
//                 value={opt}
//                 onChange={(e) => handleOptionChange(i, e.target.value)}
//               />
//               <button
//                 onClick={() =>
//                   handleCorrectAnswerChange(String.fromCharCode(65 + i))
//                 }
//                 className={
//                   questions[currentIndex].correctAnswer ===
//                   String.fromCharCode(65 + i)
//                     ? 'text-green-600'
//                     : 'text-gray-400'
//                 }
//               >
//                 ✓
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* TF */}
//       {questionType === 'TF' && (
//         <div className="mt-3 flex gap-4">
//           {['TRUE', 'FALSE'].map((v) => (
//             <button
//               key={v}
//               onClick={() => handleCorrectAnswerChange(v)}
//               className={
//                 questions[currentIndex].correctAnswer === v
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200'
//               }
//             >
//               {v}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* FIB */}
//       {questionType === 'FIB' && (
//         <div className="mt-3">
//           <Input
//             placeholder="Enter correct text"
//             value={questions[currentIndex].correctAnswer}
//             onChange={(e) => handleCorrectAnswerChange(e.target.value)}
//           />
//         </div>
//       )}

//       {/* Nav */}
//       <div className="mt-4 flex items-center justify-between">
//         <button onClick={prev} disabled={currentIndex === 0}>
//           Previous
//         </button>
//         <span>
//           Q {currentIndex + 1} / {questions.length}
//         </span>
//         <button onClick={next} disabled={!isCurrentValid()}>
//           Next
//         </button>
//       </div>

//       {/* Submit */}
//       <Button
//         className="mt-6 w-full"
//         onClick={handleSubmit}
//         disabled={isPending || !isCurrentValid()}
//       >
//         {isPending ? 'Submitting...' : 'Submit Question'}
//       </Button>
//     </div>
//   )
// }




import { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Button from '../../common/Button'
import Icons from '../../common/Icons'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import { fetchAllCourses } from '../../../services/course/course.service'
import { AppContext } from '../../../utils/AppContext'
import { fetchAllSections } from '../../../services/section/section.services'
import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useCreateTest } from '../../../hooks/useAuth'

export default function AddQuestion() {
  // advance text editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
    'image',
  ]

  /* -------------------- React Query -------------------- */
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const { mutate: createTest, isPending } = useCreateTest()

  /* -------------------- Context -------------------- */
  const { courseData, updateCourseData } = useContext(AppContext)

  /* -------------------- Local State -------------------- */
  const [selectedLessonId, setSelectedLessonId] = useState('')
  const [questionType, setQuestionType] = useState('MCQ') // MCQ | TF | FIB
  const [testLevel, setTestLevel] = useState('EASY') // EASY | MEDIUM | HARD
  const [marks, setMarks] = useState(1)
  const [negativeMarks, setNegativeMarks] = useState(0)

  // Question list state
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''], // used only for MCQ
      correctAnswer: '', // could be 'A' | 'B' | 'C' | 'D' | 'TRUE' | 'FALSE' | 'TEXT'
    },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  /* -------------------- Queries -------------------- */
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({ queryKey: ['courses'], queryFn: fetchAllCourses })

  const {
    data: lessons = [],
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery({ queryKey: ['lessons'], queryFn: fetchAllSections })

  /* -------------------- Derived Options -------------------- */
  // Fallback dummy if no data
  const fallbackCourses = [{ id: 'demo-course', name: 'Demo Course' }]
  const fallbackLessons = [{ id: 'demo-lesson', name: 'Demo Lesson' }]

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...((courses?.length ? courses : fallbackCourses).map((course) => ({
      value: course.id,
      label: course.name,
    })) || []),
  ]

  const lessonOptions = [
    { value: '', label: 'Select Lesson' },
    ...((lessons?.length ? lessons : fallbackLessons).map((lesson) => ({
      value: lesson.id,
      label: lesson.name,
    })) || []),
  ]

  const questionTypeOptions = [
    { value: 'MCQ', label: 'Multiple Choice' },
    { value: 'TF', label: 'True / False' },
    { value: 'FIB', label: 'Fill in the Blanks' },
  ]

  const testLevelOptions = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ]

  const markOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }))

  const negativeMarkOptions = Array.from({ length: 10 }, (_, i) => ({
    value: -(i + 1) / 2,
    label: `-${(i + 1) / 2}`,
  }))

  /* -------------------- Side Effects -------------------- */
  // Keep URL in sync with selected lesson id
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const lessonIdFromURL = params.get('lessonId')
    if (lessonIdFromURL) setSelectedLessonId(lessonIdFromURL)
  }, [location.search])

  /* -------------------- Handlers -------------------- */
  const handleDropdownChange = (name, value) => {
    switch (name) {
      case 'courseId':
        updateCourseData({ [name]: value })
        break
      case 'lessonId':
        setSelectedLessonId(value)
        break
      case 'questionType':
        setQuestionType(value)
        // Reset current question when question type switches
        setQuestions([
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
          },
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

    // Special handling for lessonId to keep it in URL
    if (name === 'lessonId') {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('lessonId', value)
      navigate(`?${searchParams.toString()}`, { replace: true })
    }
  }

  const handleQuestionChange = (e) => {
    const newQuestions = [...questions]
    newQuestions[currentIndex].question = e.target.value
    setQuestions(newQuestions)
  }

  const handleOptionChange = (index, value) => {
    const newQuestions = [...questions]
    newQuestions[currentIndex].options[index] = value
    setQuestions(newQuestions)
  }

  const handleCorrectAnswerChange = (answer) => {
    const newQuestions = [...questions]
    newQuestions[currentIndex].correctAnswer = answer
    setQuestions(newQuestions)
  }

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ])
    setCurrentIndex(questions.length)
  }

  const isCurrentQuestionValid = () => {
    const current = questions[currentIndex]
    if (!current.question.trim()) return false

    switch (questionType) {
      case 'MCQ':
        return (
          current.options.every((opt) => opt.trim()) && !!current.correctAnswer
        )
      case 'TF':
        return (
          current.correctAnswer === 'TRUE' || current.correctAnswer === 'FALSE'
        )
      case 'FIB':
        return !!current.correctAnswer.trim()
      default:
        return false
    }
  }

  const isFormValid = () => {
    const lessonValid = !!selectedLessonId
    const courseValid = !!courseData.courseId
    return (
      lessonValid &&
      courseValid &&
      questions.every(() => isCurrentQuestionValid())
    )
  }

  /* -------------------- Navigation -------------------- */
  const navigateNext = () => {
    if (!isCurrentQuestionValid()) return
    if (currentIndex === questions.length - 1) {
      addNewQuestion()
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDeleteQuestion = () => {
    if (questions.length === 1) {
      setQuestions([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ])
      setCurrentIndex(0)
      return
    }

    const updatedQuestions = questions.filter((_, idx) => idx !== currentIndex)
    setQuestions(updatedQuestions)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  /* -------------------- Submit -------------------- */
  const handleSubmit = () => {
    if (!isFormValid()) {
      window.alert('Please fill all fields and select a lesson')
      return
    }

    // Extract testId from URL
    const params = new URLSearchParams(location.search)
    const testId = params.get('testId')

    if (!testId) {
      window.alert('Test ID is missing from the URL')
      return
    }

    const getAnswerIndex = (answerLetter) => {
      const valid = ['A', 'B', 'C', 'D']
      return valid.indexOf(answerLetter)
    }

    // Map questionType to schema-compatible values
    const mapQuestionType = (type) => {
      switch (type) {
        case 'FIB':
          return 'FILL_IN_THE_BLANK'
        case 'MCQ':
          return 'MCQ'
        default:
          return 'MCQ' // Fallback for TF (not in schema, so default to MCQ)
      }
    }

    // For simplicity, only submit the first question (matching previous behavior)
    const q = questions[0]

    let answer = q.correctAnswer
    let options = questionType === 'MCQ' ? q.options : []
    if (questionType === 'MCQ') {
      const idx = getAnswerIndex(q.correctAnswer)
      answer = idx !== -1 ? q.options[idx] : ''
    } else if (questionType === 'TF') {
      // Convert TRUE/FALSE to string for schema compatibility
      options = ['TRUE', 'FALSE']
      answer = q.correctAnswer
    } else if (questionType === 'FIB') {
      answer = q.correctAnswer
      options = [] // No options for FIB
    }

    const payload = {
      testId, // Use testId from URL
      questionType: mapQuestionType(questionType),
      testLevel,
      marks,
      negativeMarks,
      question: q.question || undefined, // Ensure optional field
      options, // Options array (empty for FIB, populated for MCQ/TF)
      answer: answer || undefined, // Ensure optional field
      explanation: undefined, // Optional, not provided in UI
    }

    createTest(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tests', testId] })
        toast.success('Test created successfully!')
        // Reset state
        setQuestions([
          { question: '', options: ['', '', '', ''], correctAnswer: '' },
        ])
        setCurrentIndex(0)
        navigate('/admin-dashboard?activeSidebar=dashboard')
      },
      onError: (error) => {
        window.alert(`Error creating test: ${error.message}`)
      },
    })
  }

  /* -------------------------------------------------------------- */
  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      {/* Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="md:text-lg mb-2 w-full text-center text-base font-semibold sm:mb-0 sm:text-left">
          Add Question
        </p>
        <Link to="/admin-dashboard?activeSidebar=all-chapters">
          <button className="text-nowrap rounded bg-[#252466] px-3 py-1.5 text-sm text-white">
            All Questions
          </button>
        </Link>
      </div>

      {/* -------------------- Dropdowns -------------------- */}
      <div className="space-y-4">
        {/* row 1 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dropdown
            name="courseId"
            label="Select Course"
            options={courseOptions}
            value={courseData.courseId}
            onChange={handleDropdownChange}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />
          <Dropdown
            name="lessonId"
            label="Select Chapter"
            options={lessonOptions}
            value={selectedLessonId}
            onChange={handleDropdownChange}
            isLoading={isLessonLoading}
            isError={isLessonError}
          />
        </div>

        {/* row 2 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dropdown
            name="questionType"
            label="Question Type"
            options={questionTypeOptions}
            value={questionType}
            onChange={handleDropdownChange}
          />
          <Dropdown
            name="testLevel"
            label="Test Level"
            options={testLevelOptions}
            value={testLevel}
            onChange={handleDropdownChange}
          />
        </div>

        {/* row 3 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dropdown
            name="marks"
            label="Marks For Each Question"
            options={markOptions}
            value={marks}
            onChange={handleDropdownChange}
          />
          <Dropdown
            name="negativeMarks"
            label="Negative Marks For Each Question"
            options={negativeMarkOptions}
            value={negativeMarks}
            onChange={handleDropdownChange}
          />
        </div>
      </div>

      <hr className="my-4 w-full bg-black opacity-10" />

      {/* -------------------- Question UI -------------------- */}
      <div>
        <p className="mb-2 text-[17px] font-medium text-black">Question</p>
        {questionType === 'MCQ' && (
          <p className="text-[14px] font-normal text-black">
            Choose appropriate option <span className="font-medium">A</span>,
            <span className="font-medium">B</span>,
            <span className="font-medium">C</span> or{' '}
            <span className="font-medium">D</span>
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
        <div className="flex w-full items-center gap-2">
          <button
            disabled={currentIndex === 0}
            className={`${currentIndex === 0 ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
            onClick={navigatePrevious}
            aria-label="Previous question"
          >
            <Icons iconName={'prevArrow'} />
          </button>
          <div className="flex w-full items-center justify-center rounded-[10px] border border-[#4e4e4e] border-opacity-10 bg-white px-4 py-2 text-[14px] text-black md:w-auto">
            Question {currentIndex + 1}/{questions.length}
          </div>
          <button
            disabled={!isCurrentQuestionValid()}
            className={`rotate-180 ${!isCurrentQuestionValid() ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
            onClick={navigateNext}
            aria-label="Next question"
          >
            <Icons iconName={'prevArrow'} />
          </button>
        </div>
        <Button
          className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() ? 'pointer-events-none opacity-70' : ''}`}
          bgBtn={'Add Question'}
          disabled={!isCurrentQuestionValid()}
          onClick={addNewQuestion}
        />
      </div>

      <hr className="mb-4 w-full bg-black opacity-10" />

      {/* -------------------- Question Input -------------------- */}
      <div className="mb-3 w-full">
        <Input
          placeholder="Enter your question"
          value={questions[currentIndex].question}
          onChange={handleQuestionChange}
        />
      </div>

      {/* -------------------- Answer UI depends on questionType -------------------- */}
      {questionType === 'MCQ' && (
        <div className="mb-4">
          <p className="mb-3 text-[17px] font-medium text-black">Options</p>
          {questions[currentIndex].options.map((option, index) => (
            <div key={index} className="mb-4 flex items-center">
              <span className="mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50">
                {String.fromCharCode(65 + index)}
              </span>
              <Input
                placeholder="Your answer here"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <div className="flex items-end justify-end">
            <button
              className="text-orange-red transition-all duration-300 ease-in-out hover:text-primary"
              onClick={handleDeleteQuestion}
            >
              Delete Question
            </button>
          </div>

          <div className="mb-4">
            <div className="mb-3 text-[17px] font-medium text-black">
              Correct Answer
            </div>
            <div className="mb-10 flex items-center gap-3">
              {questions[currentIndex].options.map((_, index) => (
                <button
                  key={index}
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border transition-colors ${
                    questions[currentIndex].correctAnswer ===
                    String.fromCharCode(65 + index)
                      ? '!bg-primary text-white'
                      : 'hover:bg-gray-100 bg-[#fbfbfb]'
                  }`}
                  onClick={() =>
                    handleCorrectAnswerChange(String.fromCharCode(65 + index))
                  }
                >
                  {String.fromCharCode(65 + index)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {questionType === 'TF' && (
        <div className="mb-4">
          <div className="mb-3 text-[17px] font-medium text-black">
            Select Correct Answer
          </div>
          <div className="flex gap-4">
            {['TRUE', 'FALSE'].map((value) => (
              <button
                key={value}
                onClick={() => handleCorrectAnswerChange(value)}
                className={`rounded-lg border px-6 py-2 text-sm font-medium transition-colors ${
                  questions[currentIndex].correctAnswer === value
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 bg-[#fbfbfb]'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {questionType === 'FIB' && (
        <div className="mb-4 w-full">
          <p className="mb-3 text-[17px] font-medium text-black">
            Correct Answer
          </p>
          <Input
            placeholder="Type the correct answer"
            value={questions[currentIndex].correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(e.target.value)}
          />
        </div>
      )}

      {/* Submit */}
      <Button
        disabled={!isFormValid() || isPending}
        onClick={handleSubmit}
        bgBtn={isPending ? 'Submitting...' : 'Submit'}
        className={'w-full'}
      />
    </div>
  )
}