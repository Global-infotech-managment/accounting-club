import React, { useState } from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import OnlineCourse from './common/OnlineCourse'
import { onlineCoursesData } from '../utils/helper'
import Button from './common/Button'

const OnlineCoursesSell = () => {
  // State to manage the number of courses to display
  const [coursesToDisplay, setCoursesToDisplay] = useState(3)

  // Function to handle "Show More" and "Show Less"
  const toggleCourses = () => {
    if (coursesToDisplay === onlineCoursesData.length) {
      // If all courses are shown, collapse back to 3
      setCoursesToDisplay(3)
    } else {
      // Otherwise, show 3 more courses
      setCoursesToDisplay(coursesToDisplay + 3)
    }
  }
  const locationPath = window.location.pathname
  return (
    <div className="container max-w-[1184px] py-12 sm:py-14 lg:mb-10 lg:py-[84px]">
      <Heading
        className="mb-3 text-center xl:mb-4"
        middleText={
          <>
            <span className="text-black">Online</span>{' '}
            <span className="bg-gradient-to-r !text-transparent from-[#253466] via-[#200A5B] to-[#E5413F] bg-clip-text">
              Courses
            </span>
          </>
        }
      />
      <Paragraph
        className="mx-auto mb-6 max-w-[590px] text-center text-black"
        text="Be an Accounting and taxation expert in few days even if you don't have any Accounting background. Choose a program as per your requirement"
      />
      <div className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {onlineCoursesData.slice(0, coursesToDisplay).map((courses, index) => {
          return (
            <OnlineCourse
              key={index}
              description={courses.description}
              heading={courses.heading}
              image={courses.image}
              enrollPath={courses.enrollPath}
              detailPath={`/courses/${courses.heading.replaceAll(' ', '-').toLowerCase()}`}
            />
          )
        })}
      </div>
      {onlineCoursesData.length > 3 && (
        <>
          {' '}
          <div className="mt-12 flex justify-center">
            <Button
              className="!text-md w-full max-w-[202px] !rounded-md"
              transparentBtn={
                coursesToDisplay === onlineCoursesData.length
                  ? 'Show Less'
                  : 'Show More'
              }
              onClick={toggleCourses}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default OnlineCoursesSell
