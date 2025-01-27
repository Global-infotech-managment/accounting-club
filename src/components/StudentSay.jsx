import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import RedArrow from '../assets/images/png/red-arrow.png'
import { studentData } from '../utils/helper'
import StudentEllipse from '../assets/images/png/second-hero-ellipse.png'

const StudentSay = () => {
  return (
    <div className="relative">
      <div className="container relative z-20 flex items-center justify-between gap-8 px-3 pt-16 max-lg:flex-col sm:gap-10 md:pt-24 lg:max-w-[1148px] lg:gap-6 lg:pt-[120px]">
        <div className="w-full lg:max-w-[512px]">
          <div className="relative w-full">
            <img
              className="absolute -top-8 right-32 z-0 max-md:max-w-[100px] max-sm:hidden md:-top-12 md:right-4 lg:top-0 xl:-right-12"
              src={RedArrow}
              alt="red arrow"
            />
            <Heading
              className="relative z-30 lg:max-w-[326px]"
              firstText="What Our"
              middleText="Student"
              lastText="Says"
            />
          </div>
          <Paragraph
            className="mt-2 sm:mt-3 md:mt-4"
            text="Accountants Club transformed my career with practical training. The expert guidance and unique techniques made learning accounting effortless and enjoyable!"
          />
          <Button className="mt-4 sm:mt-6 md:mt-8 lg:mt-10" bgBtn="View More" />
        </div>
        <div className="w-full lg:max-w-[481px]">
          {studentData.map((obj, index) => (
            <div
              key={index}
              className={`${index === 1 ? 'mt-4 sm:mt-6' : ''} rounded-5 border border-black border-opacity-5 bg-white p-4 sm:px-6 sm:py-[22px]`}
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold leading-150">
                {obj.title}
              </h2>
              <Paragraph className="mt-2" text={obj.text} />
              <div className="flex items-center justify-between">
                <div className="mt-2 flex items-center gap-2 text-sm font-normal !leading-150 text-light-black">
                  <img
                    width={32}
                    height={32}
                    src={obj.profileImg}
                    alt="profile image"
                  />
                  {obj.name}
                </div>
                <img
                  className="max-sm:w-10"
                  width={58}
                  height={54}
                  src={obj.stopSymbol}
                  alt="stop image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        className="pointer-events-none absolute bottom-72 left-0 max-xl:hidden"
        src={StudentEllipse}
        alt="student ellipse"
      />
    </div>
  )
}

export default StudentSay
