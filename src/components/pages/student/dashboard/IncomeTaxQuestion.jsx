import React, { useState } from 'react'

const IncomeTaxQuestion = ({ questions }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="mb-4 text-lg font-semibold">{questions[0].question}</h2>
      <div className="space-y-2">
        {questions[0].options.map((option, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              value={String.fromCharCode(65 + index)}
              checked={selectedOption === String.fromCharCode(65 + index)}
              onChange={handleOptionChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4 rounded"
            />
            <span>{`${String.fromCharCode(65 + index)}. ${option}`}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default IncomeTaxQuestion
