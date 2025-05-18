import React from 'react'
import EnrolledCoursesCard from './EnrolledCoursesCard'
import { enrollCourses } from '../../../../utils/helper'
import Paragraph from '../../../common/Paragraph'
import Heading from '../../../common/Heading'
import { useQuery } from '@tanstack/react-query'
import { fetchEnrollmentCourses } from '../../../../services/course/course.service'

const EnrolledCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: fetchEnrollmentCourses,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong.</p>
  console.log('data ', data)

  return (
    <div className="container max-w-[1920px] px-2 pt-2">
      <Heading
        className="text-xl sm:!text-2xl mb-1 !text-black"
        middleText="My Enrolled Courses"
      />
      <Paragraph
        className="!text-sm !text-black opacity-80"
        text="Access and manage your enrolled courses for seamless learning anytime, anywhere."
      />

      {data?.length === 0 ? (
        <div className="text-gray-600 mt-6 text-center text-base">
          You have not enrolled in any courses yet.
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data?.map((course) => (
            <div key={course?.course.id}>
              <EnrolledCoursesCard
                image={course?.course?.file?.url}
                heading={course?.course?.name}
                description={course?.course?.description}
                totalCourses={5}
                completedCourses={4}
                path={course?.course?.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses
