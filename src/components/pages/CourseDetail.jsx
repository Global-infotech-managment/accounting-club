import React from 'react'
import courseImage from '../../assets/images/png/course-details-hero.png'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Icons from '../common/Icons'
import Button from '../common/Button'
import StudentEllipse from '../../assets/images/png/second-hero-ellipse.png'
import bookImage from '../../assets/images/png/online-book.png'
import { useParams } from 'react-router-dom'
import { onlineCoursesData } from '../../utils/helper'
import { PAYMENT_METHOD_ROUTE } from '../../utils/constant'
import ReactPlayer from 'react-player'
import { useQuery } from '@tanstack/react-query'
import { findCourseById } from '../../services/course/course.service'

const CourseDetail = () => {
  const { slug } = useParams()
  console.log('Slug ', slug)
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => findCourseById(slug),
    enabled: !!slug, // only run query if slug exists
  })
  // const course = onlineCoursesData.find(
  //   (course) => course.heading.replaceAll(' ', '-').toLowerCase() === slug
  // )

  if (!course) {
    return <div className="text-red-500 text-center">Course not found</div>
  }
  return (
    <div className="position-relative mb-10 md:mb-16 lg:mb-[100px]">
      <img
        className="pointer-events-none absolute bottom-72 left-0 max-xl:hidden"
        src={StudentEllipse}
        alt="student ellipse"
      />
      <img
        className="pointer-events-none absolute bottom-0 right-0 max-xl:hidden"
        src={bookImage}
        alt="student ellipse"
      />
      <div className="container max-w-[1184px] pt-5 sm:pt-10 lg:pt-14 xl:pt-20">
        <div className="flex flex-wrap px-4 sm:px-0">
          <div className="lg:w-8/12 lg:pe-12">
            <ReactPlayer
              url={course?.file?.url}
              className="max-h-[438px] !w-full overflow-hidden rounded-[24px] object-cover lg:max-w-[677px]"
            />
            <Heading
              className="mb-3 pt-4 md:pt-6 xl:mb-4"
              middleText={
                <>
                  <span className="text-red-500 capitalize">{course.name}</span>
                </>
              }
            />
            <Paragraph className="text-black" text={course.description} />
          </div>
          <div className="mt-6 w-full md:mt-10 lg:w-4/12">
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
                  <Paragraph className="capitalize" text={course.difficulty} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="students" className="size-4" />
              <Paragraph
                className="!text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">Students:</span>
                    <span className="font-medium">{course.students}</span>
                  </>
                }
              />
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="language" className="size-4" />
              <Paragraph
                className="!text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </>
                }
              />
            </div>
            {/* <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="subtitle" className="size-4 w-2/12" />
              <Paragraph
                className="w-10/12 !text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">Subtitles:</span>
                    <span className="font-medium">{course.subtitle}</span>
                  </>
                }
              />
            </div> */}
            {/* <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="duration" className="size-4" />
              <Paragraph
                className="!text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </>
                }
              />
            </div> */}
            <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="resources" className="size-4" />
              <Paragraph
                className="!text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">
                      Additional Resources:
                    </span>
                    <span className="font-medium">
                      {course.file?.url} Files
                    </span>
                  </>
                }
              />
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <Icons iconName="certificate" className="size-4" />
              <Paragraph
                className="!text-lg"
                text={
                  <>
                    <span className="pe-1 !opacity-80">Certificate:</span>
                    <span className="font-medium"> {course.certificate}</span>
                  </>
                }
              />
            </div>
            <div className="mt-6 border-t border-black border-opacity-10 pt-8">
              <Button
                className="w-full !rounded-xl max-sm:px-3 max-sm:py-2 max-sm:text-center"
                bgBtn="Enroll Now"
                path={`${PAYMENT_METHOD_ROUTE.replace(':courseId', course.id)}`}
                // path={`${PAYMENT_METHOD_ROUTE}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
