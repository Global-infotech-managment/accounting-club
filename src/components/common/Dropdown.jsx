import React, { useState } from 'react'

export const Dropdown = ({
  options,
  label,
  defaultValue,
  onChange,
  className,
  disabled,
}) => {
  const [selected, setSelected] = useState(defaultValue)

  const handleChange = (event) => {
    const value = event.target.value
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <label className="mb-[2px] text-sm text-black">
        {label} <span className="text-orange-red">*</span>
      </label>
      <select
        value={selected}
        onChange={handleChange}
        disabled={disabled}
        className="rounded-[4px] border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 focus-visible:outline-[1px] focus-visible:outline-orange-red"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
