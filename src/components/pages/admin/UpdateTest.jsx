// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import Button from '../../common/Button'
// import Icons from '../../common/Icons'
// import Input from '../../common/Input'
// import { useNavigate } from 'react-router-dom'
// import { getLessonTest } from '../../../services/lessonTest/lessonTest.services'

// export default function UpdateTest() {
//   const [searchParams] = useSearchParams()
//   const lessonId = searchParams.get('id')
//   const navigate = useNavigate()

//   // State for questions
//   const [questions, setQuestions] = useState([
//     { question: '', options: ['', '', '', ''], correctAnswer: '' },
//   ])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   // Fetch test data for this lesson
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchTest = async () => {
//       if (!lessonId) return
//       try {
//         const testData = await getLessonTest(lessonId)
//         const test = testData[0]
//         console.log('test ', testData)
//         setQuestions([
//           {
//             id: test.id,
//             question: test.question,
//             options: test.options,
//             correctAnswer: test.answer,
//           },
//         ])
//       } catch (error) {
//         console.error('Failed to load test data', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchTest()
//   }, [lessonId])

//   const handleQuestionChange = (e) => {
//     const newQuestions = [...questions]
//     newQuestions[currentIndex].question = e.target.value
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

//   const navigateNext = () => {
//     if (isCurrentQuestionValid()) {
//       if (currentIndex === questions.length - 1) {
//         addNewQuestion()
//       } else {
//         setCurrentIndex(currentIndex + 1)
//       }
//     }
//   }

//   const navigatePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1)
//     }
//   }

//   const handleSubmit = () => {
//     if (
//       questions.every(
//         (q) =>
//           q.question?.trim() &&
//           q.options.every((opt) => opt?.trim()) &&
//           q.correctAnswer
//       )
//     ) {
//       console.log('Test to update:', {
//         lessonId,
//         questions,
//       })
//       navigate('/admin-dashboard?activeSidebar=create-test')
//     }
//   }

//   const isCurrentQuestionValid = () => {
//     const currentQuestion = questions[currentIndex]
//     return (
//       currentQuestion.question?.trim() &&
//       currentQuestion.options.every((opt) => opt?.trim()) &&
//       currentQuestion.correctAnswer
//     )
//   }

//   const handleDeleteQuestion = () => {
//     if (questions.length === 1) {
//       // Reset if it's the only question
//       setQuestions([
//         { question: '', options: ['', '', '', ''], correctAnswer: '' },
//       ])
//       setCurrentIndex(0)
//       return
//     }

//     const updatedQuestions = questions.filter(
//       (_, index) => index !== currentIndex
//     )
//     setQuestions(updatedQuestions)
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
//   }

//   if (isLoading) {
//     return (
//       <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
//         <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
//           Loading test data...
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
//       <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
//         Update Test
//       </p>
//       <hr className="mb-4 w-full bg-black opacity-10" />
//       <p className="mb-2 text-[17px] font-medium text-black">Question</p>
//       <p className="text-[14px] font-normal text-black">
//         Choose appropriate options <span className="font-medium">A</span>,
//         <span className="font-medium">B</span>,
//         <span className="font-medium">C</span> or{' '}
//         <span className="font-medium">D</span>
//       </p>
//       <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
//         <div className="flex w-full items-center gap-2">
//           <button
//             disabled={currentIndex === 0}
//             className={`${currentIndex === 0 && 'opacity-10'}`}
//             onClick={navigatePrevious}
//           >
//             <Icons iconName={'prevArrow'} />
//           </button>
//           <div className="flex w-full items-center justify-center rounded-[10px] border border-[#4e4e4e] border-opacity-10 bg-white px-4 py-2 text-[14px] text-black md:w-auto">
//             Question {currentIndex + 1}/{questions.length}
//           </div>
//           <button
//             disabled={!isCurrentQuestionValid()}
//             className={`rotate-180 ${!isCurrentQuestionValid() && 'opacity-10'} `}
//             onClick={navigateNext}
//           >
//             <Icons iconName={'prevArrow'} />
//           </button>
//         </div>
//         <Button
//           className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() && 'pointer-events-none opacity-70'}`}
//           bgBtn={'Add Question'}
//           disabled={!isCurrentQuestionValid()}
//           onClick={navigateNext}
//         />
//       </div>
//       <hr className="mb-4 w-full bg-black opacity-10" />
//       <div className="mb-3 w-full">
//         <Input
//           placeholder="Enter your question"
//           value={questions[currentIndex].question}
//           onChange={handleQuestionChange}
//         />
//       </div>
//       <div className="mb-4">
//         <p className="mb-3 text-[17px] font-medium text-black">Options</p>
//         {questions[currentIndex].options?.map((option, index) => (
//           <div key={index} className="mb-4 flex items-center">
//             <span className="mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50">
//               {String.fromCharCode(65 + index)}
//             </span>
//             <Input
//               placeholder="Your answer here"
//               value={option}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               label={''}
//             />
//           </div>
//         ))}
//         <div className="flex items-end justify-end">
//           <button
//             className="text-orange-red transition-all duration-300 ease-in-out hover:text-primary"
//             onClick={handleDeleteQuestion}
//           >
//             Delete Question
//           </button>
//         </div>
//       </div>
//       <div className="mb-4">
//         <div className="mb-3 text-[17px] font-medium text-black">
//           Correct Answer
//         </div>
//         <div className="mb-10 flex items-center gap-3">
//           {questions[currentIndex].options?.map((_, index) => (
//             <button
//               key={index}
//               className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50 ${questions[currentIndex].correctAnswer === String.fromCharCode(65 + index) ? '!bg-primary text-white' : 'bg-[#fbfbfb]'}`}
//               onClick={() =>
//                 handleCorrectAnswerChange(String.fromCharCode(65 + index))
//               }
//             >
//               {String.fromCharCode(65 + index)}
//             </button>
//           ))}
//         </div>
//       </div>
//       <Button
//         disabled={
//           !questions.every(
//             (q) =>
//               q.question?.trim() &&
//               q.options.every((opt) => opt?.trim()) &&
//               q.correctAnswer
//           )
//         }
//         onClick={handleSubmit}
//         bgBtn={'Update Test'}
//         className={'w-full'}
//       />
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Button from '../../common/Button'
import Icons from '../../common/Icons'
import Input from '../../common/Input'
import {
  getLessonTest,
  getLessonTestById,
  updateLessonTest,
} from '../../../services/lessonTest/lessonTest.services'
import { toast } from 'sonner'

export default function UpdateTest() {
  const [searchParams] = useSearchParams()
  const lessonId = searchParams.get('id')
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTest = async () => {
      if (!lessonId) return
      try {
        const testData = await getLessonTestById(lessonId)
        console.log('test data ', testData)
        const test = testData
        setQuestions([
          {
            id: test.id,
            question: test.question,
            options: test.options,
            correctAnswer: test.answer,
          },
        ])
      } catch (error) {
        console.error('Failed to load test data', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTest()
  }, [lessonId])

  const updateTestMutation = useMutation({
    mutationFn: ({ testId, data }) => updateLessonTest(testId, data),
    onSuccess: () => {
      console.log('Test updated successfully')
      toast.success('Test Updated Successfully')
      // navigate('/admin-dashboard?activeSidebar=create-test')
    },
    onError: (error) => {
      console.error('Error updating test', error)
      alert('Something went wrong while updating test!')
    },
  })

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

  const navigateNext = () => {
    if (isCurrentQuestionValid()) {
      if (currentIndex === questions.length - 1) {
        addNewQuestion()
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentIndex]
    return (
      currentQuestion.question?.trim() &&
      currentQuestion.options.every((opt) => opt?.trim()) &&
      currentQuestion.correctAnswer
    )
  }

  const handleDeleteQuestion = () => {
    if (questions.length === 1) {
      setQuestions([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ])
      setCurrentIndex(0)
      return
    }

    const updatedQuestions = questions.filter(
      (_, index) => index !== currentIndex
    )
    setQuestions(updatedQuestions)
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleSubmit = () => {
    const valid = questions.every(
      (q) =>
        q.question?.trim() &&
        q.options.every((opt) => opt?.trim()) &&
        q.correctAnswer
    )
    if (!valid) return

    const test = questions[0] // assuming 1 test per lesson
    const payload = {
      question: test.question,
      options: test.options,
      answer: test.correctAnswer,
    }

    updateTestMutation.mutate({ testId: test.id, data: payload })
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
        <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
          Loading test data...
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Update Test
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <p className="mb-2 text-[17px] font-medium text-black">Question</p>
      <p className="text-[14px] font-normal text-black">
        Choose appropriate options <span className="font-medium">A</span>,
        <span className="font-medium">B</span>,
        <span className="font-medium">C</span> or{' '}
        <span className="font-medium">D</span>
      </p>
      <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
        <div className="flex w-full items-center gap-2">
          <button
            disabled={currentIndex === 0}
            className={`${currentIndex === 0 && 'opacity-10'}`}
            onClick={navigatePrevious}
          >
            <Icons iconName={'prevArrow'} />
          </button>
          <div className="flex w-full items-center justify-center rounded-[10px] border border-[#4e4e4e] border-opacity-10 bg-white px-4 py-2 text-[14px] text-black md:w-auto">
            Question {currentIndex + 1}/{questions.length}
          </div>
          <button
            disabled={!isCurrentQuestionValid()}
            className={`rotate-180 ${!isCurrentQuestionValid() && 'opacity-10'} `}
            onClick={navigateNext}
          >
            <Icons iconName={'prevArrow'} />
          </button>
        </div>
        <Button
          className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() && 'pointer-events-none opacity-70'}`}
          bgBtn={'Add Question'}
          disabled={!isCurrentQuestionValid()}
          onClick={navigateNext}
        />
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <div className="mb-3 w-full">
        <Input
          placeholder="Enter your question"
          value={questions[currentIndex].question}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="mb-4">
        <p className="mb-3 text-[17px] font-medium text-black">Options</p>
        {questions[currentIndex].options?.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className="mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50">
              {String.fromCharCode(65 + index)}
            </span>
            <Input
              placeholder="Your answer here"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              label={''}
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
      </div>
      <div className="mb-4">
        <div className="mb-3 text-[17px] font-medium text-black">
          Correct Answer
        </div>
        <div className="mb-10 flex items-center gap-3">
          {questions[currentIndex].options?.map((_, index) => (
            <button
              key={index}
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50 ${questions[currentIndex].correctAnswer === String.fromCharCode(65 + index) ? '!bg-primary text-white' : 'bg-[#fbfbfb]'}`}
              onClick={() =>
                handleCorrectAnswerChange(String.fromCharCode(65 + index))
              }
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>
      </div>
      <Button
        disabled={
          !questions.every(
            (q) =>
              q.question?.trim() &&
              q.options.every((opt) => opt?.trim()) &&
              q.correctAnswer
          ) || updateTestMutation.isLoading
        }
        onClick={handleSubmit}
        bgBtn={updateTestMutation.isLoading ? 'Updating...' : 'Update Test'}
        className={'w-full'}
      />
    </div>
  )
}
