import React from 'react'

const Paragraph = ({ text, className }) => {
  return (
    <p className={`text-black text-opacity-80 max-sm:text-sm ${className}`}>
      {text}
    </p>
  )
}

export default Paragraph
