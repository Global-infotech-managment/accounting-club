import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import OnlineCourse from './common/OnlineCourse'
import { onlineCoursesData } from '../utils/helper'
const OnlineCoursesSell = () => {
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
        text="Be an Accounting and taxation expert in few days even if you don't have any Accounting background. Choose a program as per your requirement"
      />
      <div className="grid grid-cols-1 pt-10 md:grid-cols-3">
        {onlineCoursesData.map((courses, index) => {
          return (
            <OnlineCourse
              description={courses.description}
              heading={courses.heading}
              image={courses.image}
              enrollPath={courses.enrollPath}
              detailPath={courses.detailPath}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OnlineCoursesSell
