import React from 'react'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Button from './Button'
import learnMoreArrow from '../../assets/images/svg/learnMoreArrow.svg'
const OnlineCourse = ({
  image,
  heading,
  description,
  enrollPath,
  detailPath,
}) => {
  return (
    <div className="rounded-[20px] border border-[#EDEFF2] bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.6)_0%,_rgba(247,_250,_255,_0.6)_100%)] p-4 transition-all duration-300 hover:bg-courses-card hover:shadow-course-card">
      <img
        className="max-h-[216px] min-h-[200px] w-full rounded-[8px] object-cover"
        src={image}
        alt="course image"
      />
      <Heading
        className="mb-2 mt-3 !text-[20px] !font-medium !text-black xl:mb-0"
        middleText={heading}
      />
      <Paragraph
        className="mx-auto mb-3 line-clamp-3 max-w-[590px] !text-[14px] font-normal text-black md:!text-[16px]"
        text={description}
      />
      <div className="flex gap-3">
        <a
          href={detailPath}
          className="flex items-center justify-center gap-[6px] text-[16px] text-light-blue transition-all duration-150 ease-in-out hover:gap-2"
        >
          Learn more <img src={learnMoreArrow} alt="learnMoreArrow" />
        </a>
        {/* <Button
          path={enrollPath}
          className="w-full !rounded-md !bg-primary text-white hover:!bg-white hover:!text-primary"
          transparentBtn="Enroll Now"
        />
        <Button
          path={detailPath}
          className="w-full !rounded-md"
          transparentBtn="More Detail"
        /> */}
      </div>
    </div>
  )
}

export default OnlineCourse
