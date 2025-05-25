import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import Button from '../../common/Button'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import { addquestion } from '../../../services/questions/questions.service'

export default function AddQuestion() {
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
      <h2 className="text-2xl mb-4 font-semibold">Add Question</h2>

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
                  ? 'bg-blue-500 rounded px-4 py-2 text-white'
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

  //  
    //  
// 


// import { useContext, useState, useEffect } from 'react'
// import { useNavigate, useLocation, Link } from 'react-router-dom'
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// import Button from '../../common/Button'
// import Icons from '../../common/Icons'
// import Input from '../../common/Input'
// import { Dropdown } from '../../common/Dropdown'
// import { fetchAllCourses } from '../../../services/course/course.service'
// import { fetchAllSections } from '../../../services/section/section.services'
// import { AppContext } from '../../../utils/AppContext'
// import { toast } from 'sonner'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { addquestion } from '../../../services/questions/questions.service'
// // import { addquestion } from '../../../services/api' // Adjust path to your API file

// // Custom hook for adding a question
// const useAddQuestion = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: addquestion,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['questions'])
//       toast.success('Question added successfully!')
//     },
//     onError: (error) => {
//       toast.error(`Error adding question: ${error.message}`)
//     },
//   })
// }

// export default function AddQuestion() {
//   // Rich text editor configuration
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   }

//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'list',
//     'bullet',
//     'link',
//     'image',
//   ]

//   /* -------------------- React Query -------------------- */
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { mutate: addQuestion, isPending } = useAddQuestion()

//   /* -------------------- Context -------------------- */
//   const { courseData, updateCourseData } = useContext(AppContext)

//   /* -------------------- Local State -------------------- */
//   const [selectedLessonId, setSelectedLessonId] = useState('')
//   const [questionType, setQuestionType] = useState('MCQ') // MCQ | TF | FIB
//   const [testLevel, setTestLevel] = useState('EASY') // EASY | MEDIUM | HARD
//   const [marks, setMarks] = useState(1)
//   const [negativeMarks, setNegativeMarks] = useState(0)
//   const [questions, setQuestions] = useState([
//     {
//       question: '',
//       options: ['', '', '', ''], // used only for MCQ
//       correctAnswer: '', // 'A' | 'B' | 'C' | 'D' | 'TRUE' | 'FALSE' | 'TEXT'
//     },
//   ])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   /* -------------------- Queries -------------------- */
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

//   /* -------------------- Derived Options -------------------- */
//   const fallbackCourses = [{ id: 'demo-course', name: 'Demo Course' }]
//   const fallbackLessons = [{ id: 'demo-lesson', name: 'Demo Lesson' }]

//   const courseOptions = [
//     { value: '', label: 'Select Course' },
//     ...((courses?.length ? courses : fallbackCourses).map((course) => ({
//       value: course.id,
//       label: course.name,
//     })) || []),
//   ]

//   const lessonOptions = [
//     { value: '', label: 'Select Lesson' },
//     ...((lessons?.length ? lessons : fallbackLessons).map((lesson) => ({
//       value: lesson.id,
//       label: lesson.name,
//     })) || []),
//   ]

//   const questionTypeOptions = [
//     { value: 'MCQ', label: 'Multiple Choice' },
//     { value: 'TF', label: 'True / False' },
//     { value: 'FIB', label: 'Fill in the Blanks' },
//   ]

//   const testLevelOptions = [
//     { value: 'EASY', label: 'Easy' },
//     { value: 'MEDIUM', label: 'Medium' },
//     { value: 'HARD', label: 'Hard' },
//   ]

//   const markOptions = Array.from({ length: 10 }, (_, i) => ({
//     value: i + 1,
//     label: `${i + 1}`,
//   }))

//   const negativeMarkOptions = Array.from({ length: 10 }, (_, i) => ({
//     value: -(i + 1) / 2,
//     label: `-${(i + 1) / 2}`,
//   }))

