import React from 'react'
import EnrolledCoursesCard from './EnrolledCoursesCard'
import { enrollCourses } from '../../../../utils/helper'

const EnrolledCourses = () => {
  return (
    <div className="flex flex-wrap">
      {enrollCourses.map((course) => (
        <div key={course.id} className="px-3 pt-6 sm:w-6/12 xl:w-4/12">
          <EnrolledCoursesCard
            image={course.image}
            heading={course.heading}
            description={course.description}
            completedCourses={1}
            totalCourses={5}
          />
        </div>
      ))}
    </div>
  )
}

export default EnrolledCourses
