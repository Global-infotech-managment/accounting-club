import React from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'
import { Link } from 'react-router-dom'

const EnrolledCoursesCard = ({
  image,
  heading,
  description,
  completedCourses,
  totalCourses,
  path,
}) => {
  const completionPercentage = (completedCourses / totalCourses) * 100

  return (
    <Link
      to={path}
      className="rounded-[20px] block border border-black border-opacity-5 md:p-4 p-2 transition-all duration-300 hover:border-primary"
    >
      <img
        className="min-h-[200px] w-full rounded-[20px] object-cover"
        src={image}
        alt="course image"
      />
      <Heading
        className="py-2.5 !text-[18px] !font-semibold !text-black xl:mb-0"
        middleText={heading}
      />
      <Paragraph
        className="mx-auto mb-3 line-clamp-2 max-w-[590px] font-normal text-black"
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
    </Link>
  )
}

export default EnrolledCoursesCard