//   /* -------------------- Side Effects -------------------- */
//   useEffect(() => {
//     const params = new URLSearchParams(location.search)
//     const lessonIdFromURL = params.get('lessonId')
//     if (lessonIdFromURL) setSelectedLessonId(lessonIdFromURL)
//   }, [location.search])

//   /* -------------------- Handlers -------------------- */
//   const handleDropdownChange = (name, value) => {
//     switch (name) {
//       case 'courseId':
//         updateCourseData({ [name]: value })
//         break
//       case 'lessonId':
//         setSelectedLessonId(value)
//         break
//       case 'questionType':
//         setQuestionType(value)
//         setQuestions([
//           {
//             question: '',
//             options: ['', '', '', ''],
//             correctAnswer: '',
//           },
//         ])
//         setCurrentIndex(0)
//         break
//       case 'testLevel':
//         setTestLevel(value)
//         break
//       case 'marks':
//         setMarks(Number(value))
//         break
//       case 'negativeMarks':
//         setNegativeMarks(Number(value))
//         break
//       default:
//         break
//     }

//     if (name === 'lessonId') {
//       const searchParams = new URLSearchParams(window.location.search)
//       searchParams.set('lessonId', value)
//       navigate(`?${searchParams.toString()}`, { replace: true })
//     }
//   }

//   const handleQuestionChange = (value) => {
//     const newQuestions = [...questions]
//     newQuestions[currentIndex].question = value
//     setQuestions(newQuestions)
//   }

//   const handleOptionChange = (index, value) => {
//     const newQuestions = [...questions]
//     newQuestions[currentIndex].options[index] = value
//     setQuestions(newQuestions)
//   }

//   const handleCorrectAnswerChange = (answer) => {
//     const newQuestions = [...questions]
//     newQuestions[currentIndex].correctAnswer = answer
//     setQuestions(newQuestions)
//   }

//   const addNewQuestion = () => {
//     setQuestions([
//       ...questions,
//       { question: '', options: ['', '', '', ''], correctAnswer: '' },
//     ])
//     setCurrentIndex(questions.length)
//   }

//   const isCurrentQuestionValid = () => {
//     const current = questions[currentIndex]
//     if (!current.question.trim()) return false

//     switch (questionType) {
//       case 'MCQ':
//         return (
//           current.options.every((opt) => opt.trim()) && !!current.correctAnswer
//         )
//       case 'TF':
//         return (
//           current.correctAnswer === 'TRUE' || current.correctAnswer === 'FALSE'
//         )
//       case 'FIB':
//         return !!current.correctAnswer.trim()
//       default:
//         return false
//     }
//   }

//   const isFormValid = () => {
//     const lessonValid = !!selectedLessonId
//     const courseValid = !!courseData.courseId
//     return (
//       lessonValid &&
//       courseValid &&
//       questions.every((_, index) => {
//         setCurrentIndex(index)
//         return isCurrentQuestionValid()
//       })
//     )
//   }

//   const navigateNext = () => {
//     if (!isCurrentQuestionValid()) return
//     if (currentIndex === questions.length - 1) {
//       addNewQuestion()
//     } else {
//       setCurrentIndex(currentIndex + 1)
//     }
//   }

//   const navigatePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1)
//     }
//   }

//   const handleDeleteQuestion = () => {
//     if (questions.length === 1) {
//       setQuestions([
//         { question: '', options: ['', '', '', ''], correctAnswer: '' },
//       ])
//       setCurrentIndex(0)
//       return
//     }

//     const updatedQuestions = questions.filter((_, idx) => idx !== currentIndex)
//     setQuestions(updatedQuestions)
//     setCurrentIndex((prev) => Math.max(0, prev - 1))
//   }

//   const handleSubmit = () => {
//     if (!isFormValid()) {
//       toast.error('Please fill all fields and select a lesson')
//       return
//     }

//     const params = new URLSearchParams(location.search)
//     const testId = params.get('testId')

