import React from 'react'
import EnrolledCoursesCard from './EnrolledCoursesCard'
import { enrollCourses } from '../../../../utils/helper'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'

const EnrolledCourses = () => {
  return (
    <div className="container max-w-[1920px] px-2 pt-2">
      <Heading
        className="mb-1 text-xl !text-black sm:!text-2xl"
        middleText="My Enrolled Courses"
      />
      <Paragraph
        className="!text-sm !text-black opacity-80"
        text="Access and manage your enrolled courses for seamless learning anytime, anywhere."
      />
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {enrollCourses.map((course) => (
          <div key={course.id}>
            <EnrolledCoursesCard
              image={course.image}
              heading={course.heading}
              description={course.description}
              totalCourses={5}
              completedCourses={4}
              path={course.heading}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnrolledCourses
