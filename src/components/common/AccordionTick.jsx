import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { accordionData } from '../../utils/helper'
import upArrow from '../../assets/images/svg/upArrow.svg'
import downArrow from '../../assets/images/svg/downArrow.svg'
import StatusIcon from '../../assets/images/svg/statusIcon.svg'

const Accordion = ({ title, lessons, isOpen, onToggle }) => {
  return (
    <div className="border-gray-300 mx-auto w-full max-w-2xl rounded-lg border overflow-hidden">
      {/* Chapter Header */}
      <button
        className="bg-gray-100 flex w-full cursor-pointer items-center justify-between p-3 text-[14px] font-medium"
        onClick={onToggle}
      >
        <span className="flex-grow text-start">{title}</span>
        <img
          src={isOpen ? upArrow : downArrow} 
          alt="toggle icon"
          className="h-4 w-4"
        />
      </button>

      {/* Lessons List */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="bg-white">
          {lessons.map((lesson, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 py-2 px-3 text-[12px] ${lesson.completed ? 'text-green-600 font-semibold' : 'text-gray-700'}`}
            >
              {/* Use the custom status icon */}
              {lesson.completed && (
                <img
                  src={StatusIcon}
                  alt="Completed"
                  className="mr-2 h-3.5 w-3.5"
                />
              )}
              {lesson.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

const AccordionExample = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="flex flex-col gap-2">
      {accordionData.map((chapter, index) => (
        <Accordion
          key={index}
          title={chapter.title}
          lessons={chapter.lessons}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}

export default AccordionExample
