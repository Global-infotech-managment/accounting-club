import React from 'react'
import courseImage from '../../assets/images/png/course-details-hero.png'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Icons from '../common/Icons'
import Button from '../common/Button'
const CourseDetail = () => {
  return (
    <div className="container max-w-[1184px] pt-20">
      <div className="flex flex-wrap">
        <div className="w-8/12 pe-12">
          <img
            className="w-full object-cover"
            src={courseImage}
            alt="course image"
          />
          <Heading
            className="mb-3 pt-6 xl:mb-4"
            middleText={
              <>
                <span className="text-red-500"> Goods & Services</span>
                <span className="ps-1 text-black">Tax (GST) Course</span>
              </>
            }
          />
          <Paragraph
            className="text-black"
            text="The Goods & Services Tax (GST) Course offers a structured learning experience, covering essential GST concepts, legal framework, and practical applications. Whether you're a business owner, accountant, or student, this course simplifies complex taxation rules, helping you understand GST registration, invoicing, input tax credit, and return filing. With real-world examples and hands-on exercises, you’ll gain the confidence to manage GST compliance efficiently."
          />
          <Paragraph
            className="pt-4 text-black"
            text="From understanding GST applicability to mastering tax calculations and filing accurate returns, this course ensures a step-by-step approach to learning. Explore key topics like GST rates, e-way bills, reverse charge mechanisms, and common filing errors. By the end of the course, you'll be equipped with the knowledge and skills needed to navigate the GST system seamlessly and stay compliant with tax regulations."
          />
        </div>
        <div className="w-4/12">
          <div className="flex items-end justify-between">
            <div className="flex items-end">
              <Heading className="!text-black" middleText="50.02" />
              <span className="ps-1 font-semibold">USD</span>
            </div>
            <Paragraph className="!text-red-500" text="40% Off" />
          </div>
          <div className="mt-2 flex rounded-[10px] border border-black border-opacity-20 px-5">
            <div className="flex w-6/12 items-center gap-2.5 border-r border-black border-opacity-20">
              <Icons iconName="bookImage" className="size-4" />
              <div className="py-2.5">
                <Paragraph
                  className="!text-red-500 opacity-80"
                  text="Lessons"
                />
                <Paragraph className="!text-red-500" text="15" />
              </div>
            </div>
            <div className="ms-5 flex w-6/12 items-center gap-2.5">
              <Icons iconName="difficulity" className="size-4" />
              <div className="py-2.5">
                <Paragraph
                  className="!text-red-500 opacity-80"
                  text="Difficulity"
                />
                <Paragraph className="!text-red-500" text="Moderate" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="students" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">Students:</span>
                  <span className="font-medium">4,000</span>
                </>
              }
            />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="language" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">Language:</span>
                  <span className="font-medium">English</span>
                </>
              }
            />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="subtitle" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">Subtitles:</span>
                  <span className="font-medium">
                    English, Hindi, French, Italian, Russian, Polish, Dutch
                  </span>
                </>
              }
            />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="duration" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">Duration:</span>
                  <span className="font-medium"> 15h 32min</span>
                </>
              }
            />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="resources" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">
                    Additional Resources:
                  </span>
                  <span className="font-medium">12 Files</span>
                </>
              }
            />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Icons iconName="certificate" className="size-4" />
            <Paragraph
              className="!text-red-500 !text-lg"
              text={
                <>
                  <span className="pe-1 !opacity-80">Certificate:</span>
                  <span className="font-medium">
                    {' '}
                    Upon completion of the courses
                  </span>
                </>
              }
            />
          </div>
          <div className='pt-8 mt-6 border-t border-black border-opacity-10'>
            <Button
              className="max-sm:px-3 max-sm:py-2 max-sm:text-center w-full !rounded-xl"
              bgBtn="Enroll Now"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
