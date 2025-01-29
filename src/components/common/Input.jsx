import React from 'react'

const Input = ({
  placeholder,
  type,
  value,
  onChange,
  mainClassName,
  labelCLassName,
  inputClassName,
}) => {
  return (
    <>
      <div className={`flex w-full flex-col ${mainClassName}`}>
        <label
          htmlFor={placeholder}
          className={`mb-[2px] text-sm text-black ${labelCLassName}`}
        >
          {placeholder} <span className="text-orange-red">*</span>
        </label>
        <input
          type={type}
          className={`rounded-[4px] border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 focus-visible:outline-[1px] focus-visible:outline-orange-red ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Input
