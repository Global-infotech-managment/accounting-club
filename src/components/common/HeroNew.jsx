import React from 'react'
import Heading from './Heading'
import Button from './Button'

const HeroNew = () => {
  return (
    <div className="bg-hero bg-cover bg-no-repeat pt-12 sm:pt-16 md:pt-24 lg:pt-[129px]">
      <div className="container w-full px-3 lg:max-w-[1184px]">
        <div className="flex flex-wrap">
          <div className="w-6/12">
            <Heading
              className={
                '!text-custom-5xl font-bold !leading-[100%] !text-white'
              }
              middleText={'Elevate Your Accounting Skills'}
            />
            <p className="mt-3 text-[16px] font-normal text-white opacity-80 border-l-2 ps-3">
              Boost your accounting career with expert-led courses designed to
              sharpen your skills, enhance your knowledge, and unlock new
              professional opportunities in the accounting field.
            </p>
            <Button className={"mt-10"} bgWhite={'Start Learning Now'} />
          </div>
        </div>
        HeroNew
      </div>
    </div>
  )
}

export default HeroNew
