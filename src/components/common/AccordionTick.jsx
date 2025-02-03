import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { accordionData } from '../../utils/helper'

// Import the custom SVG image
import StatusIcon from '../../assets/images/svg/statusIcon.svg'

const Accordion = ({ title, lessons, isOpen, onToggle }) => {
  return (
    <div className="border-gray-300 mx-auto w-full max-w-2xl rounded-lg border">
      {/* Chapter Header */}
      <button
        className="bg-gray-100 flex w-full cursor-pointer items-center justify-between p-3 text-sm font-medium"
        onClick={onToggle}
      >
        <span className="flex-grow">{title}</span>
        <img
          src={
            isOpen
              ? '/path/to/chevron-up-icon.svg'
              : '/path/to/chevron-down-icon.svg'
          } // Replace with your own chevron icons
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
              className={`flex items-center gap-2 p-3 text-sm ${lesson.completed ? 'text-green-600 font-semibold' : 'text-gray-700'}`}
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
  const [openIndex, setOpenIndex] = useState(null) // Track which accordion is open

  return (
    <div>
      {accordionData.map((chapter, index) => (
        <Accordion
          key={index}
          title={chapter.title}
          lessons={chapter.lessons}
          isOpen={openIndex === index} // Open only if it matches the active index
          onToggle={() => setOpenIndex(openIndex === index ? null : index)} // Toggle logic
        />
      ))}
    </div>
  )
}

export default AccordionExample
