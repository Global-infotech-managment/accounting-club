import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import courseImage from '../../assets/images/png/course-details-hero.png'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Icons from '../common/Icons'
import Button from '../common/Button'
import StudentEllipse from '../../assets/images/png/second-hero-ellipse.png'
import bookImage from '../../assets/images/png/online-book.png'
import { PAYMENT_METHOD_ROUTE, STUDENT_LOGIN_ROUTE } from '../../utils/constant'
import { useQuery } from '@tanstack/react-query'
import { findCourseById } from '../../services/course/course.service'
import useAuth from '../../hooks/useAuth'

const CourseDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => findCourseById(slug),
    enabled: !!slug,
  })

  const handleEnrollClick = () => {
    if (isAuthenticated) {
      // navigate(PAYMENT_METHOD_ROUTE)
      navigate(PAYMENT_METHOD_ROUTE.replace(':courseId', slug))
    } else {
      const shouldLogin = window?.confirm(
        'You need to login first to enroll in this course.'
      )
      if (shouldLogin) {
        navigate(STUDENT_LOGIN_ROUTE, {
          state: { from: `/course/${slug}` },
        })
      }
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>
  if (isError)
    return <div className="text-red-500 text-center">Error loading course</div>
  if (!course)
    return <div className="text-red-500 text-center">Course not found</div>

  return (
    <div className="relative pb-20">
      {/* Background elements */}
      <img
        className="pointer-events-none absolute bottom-1/3 left-0 max-xl:hidden"
        src={StudentEllipse}
        alt="student ellipse"
      />
      <img
        className="pointer-events-none absolute bottom-0 right-0 max-xl:hidden"
        src={bookImage}
        alt="book"
      />

      <div className="container mx-auto max-w-6xl px-4 pt-5 sm:px-6 sm:pt-10 lg:pt-14 xl:pt-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-8">
          {/* Left column - Course content */}
          <div className="lg:w-8/12">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-3xl">
              <img
                height={300}
                className="w-full"
                src={course?.fileId?.url || courseImage}
                alt="course img"
              />
            </div>

            <div className="mt-6">
              <Heading
                level={1}
                className="mb-4 text-3xl font-bold md:text-4xl"
                middleText={
                  <span className="text-red-500 capitalize">{course.name}</span>
                }
              />
              <Paragraph
                className="text-gray-700 text-lg"
                text={course.description}
              />
            </div>
          </div>

          {/* Right column - Course details */}
          <div className="lg:w-4/12">
            <div className="shadow-md sticky top-20 rounded-xl bg-white p-6">
              <div className="flex items-end justify-between">
                <div className="flex items-end">
                  <Heading className="pe-2 !text-black" middleText={'₹'} />
                  <Heading className="!text-black" middleText={course.price} />
                </div>
                <Paragraph
                  className="text-orange-red"
                  text={`${course.price}% Off`}
                />
              </div>
              <div className="mt-2 flex rounded-[10px] border border-black border-opacity-20 px-5">
                <div className="flex w-6/12 items-center gap-2.5 border-r border-black border-opacity-20">
                  <Icons iconName="bookImage" className="size-4" />
                  <div className="py-2.5">
                    <Paragraph className="opacity-80" text="Lessons" />
                    <Paragraph className="" text={course.lessons} />
                  </div>
                </div>
                <div className="ms-5 flex w-6/12 items-center gap-2.5">
                  <Icons iconName="difficulty" className="size-4" />
                  <div className="py-2.5">
                    <Paragraph className="opacity-80" text="Difficulty" />
                    <Paragraph
                      className="capitalize"
                      text={course.difficulty}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <Icons
                    iconName="bookImage"
                    className="text-gray-500 h-5 w-5"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">Lessons</p>
                    <p className="font-medium">{course.lessons}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icons
                    iconName="difficulty"
                    className="text-gray-500 h-5 w-5"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">Difficulty</p>
                    <p className="font-medium capitalize">
                      {course.difficulty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icons
                    iconName="students"
                    className="text-gray-500 h-5 w-5"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">Students</p>
                    <p className="font-medium">{course.students}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icons
                    iconName="language"
                    className="text-gray-500 h-5 w-5"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">Language</p>
                    <p className="font-medium">{course.language}</p>
                  </div>
                </div>

                {course.certificate && (
                  <div className="flex items-center gap-3">
                    <Icons
                      iconName="certificate"
                      className="text-gray-500 h-5 w-5"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Certificate</p>
                      <p className="font-medium">{course.certificate}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-gray-200 mt-8 border-t pt-6">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-full rounded-xl px-4 py-3 font-bold text-white transition duration-200"
                  bgBtn="Enroll Now"
                  onClick={handleEnrollClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
