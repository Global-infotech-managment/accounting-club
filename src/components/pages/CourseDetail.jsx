import React from 'react'
import courseImage from '../../assets/images/png/course-details-hero.png'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Icons from '../common/Icons'
const CourseDetail = () => {
  return (
    <div className="container max-w-[1184px] pt-20">
      <div className="flex flex-wrap">
        <div className="w-8/12">
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
        <div className="w-4/12 ps-12">
          <div className="flex items-end justify-between">
            <div className="flex items-end">
              <Heading className="!text-black" middleText="50.02" />
              <span className="ps-1 font-semibold">USD</span>
            </div>
          </div>
          <Paragraph className="!text-red-500" text="40% Off" />
          <div className="flex rounded-[10px] border border-black border-opacity-20 px-5">
            <div className="flex w-6/12 gap-2.5 border-r border-black border-opacity-20">
              <Icons iconName="bookImage" className="size-4" />
              <div>
                <Paragraph className="!text-red-500" text="Lessons" />
                <Paragraph className="!text-red-500" text="15" />
              </div>
            </div>
            <div className="flex w-6/12 gap-2.5">
              <Icons iconName="difficulity" className="size-4" />
              <div>
                <Paragraph className="!text-red-500" text="Difficulity" />
                <Paragraph className="!text-red-500" text="Moderate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
