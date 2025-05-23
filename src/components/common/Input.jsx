import React from 'react'

const Input = ({
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  mainClassName = '',
  labelClassName = '',
  inputClassName = '',
  label,
}) => {
  return (
    <div className={`flex w-full flex-col ${mainClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-[2px] text-sm text-black ${labelClassName}`}
        >
          {label} <span className="text-orange-red">*</span>
        </label>
      )}

      <input
        type={type}
        name={name}
        id={name}
        className={`text-xs rounded-[4px] border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 focus-visible:outline-[1px] focus-visible:!outline-orange-red ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
