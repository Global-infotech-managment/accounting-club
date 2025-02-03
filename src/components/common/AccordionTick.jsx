import React, { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { accordionData } from '../../utils/helper'

const Accordion = ({ title, lessons, isOpen, onToggle }) => {
  return (
    <div className="border-gray-300 mx-auto w-full max-w-md rounded-lg border">
      {/* Chapter Header */}
      <button
        className="bg-gray-100 flex w-full items-center justify-between p-3 text-xs font-medium"
        onClick={onToggle} 
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
              className={`flex items-center gap-2 p-3 text-xs ${
                lesson.completed
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-700'
              }`}
            >
              {lesson.completed && (
                <CheckCircle size={14} className="text-green-500" />
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
    <div className="flex flex-col gap-4">
      {accordionData.map((chapter, index) => (
        <Accordion
          key={index}
          title={chapter.title}
          lessons={chapter.lessons}
          isOpen={openIndex === index} // Open only if it matches the active index
          onToggle={
            () => setOpenIndex(openIndex === index ? null : index) // Toggle logic
          }
        />
      ))}
    </div>
  )
}

export default AccordionExample
