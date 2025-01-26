import React from 'react'

const Heading = ({ firstText, middleText, lastText, className }) => {
  return (
    <h1
      className={`text-3xl font-bold !leading-132 sm:text-4xl md:text-5xl ${className} ${middleText ? 'text-secondary' : '!text-black'}`}
    >
      {firstText && <span className="text-black">{firstText} </span>}
      <span>{middleText} </span>
      {lastText && <span className="text-black">{lastText}</span>}
    </h1>
  )
}

export default Heading