//     if (!testId) {
//       toast.error('Test ID is missing from the URL')
//       return
//     }

//     const mapQuestionType = (type) => {
//       switch (type) {
//         case 'MCQ':
//           return 'MCQ'
//         case 'TF':
//           return 'TRUE_FALSE'
//         case 'FIB':
//           return 'FILL_IN_THE_BLANK'
//         default:
//           return 'MCQ'
//       }
//     }

//     const payloads = questions.map((q) => {
//       let answer = q.correctAnswer
//       let options = questionType === 'MCQ' ? q.options : []
//       if (questionType === 'MCQ') {
//         const valid = ['A', 'B', 'C', 'D']
//         const idx = valid.indexOf(q.correctAnswer)
//         answer = idx !== -1 ? q.options[idx] : ''
//       } else if (questionType === 'TF') {
//         options = ['TRUE', 'FALSE']
//         answer = q.correctAnswer
//       } else if (questionType === 'FIB') {
//         answer = q.correctAnswer
//         options = []
//       }

//       return {
//         testId,
//         lessonId: selectedLessonId,
//         questionType: mapQuestionType(questionType),
//         testLevel,
//         marks,
//         negativeMarks,
//         question: q.question || undefined,
//         options,
//         answer: answer || undefined,
//         explanation: undefined,
//       }
//     })

//     payloads.forEach((payload) => {
//       addquestion(payload, {
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['questions', testId] })
//           setQuestions([
//             { question: '', options: ['', '', '', ''], correctAnswer: '' },
//           ])
//           setCurrentIndex(0)
//           navigate('/admin-dashboard?activeSidebar=dashboard')
//         },
//       })
//     })
//   }

//   /* -------------------- Render -------------------- */
//   return (
//     <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
//       {/* Header */}
//       <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
//         <p className="md:text-lg mb-2 w-full text-center text-base font-semibold sm:mb-0 sm:text-left">
//           Add Question
//         </p>
//         <Link to="/admin-dashboard?activeSidebar=all-chapters">
//           <button className="text-nowrap rounded bg-[#252466] px-3 py-1.5 text-sm text-white">
//             All Questions
//           </button>
//         </Link>
//       </div>

//       {/* -------------------- Dropdowns -------------------- */}
//       <div className="space-y-4">
//         <div className="flex flex-wrap items-center justify-center gap-4">
//           <Dropdown
//             name="courseId"
//             label="Select Course"
//             options={courseOptions}
//             value={courseData.courseId}
//             onChange={handleDropdownChange}
//             isLoading={isCoursesLoading}
//             isError={isCoursesError}
//           />
//           <Dropdown
//             name="lessonId"
//             label="Select Chapter"
//             options={lessonOptions}
//             value={selectedLessonId}
//             onChange={handleDropdownChange}
//             isLoading={isLessonLoading}
//             isError={isLessonError}
//           />
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-4">
//           <Dropdown
//             name="questionType"
//             label="Question Type"
//             options={questionTypeOptions}
//             value={questionType}
//             onChange={handleDropdownChange}
//           />
//           <Dropdown
//             name="testLevel"
//             label="Test Level"
//             options={testLevelOptions}
//             value={testLevel}
//             onChange={handleDropdownChange}
//           />
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-4">
//           <Dropdown
//             name="marks"
//             label="Marks For Each Question"
//             options={markOptions}
//             value={marks}
//             onChange={handleDropdownChange}
//           />
//           <Dropdown
//             name="negativeMarks"
//             label="Negative Marks For Each Question"
//             options={negativeMarkOptions}
//             value={negativeMarks}
//             onChange={handleDropdownChange}
//           />
//         </div>
//       </div>

//       <hr className="my-4 w-full bg-black opacity-10" />

