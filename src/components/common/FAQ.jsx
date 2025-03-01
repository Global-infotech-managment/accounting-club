import React, { useState } from 'react'
import { motion } from 'framer-motion'
import faqLine from '../../assets/images/svg/faqLine.svg'
import Icons from './Icons'

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex w-full flex-col gap-[20px]">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl border border-black border-opacity-5 backdrop-blur-[17px] ${openIndex === index ? 'bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.6)_0%,_rgba(247,_250,_255,_0.6)_100%)]' : 'bg-courses-card'}`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className={`flex w-full items-center justify-between p-4 text-left text-[18px] font-medium text-black transition-all duration-300 ease-in-out ${openIndex === index && '!pb-[10px]'}`}
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
            <div className="text-gray-700 p-4 !pt-0">{item.content}</div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

const FAQ = () => {
  const items = [
    {
      title: 'What is your refund policy?',
      content: 'We offer a full refund within 30 days of purchase.',
    },
    {
      title: 'How do I contact support?',
      content: 'You can reach us via email at support@example.com.',
    },
    {
      title: 'Do you offer customization?',
      content: 'Yes, we offer tailored solutions for businesses.',
    },
  ]

  return (
    <div className="container mt-[110px] w-full px-3 lg:max-w-[1184px]">
      <p className="mb-4 text-center text-[30px] font-bold leading-tight text-black sm:text-[35px] md:text-[40px] lg:text-[48px]">
        Frequently Asked <span className="text-gradient">Questions</span>
      </p>
      <p className="mx-auto max-w-[611px] text-center text-[14px] font-normal text-black md:text-[16px]">
        Clear and Concise Answers to Common Queries for Better Understanding and
        Hassle-Free Experience.
      </p>
      <img
        src={faqLine}
        alt="faq line"
        className="mx-auto w-full max-w-[394px]"
      />
      <div className="mt-[51px] flex flex-wrap">
        <div className="w-7/12">
          <Accordion items={items} />
        </div>
      </div>
    </div>
  )
}

export default FAQ
