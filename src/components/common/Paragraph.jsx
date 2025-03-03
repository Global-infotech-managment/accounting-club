import React from 'react'

const Paragraph = ({ text, className }) => {
  return (
    <p
      className={`text-[14px] text-black text-opacity-80 lg:text-[16px] ${className}`}
    >
      {text}
    </p>
  )
}

export default Paragraph