//       {/* -------------------- Question UI -------------------- */}
//       <div>
//         <p className="mb-2 text-[17px] font-medium text-black">Question</p>
//         {questionType === 'MCQ' && (
//           <p className="text-[14px] font-normal text-black">
//             Choose appropriate option <span className="font-medium">A</span>,
//             <span className="font-medium">B</span>,
//             <span className="font-medium">C</span> or{' '}
//             <span className="font-medium">D</span>
//           </p>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
//         <div className="flex w-full items-center gap-2">
//           <button
//             disabled={currentIndex === 0}
//             className={`${currentIndex === 0 ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
//             onClick={navigatePrevious}
//             aria-label="Previous question"
//           >
//             <Icons iconName={'prevArrow'} />
//           </button>
//           <div className="flex w-full items-center justify-center rounded-[10px] border border-[#4e4e4e] border-opacity-10 bg-white px-4 py-2 text-[14px] text-black md:w-auto">
//             Question {currentIndex + 1}/{questions.length}
//           </div>
//           <button
//             disabled={!isCurrentQuestionValid()}
//             className={`rotate-180 ${!isCurrentQuestionValid() ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
//             onClick={navigateNext}
//             aria-label="Next question"
//           >
//             <Icons iconName={'prevArrow'} />
//           </button>
//         </div>
//         <Button
//           className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() ? 'pointer-events-none opacity-70' : ''}`}
//           bgBtn={'Add Question'}
//           disabled={!isCurrentQuestionValid()}
//           onClick={addNewQuestion}
//         />
//       </div>

//       <hr className="mb-4 w-full bg-black opacity-10" />

//       {/* -------------------- Question Input -------------------- */}
//       <div className="mb-3 w-full">
//         <ReactQuill
//           value={questions[currentIndex].question}
//           onChange={handleQuestionChange}
//           modules={modules}
//           formats={formats}
//           placeholder="Enter your question"
//         />
//       </div>

//       {/* -------------------- Answer UI -------------------- */}
//       {questionType === 'MCQ' && (
//         <div className="mb-4">
//           <p className="mb-3 text-[17px] font-medium text-black">Options</p>
//           {questions[currentIndex].options.map((option, index) => (
//             <div key={index} className="mb-4 flex items-center">
//               <span className="mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50">
//                 {String.fromCharCode(65 + index)}
//               </span>
//               <Input
//                 placeholder="Your answer here"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//           <div className="flex items-end justify-end">
//             <button
//               className="text-orange-red transition-all duration-300 ease-in-out hover:text-primary"
//               onClick={handleDeleteQuestion}
//             >
//               Delete Question
//             </button>
//           </div>

//           <div className="mb-4">
//             <div className="mb-3 text-[17px] font-medium text-black">
//               Correct Answer
//             </div>
//             <div className="mb-10 flex items-center gap-3">
//               {questions[currentIndex].options.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border transition-colors ${
//                     questions[currentIndex].correctAnswer ===
//                     String.fromCharCode(65 + index)
//                       ? '!bg-primary text-white'
//                       : 'hover:bg-gray-100 bg-[#fbfbfb]'
//                   }`}
//                   onClick={() =>
//                     handleCorrectAnswerChange(String.fromCharCode(65 + index))
//                   }
//                 >
//                   {String.fromCharCode(65 + index)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {questionType === 'TF' && (
//         <div className="mb-4">
//           <div className="mb-3 text-[17px] font-medium text-black">
//             Select the Correct Answer
//           </div>
//           <div className="flex gap-4">
//             {['TRUE', 'FALSE'].map((value) => (
//               <button
//                 key={value}
//                 onClick={() => handleCorrectAnswerChange(value)}
//                 className={`rounded-lg border px-6 py-2 text-sm font-medium transition-colors ${
//                   questions[currentIndex].correctAnswer === value
//                     ? 'bg-primary text-white'
//                     : 'hover:bg-gray-100 bg-[#fbfbfb]'
//                 }`}
//               >
//                 {value}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {questionType === 'FIB' && (
//         <div className="mb-4 w-full">
//           <p className="mb-3 text-[17px] font-medium text-black">
//             Correct Answer
//           </p>
//           <Input
//             placeholder="Type the correct answer"
//             value={questions[currentIndex].correctAnswer}
//             onChange={(e) => handleCorrectAnswerChange(e.target.value)}
//           />
//         </div>
//       )}

