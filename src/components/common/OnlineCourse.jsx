import React from 'react'
import Heading from './Heading'
import Paragraph from './Paragraph'
import card1 from "../../assets/images/png/online-course-1.png"
import Button from './Button'
const OnlineCourse = () => {
  return (
    <div className="container py-12 sm:py-14 lg:mb-10 lg:py-[84px]">
      <Heading
        className="mb-3 text-center xl:mb-4"
        middleText={
          <>
            <span className="text-black">Online</span>{' '} 
            <span className="text-red-500"> Courses</span>
          </>
        }
      />
      <Paragraph
        className="mx-auto mb-6 max-w-[590px] text-center text-black"
        text="Be an Accounting and taxation expert in few days even if you don't have any Accounting background. Choose a program as per your requirement
"
      />
      <div className="grid grid-cols-1 pt-10 md:grid-cols-3">
        <div className="rounded-[20px] border border-primary p-4">
          <img
            className="min-h-[200px] w-full rounded-[20px] object-cover"
            src={card1}
            alt="course image"
          />
          <Heading
            className="py-2.5 !text-xl !font-semibold !text-black xl:mb-0"
            middleText="Goods & Service Tax"
          />
          <Paragraph
            className="mx-auto mb-3 max-w-[590px] !text-base font-normal text-black"
            text="  Understand GST fundamentals, registration, compliance, and return
            filing with step-by-step guidance to master taxation concepts
            efficiently."
          />
          <div className="flex gap-3">
            <Button
              className="w-full !rounded-md !bg-primary text-white hover:!bg-white hover:!text-primary"
              transparentBtn="Enroll Now"
            />
            <Button
              className="w-full !rounded-md"
              transparentBtn="More Detail"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineCourse
