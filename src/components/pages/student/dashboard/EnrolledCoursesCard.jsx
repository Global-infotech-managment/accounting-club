import React from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'

const EnrolledCoursesCard = ({
  image,
  heading,
  description,
  completedCourses,
  totalCourses,
}) => {
  const completionPercentage = (completedCourses / totalCourses) * 100

  return (
    <div className="rounded-[20px] border border-black border-opacity-5 p-4 transition-all duration-300 hover:border-primary">
      <img
        className="min-h-[200px] w-full rounded-[20px] object-cover"
        src={image}
        alt="course image"
      />
      <Heading
        className="py-2.5 !text-xl !font-semibold !text-black xl:mb-0"
        middleText={heading}
      />
      <Paragraph
        className="mx-auto mb-3 line-clamp-2 max-w-[590px] !text-base font-normal text-black"
        text={description}
      />
      <div className="flex items-center justify-between">
        <div className="h-[6px] w-full overflow-hidden rounded-[20px] bg-[#00000008]">
          <div
            className="h-full rounded-[20px] bg-primary transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <Paragraph
          className="ms-[10px] text-nowrap"
          text={`${completionPercentage}% Complete`}
        />
      </div>
    </div>
  )
}

export default EnrolledCoursesCard
