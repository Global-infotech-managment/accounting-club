import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { ADMIN_DASHBOARD_ROUTE } from '../../../utils/constant'

const CreateTest = () => {
  const [formData, setFormData] = useState({
    testCode: '',
    exerciseName: '',
    topic: '',
    timeAllowed: '',
    totalQuestions: '',
    passingPercentage: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const formSubmit = (e) => {
    e.preventDefault()
    const {
      testCode,
      exerciseName,
      topic,
      timeAllowed,
      totalQuestions,
      passingPercentage,
    } = formData

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
    console.log(formData, 'create test')
    setFormData({
      testCode: '',
      exerciseName: '',
      topic: '',
      timeAllowed: '',
      totalQuestions: '',
      passingPercentage: '',
    })

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
            name="testCode"
            placeholder="Test Code No"
            value={formData.testCode}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            name="exerciseName"
            placeholder="Exercise Name"
            value={formData.exerciseName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            name="timeAllowed"
            placeholder="Time Allowed"
            value={formData.timeAllowed}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            name="totalQuestions"
            placeholder="Total Questions"
            value={formData.totalQuestions}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            name="passingPercentage"
            placeholder="Passing Percentage"
            value={formData.passingPercentage}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="mt-5 w-full md:mt-10"
          bgBtn="Add New Release"
        />
      </form>
    </div>
  )
}

export default CreateTest
