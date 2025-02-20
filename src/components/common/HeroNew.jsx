import React from 'react'
import Heading from './Heading'
import Button from './Button'
import circle from '../../assets/images/webp/hero-circle.png'
import Icons from './Icons'
const HeroNew = () => {
  return (
    <div className="bg-hero flex min-h-[700px] items-center bg-cover bg-no-repeat py-10 pb-10 lg:mt-[-90px] lg:min-h-screen lg:pb-0">
      <div className="container flex h-full w-full px-3 lg:max-w-[1184px]">
        <div className="flex flex-col-reverse flex-wrap lg:flex-row">
          <div className="relative flex w-full flex-col items-start justify-center pt-5 lg:w-6/12 lg:pt-0">
            <div className="absolute right-[50%] top-[80%] hidden max-w-[63px] rotate-45 sm:top-[70%] md:right-[60%] lg:right-[10%] lg:top-[6%] lg:block lg:rotate-0">
              <Icons iconName={'heroArrow'} />
            </div>
            <Heading
              className={
                'xl:!text-custom-5xl !text-[35px] font-bold !leading-[100%] !text-white sm:!text-[40px] md:!text-[50px]'
              }
              middleText={'Elevate Your Accounting Skills'}
            />
            <p className="mt-3 border-l-2 ps-3 text-[14px] font-normal text-white opacity-80 md:text-[16px]">
              Boost your accounting career with expert-led courses designed to
              sharpen your skills, enhance your knowledge, and unlock new
              professional opportunities in the accounting field.
            </p>
            <Button
              className={'relative z-10 mt-5 lg:mt-10'}
              bgWhite={'Start Learning Now'}
            />
          </div>
          <div className="flex w-full items-center justify-center lg:w-6/12">
            <img
              src={circle}
              alt="circle"
              className="w-full max-w-[400px] lg:max-w-[448px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroNew
