import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { ADMIN_DASHBOARD_ROUTE } from '../../../utils/constant'

const CreateTest = () => {
  const [testCode, setTestCode] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [topic, setTopic] = useState('')
  const [timeAllowed, setTimeAllowed] = useState('')
  const [totalQuestions, setTotalQuestions] = useState('')
  const [passingPercentage, setPassingPercentage] = useState('')

  const navigate = useNavigate()

  const formSubmit = (e) => {
    e.preventDefault()
    if (
      !testCode ||
      !exerciseName ||
      !topic ||
      !timeAllowed ||
      !totalQuestions ||
      !passingPercentage
    ) {
      alert('Please fill all the fields')
      return
    }
    console.log('Form Submitted:', {
      testCode,
      exerciseName,
      topic,
      timeAllowed,
      totalQuestions,
      passingPercentage,
    })

    setTestCode('')
    setExerciseName('')
    setTopic('')
    setTimeAllowed('')
    setTotalQuestions('')
    setPassingPercentage('')

    navigate(ADMIN_DASHBOARD_ROUTE)
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Create Test
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-wrap gap-y-4" onSubmit={formSubmit}>
        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Test Code No"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Time Allowed"
            value={timeAllowed}
            onChange={(e) => setTimeAllowed(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Total Questions"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Passing Percentage"
            value={passingPercentage}
            onChange={(e) => setPassingPercentage(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="mt-5 md:mt-10 w-full"
          bgBtn="Add New Release"
        />
      </form>
    </div>
  )
}

export default CreateTest
