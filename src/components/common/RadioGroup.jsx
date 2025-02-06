import React from 'react'

const RadioGroup = ({ options, selected, onChange }) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center space-x-3"
        >
          <input
            type="radio"
            name="paymentMethod"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="text-red-500 focus:ring-red-400 h-4 w-4"
          />
          <span className="text-gray-700 font-medium">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
