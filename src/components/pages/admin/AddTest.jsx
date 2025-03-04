import { useState } from 'react'

export default function AddTest() {
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const handleSubmit = () => {
    if (
      questions.every(
        (q) =>
          q.question.trim() &&
          q.options.every((opt) => opt.trim()) &&
          q.correctAnswer
      )
    ) {
      console.log('Submitted Questions:', questions)
      setQuestions([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ])
      setCurrentIndex(0)
    }
  }

  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentIndex]
    return (
      currentQuestion.question.trim() &&
      currentQuestion.options.every((opt) => opt.trim()) &&
      currentQuestion.correctAnswer
    )
  }

  return (
    <div className="shadow mx-auto max-w-2xl rounded border p-6">
      <h2 className="text-xl mb-4 font-semibold">Add Test</h2>
      <p className="mb-2">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <input
        type="text"
        className="mb-4 w-full rounded border p-2"
        placeholder="Enter your question"
        value={questions[currentIndex].question}
        onChange={handleQuestionChange}
      />
      <div className="mb-4">
        {questions[currentIndex].options.map((option, index) => (
          <div key={index} className="mb-2 flex items-center">
            <span className="mr-2 font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter answer option"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Correct Answer:</span>
        {questions[currentIndex].options.map((_, index) => (
          <button
            key={index}
            className={`m-1 rounded border px-3 py-1 ${questions[currentIndex].correctAnswer === String.fromCharCode(65 + index) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() =>
              handleCorrectAnswerChange(String.fromCharCode(65 + index))
            }
          >
            {String.fromCharCode(65 + index)}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 rounded px-4 py-2"
          disabled={currentIndex === 0}
          onClick={navigatePrevious}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 rounded px-4 py-2 text-black"
          disabled={!isCurrentQuestionValid()}
          onClick={navigateNext}
        >
          Next
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          className="bg-green-500 rounded px-6 py-2 text-black"
          disabled={
            !questions.every(
              (q) =>
                q.question.trim() &&
                q.options.every((opt) => opt.trim()) &&
                q.correctAnswer
            )
          }
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