//       {/* Submit */}
//       <Button
//         disabled={!isFormValid() || isPending}
//         onClick={handleSubmit}
//         bgBtn={isPending ? 'Submitting...' : 'Submit'}
//         className="w-full"
//       />
//     </div>
//   )
// }

// import { useContext, useState, useEffect } from 'react'
// import { useNavigate, useLocation, Link } from 'react-router-dom'
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

// import Button from '../../common/Button'
// import Icons from '../../common/Icons'
// import Input from '../../common/Input'
// import { Dropdown } from '../../common/Dropdown'
// import { fetchAllCourses } from '../../../services/course/course.service'
// import { fetchAllSections } from '../../../services/section/section.services'
// import { addquestion } from '../../../services/questions/questions.service'
// import { AppContext } from '../../../utils/AppContext'

// // Custom hook for adding a question
// const useAddQuestion = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: addquestion,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['questions'])
//       toast.success('Question added successfully!')
//     },
//     onError: (error) => {
//       toast.error(`Error adding question: ${error.message}`)
//     },
//   })
// }

// export default function AddQuestion() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const queryClient = useQueryClient()
//   const { courseData, updateCourseData } = useContext(AppContext)

//   const { mutate: addQuestion, isLoading: isSubmitting } = useAddQuestion()

//   // Rich text editor config
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   }
//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'list',
//     'bullet',
//     'link',
//     'image',
//   ]

//   // Dropdown data
//   const { data: courses = [], isLoading: loadingCourses } = useQuery({
//     queryKey: ['courses'],
//     queryFn: fetchAllCourses,
//   })
//   const { data: lessons = [], isLoading: loadingLessons } = useQuery({
//     queryKey: ['lessons'],
//     queryFn: fetchAllSections,
//   })

//   const courseOptions = [
//     { value: '', label: 'Select Course' },
//     ...(courses.length
//       ? courses.map((c) => ({ value: c.id, label: c.name }))
//       : [{ value: '', label: 'No courses available' }]),
//   ]
//   const lessonOptions = [
//     { value: '', label: 'Select Lesson' },
//     ...(lessons.length
//       ? lessons.map((l) => ({ value: l.id, label: l.name }))
//       : [{ value: '', label: 'No lessons available' }]),
//   ]

//   // Local state
//   const [selectedLessonId, setSelectedLessonId] = useState('')
//   const [questionType, setQuestionType] = useState('MCQ')
//   const [testLevel, setTestLevel] = useState('EASY')
//   const [marks, setMarks] = useState(1)
//   const [negativeMarks, setNegativeMarks] = useState(0)
//   const [questions, setQuestions] = useState([
//     { question: '', options: ['', '', '', ''], correctAnswer: '' },
//   ])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   // Initialize from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search)
//     const lessonId = params.get('lessonId')
//     if (lessonId) setSelectedLessonId(lessonId)
//   }, [location.search])

//   // Handlers
//   const handleDropdownChange = (name, value) => {
//     switch (name) {
//       case 'courseId':
//         updateCourseData({ courseId: value })
//         break
//       case 'lessonId':
//         setSelectedLessonId(value)
//         navigate(`?lessonId=${value}`, { replace: true })
//         break
//       case 'questionType':
//         setQuestionType(value)
//         setQuestions([
//           { question: '', options: ['', '', '', ''], correctAnswer: '' },
//         ])
//         setCurrentIndex(0)
//         break
//       case 'testLevel':
//         setTestLevel(value)
//         break
//       case 'marks':
//         setMarks(Number(value))
//         break
//       case 'negativeMarks':
//         setNegativeMarks(Number(value))
//         break
//       default:
//         break
//     }
//   }

