import React, { useState } from 'react'
import { chooseUsContent } from '../utils/helper'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import StudentEllipse from '../assets/images/png/second-hero-ellipse.png'
import ChooseEllipse from '../assets/images/png/footer-ellipse.png'
import LeftBottomImg from '../assets/images/png/choose-left-bottom.png'
import RightTopImg from '../assets/images/png/choose-right-top.png'
import ChooseUsCard from './ChooseUsCard' // Import ChooseUsCard Component
import Icons from './common/Icons'

const ChooseUs = () => {
  const [activeBtn, setActiveBtn] = useState('Free Classes')
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Function to handle button click for changing tabs
  const handleButtonClick = (btnText, index) => {
    setActiveBtn(btnText)
    setActiveTabIndex(index)
    setActiveSlideIndex(0) // Reset the slide to first when changing tabs
  }

  // Function to handle previous slide button
  const handlePrevSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : chooseUsContent[activeTabIndex].length - 1
    )
  }

  // Function to handle next slide button
  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex < chooseUsContent[activeTabIndex].length - 1 ? prevIndex + 1 : 0
    )
  }

  return (
    <section className="relative px-3 xl:px-0">
      <div className="rounded-6 container relative z-20 bg-primary px-3 py-8 sm:px-4 sm:py-10 md:py-12 lg:max-w-[1184px] lg:px-5 lg:py-16 xl:px-8">
        <Heading
          className="mb-3 text-center !text-white xl:mb-4"
          middleText="Why Choose Us?"
        />
        <Paragraph
          className="mx-auto max-w-[590px] text-center !text-white"
          text="We are offering world's most advanced courses in Accounting and Indian Taxation with some unique features"
        />

        {/* Tab Button */}
        <div className="mt-6 flex items-center gap-4 overflow-x-auto whitespace-nowrap sm:justify-center lg:gap-5">
          {chooseUsContent.map((obj, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(obj[0].btnText, index)} // Use the first slide's button text to identify the tab
              className={`rounded-1 border px-4 py-3 text-sm font-medium !leading-[133%] duration-300 hover:!bg-white hover:!text-primary max-sm:w-full md:h-[52px] md:px-6 md:py-[14px] md:text-base xl:text-lg ${activeBtn === obj[0].btnText ? 'border-[transparent] bg-white text-primary' : '!border-white !bg-primary text-white'}`}
            >
              {obj[0].btnText}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mx-auto my-8 h-[0.5px] bg-white md:max-w-[85%] xl:my-10 xl:max-w-[964px]"></div>

        <div className="relative flex items-center justify-between pb-10 md:pb-0">
          {/* Previous Button */}

          <button
            onClick={handlePrevSlide}
            className="rounded-1 group flex h-7 min-w-7 cursor-pointer items-center justify-center border border-white duration-300 hover:bg-white lg:h-10 lg:min-w-10"
          >
            <Icons iconName={'btnArrow'} />
          </button>
          <div className="w-full max-w-[600px] overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${activeSlideIndex * 100}%)`,
              }}
            >
              {/* Use ChooseUsCard to render each slide */}
              {chooseUsContent[activeTabIndex].map((slide, index) => (
                <div key={index} className="min-w-full">
                  {' '}
                  {/* Ensure each slide takes full width */}
                  <ChooseUsCard obj={slide} />
                </div>
              ))}
            </div>
          </div>
          {/* Next Button */}

          <button
            onClick={handleNextSlide}
            className="rounded-1 group flex h-7 min-w-7 rotate-180 cursor-pointer items-center justify-center border border-white duration-300 hover:bg-white lg:h-10 lg:min-w-10"
          >
            <Icons iconName={'btnArrow'} />
          </button>
        </div>

        {/* Ellipse Images */}
        <img
          className="pointer-events-none absolute bottom-0 left-0 max-xl:w-24"
          src={LeftBottomImg}
          alt="student ellipse"
        />
        <img
          className="pointer-events-none absolute right-0 top-0 max-xl:w-24"
          src={RightTopImg}
          alt="right top ellipse"
        />
      </div>

      {/* Additional Ellipse Images for Larger Screens */}
      <img
        className="pointer-events-none absolute left-0 top-0 max-xl:hidden"
        src={StudentEllipse}
        alt="left bottom ellipse"
      />
      <img
        className="pointer-events-none absolute bottom-0 right-0 z-0 max-xl:hidden"
        src={ChooseEllipse}
        alt="footer ellipse"
      />
    </section>
  )
}

export default ChooseUs
