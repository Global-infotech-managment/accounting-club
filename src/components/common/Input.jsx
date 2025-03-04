import React from 'react'

const Input = ({
  placeholder,
  type,
  value,
  onChange,
  mainClassName,
  labelCLassName,
  inputClassName,
  label,
}) => {
  return (
    <>
      <div className={`flex w-full flex-col ${mainClassName}`}>
        {!label && (
          <label
            htmlFor={placeholder}
            className={`text-sm mb-[2px] text-black ${labelCLassName}`}
          >
            {placeholder} <span className="text-orange-red">*</span>
          </label>
        )}

        <input
          type={type}
          className={`text-xs rounded-[4px] border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 focus-visible:outline-[1px] focus-visible:!outline-orange-red ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Input