//   const updateQuestionField = (field, value, idx = null) => {
//     const qs = [...questions]
//     if (field === 'question') qs[currentIndex].question = value
//     else if (field === 'correctAnswer') qs[currentIndex].correctAnswer = value
//     else if (field === 'option' && idx !== null)
//       qs[currentIndex].options[idx] = value
//     setQuestions(qs)
//   }

//   const isCurrentValid = () => {
//     const cur = questions[currentIndex]
//     if (!cur.question.trim()) return false
//     if (questionType === 'MCQ')
//       return cur.options.every((o) => o.trim()) && !!cur.correctAnswer
//     if (questionType === 'TF')
//       return ['TRUE', 'FALSE'].includes(cur.correctAnswer)
//     if (questionType === 'FIB') return !!cur.correctAnswer.trim()
//     return false
//   }

//   const navigateNext = () => {
//     if (!isCurrentValid()) return
//     if (currentIndex === questions.length - 1) {
//       setQuestions([
//         ...questions,
//         { question: '', options: ['', '', '', ''], correctAnswer: '' },
//       ])
//       setCurrentIndex(questions.length)
//     } else {
//       setCurrentIndex(currentIndex + 1)
//     }
//   }
//   const navigatePrevious = () =>
//     currentIndex > 0 && setCurrentIndex(currentIndex - 1)

//   const handleDelete = () => {
//     if (questions.length === 1) {
//       setQuestions([
//         { question: '', options: ['', '', '', ''], correctAnswer: '' },
//       ])
//       setCurrentIndex(0)
//       return
//     }
//     const filtered = questions.filter((_, i) => i !== currentIndex)
//     setQuestions(filtered)
//     setCurrentIndex(Math.max(0, currentIndex - 1))
//   }

//   const handleSubmit = () => {
//     // basic validation
//     if (!courseData.courseId || !selectedLessonId) {
//       toast.error('Please select course and lesson')
//       return
//     }
//     if (!isCurrentValid()) {
//       toast.error('Complete the current question')
//       return
//     }
//     const params = new URLSearchParams(location.search)
//     const testId = params.get('testId')
//     if (!testId) {
//       toast.error('Test ID missing in URL')
//       return
//     }

//     questions.forEach((q) => {
//       let answer = q.correctAnswer
//       let opts = questionType === 'MCQ' ? q.options : []
//       if (questionType === 'MCQ') {
//         const idx = ['A', 'B', 'C', 'D'].indexOf(answer)
//         answer = idx >= 0 ? q.options[idx] : ''
//       } else if (questionType === 'TF') {
//         opts = ['TRUE', 'FALSE']
//       }
//       addQuestion(
//         {
//           testId,
//           lessonId: selectedLessonId,
//           questionType:
//             questionType === 'TF'
//               ? 'TRUE_FALSE'
//               : questionType === 'FIB'
//                 ? 'FILL_IN_THE_BLANK'
//                 : 'MCQ',
//           testLevel,
//           marks,
//           negativeMarks,
//           question: q.question,
//           options: opts,
//           answer,
//         },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries(['questions', testId])
//             navigate('/admin-dashboard?activeSidebar=dashboard')
//           },
//         }
//       )
//     })
//   }

//   return (
//     <div className="bg-gray-50 rounded-xl border border-opacity-30 p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-lg font-semibold">Add Question</h2>
//         <Link to="/admin-dashboard?activeSidebar=all-question">
//           <Button>All Questions</Button>
//         </Link>
//       </div>

