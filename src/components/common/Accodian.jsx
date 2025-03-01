import Icons from './Icons'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex w-full flex-col gap-[20px]">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl border border-black border-opacity-5 backdrop-blur-[17px] ${openIndex === index ? 'bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.6)_0%,_rgba(247,_250,_255,_0.6)_100%)] shadow-trusted' : 'bg-courses-card'}`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className={`flex w-full items-center justify-between p-4 text-left text-[16px] font-medium text-black transition-all duration-300 ease-in-out md:text-[18px] ${openIndex === index && '!pb-[10px]'}`}
          >
            {item.title}
            <span
              className={`${openIndex === index && 'rotate-180 transition-all duration-300 ease-in-out'}`}
            >
              <Icons iconName={openIndex === index ? 'minus' : 'plus'} />
            </span>
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: openIndex === index ? 'auto' : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 !pt-0 text-[14px] text-black md:text-[16px]">
              {item.content}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
