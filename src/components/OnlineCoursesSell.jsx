import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import OnlineCourse from './common/OnlineCourse'
import Button from './common/Button'
import leftLinear from '../assets/images/png/courses-left-ellips.png'
import {
  fetchCourses,
  fetchCoursesForStudent,
} from '../services/course/course.service'

const OnlineCoursesSell = () => {
  const [coursesToDisplay, setCoursesToDisplay] = useState(6)

  // Fetch courses using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses'],
    queryFn: () =>
      fetchCourses({
        page: 1,
        limit: 100, // Fetch enough courses to handle pagination client-side
      }),
  })

  const toggleCourses = () => {
    if (coursesToDisplay === (data?.data?.length || 0)) {
      setCoursesToDisplay(6)
    } else {
      setCoursesToDisplay(coursesToDisplay + 3)
    }
  }

  if (isLoading)
    return <div className="flex justify-center py-10">Loading courses...</div>
  if (isError)
    return (
      <div className="text-red-500 flex justify-center py-10">
        Error loading courses
      </div>
    )

  const courses = data?.data || []

  return (
    <div className="relative">
      <img
        src={leftLinear}
        alt="leftLinear"
        className="pointer-events-none absolute end-0 top-0 -z-10 max-h-[370px] w-full max-w-[150px]"
      />
      <div className="container max-w-[1184px] py-12 sm:py-14 lg:mb-10 lg:py-[84px]">
        <Heading
          className="mb-2 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Online</span>{' '}
              <span className="text-gradient">Courses</span>
            </>
          }
        />
        <Paragraph
          className="mx-auto mb-8 max-w-[590px] text-center text-black"
          text="Be an Accounting and taxation expert in few days even if you don't have any Accounting background. Choose a program as per your requirement"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
          {courses.slice(0, coursesToDisplay).map((course) => (
            <OnlineCourse
              key={course.id}
              description={course.description}
              heading={course.name}
              image={
                course?.file?.url ||
                'https://via.placeholder.com/300x200?text=No+Image'
              }
              enrollPath={`/enroll/${course.id}`}
              detailPath={`/courses/${course.id}`}
            />
          ))}
        </div>
        {courses.length > 6 && (
          <div className="mt-12 flex justify-center">
            <Button
              className="!text-md w-full max-w-[202px] !rounded-md"
              transparentBtn={
                coursesToDisplay === courses.length ? 'Show Less' : 'Show More'
              }
              onClick={toggleCourses}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default OnlineCoursesSell