//       <div className="mb-4 flex flex-wrap gap-4">
//         <Dropdown
//           name="courseId"
//           label="Course"
//           options={courseOptions}
//           value={courseData.courseId}
//           onChange={handleDropdownChange}
//           isLoading={loadingCourses}
//         />
//         <Dropdown
//           name="lessonId"
//           label="Lesson"
//           options={lessonOptions}
//           value={selectedLessonId}
//           onChange={handleDropdownChange}
//           isLoading={loadingLessons}
//         />
//         <Dropdown
//           name="questionType"
//           label="Type"
//           options={[
//             { value: 'MCQ', label: 'MCQ' },
//             { value: 'TF', label: 'True/False' },
//             { value: 'FIB', label: 'Fill in Blank' },
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
//           options={Array.from({ length: 10 }, (_, i) => ({
//             value: i + 1,
//             label: `${i + 1}`,
//           }))}
//           value={marks}
//           onChange={handleDropdownChange}
//         />
//         <Dropdown
//           name="negativeMarks"
//           label="Neg Marks"
//           options={Array.from({ length: 5 }, (_, i) => ({
//             value: -(i + 1) / 2,
//             label: `-${(i + 1) / 2}`,
//           }))}
//           value={negativeMarks}
//           onChange={handleDropdownChange}
//         />
//       </div>

//       <hr className="mb-4" />

//       <div className="mb-4">
//         <ReactQuill
//           value={questions[currentIndex].question}
//           onChange={(val) => updateQuestionField('question', val)}
//           modules={modules}
//           formats={formats}
//           placeholder="Enter your question here"
//         />
//       </div>

//       {/* Options / Answers */}
//       {questionType === 'MCQ' && (
//         <div className="mb-4">
//           <p className="mb-2 font-medium">Options</p>
//           {questions[currentIndex].options.map((opt, i) => (
//             <div key={i} className="mb-2 flex items-center gap-3">
//               <span className="w-6">{String.fromCharCode(65 + i)}</span>
//               <Input
//                 value={opt}
//                 onChange={(e) =>
//                   updateQuestionField('option', e.target.value, i)
//                 }
//               />
//             </div>
//           ))}
//           <div className="mt-3 flex gap-3">
//             <p className="font-medium">Correct:</p>
//             {['A', 'B', 'C', 'D'].map((v) => (
//               <button
//                 key={v}
//                 onClick={() => updateQuestionField('correctAnswer', v)}
//                 className={`rounded px-3 py-1 ${questions[currentIndex].correctAnswer === v ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               >
//                 {v}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//       {questionType === 'TF' && (
//         <div className="mb-4 flex gap-4">
//           {['TRUE', 'FALSE'].map((v) => (
//             <button
//               key={v}
//               onClick={() => updateQuestionField('correctAnswer', v)}
//               className={`rounded px-4 py-2 ${questions[currentIndex].correctAnswer === v ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             >
//               {v}
//             </button>
//           ))}
//         </div>
//       )}
//       {questionType === 'FIB' && (
//         <div className="mb-4">
//           <Input
//             placeholder="Enter correct text"
//             value={questions[currentIndex].correctAnswer}
//             onChange={(e) =>
//               updateQuestionField('correctAnswer', e.target.value)
//             }
//           />
//         </div>
//       )}

//       <div className="mb-6 flex items-center justify-between">
//         <button onClick={navigatePrevious} disabled={currentIndex === 0}>
//           <Icons iconName="prevArrow" />
//         </button>
//         <span>
//           Question {currentIndex + 1}/{questions.length}
//         </span>
//         <button onClick={navigateNext} disabled={!isCurrentValid()}>
//           <Icons iconName="prevArrow" className="rotate-180" />
//         </button>
//       </div>

//       <div className="mb-4 flex gap-4">
//         <Button onClick={handleDelete} disabled={questions.length === 1}>
//           Delete
//         </Button>
//         <Button onClick={() => navigateNext()} disabled={!isCurrentValid()}>
//           Add Question
//         </Button>
//       </div>

//       <Button
//         onClick={handleSubmit}
//         disabled={isSubmitting || !isCurrentValid()}
//         className="w-full"
//       >
//         {isSubmitting ? 'Submitting...' : 'Submit'}
//       </Button>
//     </div>
//   )
// }
