import React from 'react'
import Icons from '../../../common/Icons'
import { Link, useParams } from 'react-router-dom'
import { STUDENT_DASHBOARD_ROUTE } from '../../../../utils/constant'
import Paragraph from '../../../common/Paragraph'
import Heading from '../../../common/Heading'
import Button from '../../../common/Button'
import AccordionTick from '../../../common/AccordionTick'

const StudentCourseDetailSidebar = () => {
  const totalCourses = 5
  const completedCourses = 3
  const { slug } = useParams()
  const completionPercentage = (completedCourses / totalCourses) * 100
  return (
    <>
      <div className="mb-[17px] rounded-3xl bg-[#F7F7F7] px-4 py-5">
        <div className="flex items-center justify-between">
          <Link
            to={STUDENT_DASHBOARD_ROUTE}
            className="flex items-center gap-1 text-black"
          >
            <Icons iconName={'leftArrow'} />
            <Paragraph className={'text-[10px]'} text={'Go To Dashboard'} />
          </Link>
          <Link
            to={STUDENT_DASHBOARD_ROUTE}
            className="flex items-center gap-1 text-black"
          >
            <Icons iconName={'refreshCircle'} />
            <Paragraph className={'text-[10px]'} text={'Change Course'} />
          </Link>
        </div>
        <Heading
          firstText={'Accounts Expert'}
          className={'mb-[3px] mt-[10px] !text-base'}
        />
        <Paragraph
          text={'Business Accounting with Tally Prime'}
          className={'mb-[10px] !text-xs'}
        />
        <div className="mb-[21px] flex items-center justify-between">
          <div className="h-[6px] w-full min-w-[100px] overflow-hidden rounded-[20px] bg-[#00000008]">
            <div
              className="h-full rounded-[20px] bg-primary transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <Paragraph
            className="ms-[10px] text-nowrap"
            text={`${completionPercentage}% Complete`}
          />
        </div>
        <Paragraph
          className={'mb-[13px] font-medium text-primary'}
          text={'Total Score : 33/50'}
        />
        <Button bgBtn={'Live classes'} className={'w-full rounded-[10px]'} />
      </div>
      <Heading
        firstText={'Content Playlist'}
        className={'!text-base font-semibold'}
      />
      <div className="rounded-3xl bg-[#F7F7F7] px-4 py-5">
        <AccordionTick />
      </div>
    </>
  )
}

export default StudentCourseDetailSidebar
