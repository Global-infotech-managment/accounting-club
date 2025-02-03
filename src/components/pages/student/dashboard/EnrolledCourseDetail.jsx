import React, { useState } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import DashboardNav from '../../../common/DashboardNav'
import StudentCourseDetailSidebar from './StudentCourseDetailSidebar'
import StudentCourseDetailVideo from './StudentCourseDetailVideo'
import StudentTestAgree from './StudentTestAgree'
import Heading from '../../../common/Heading'
import Button from '../../../common/Button'

const EnrolledCourseDetail = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'
  const [classTest, setClassTest] = useState(false)
  // Normalize sidebar key
  activeSidebar = activeSidebar.replace(/~/g, '-')

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex min-h-screen flex-grow overflow-auto">
        {/* Sidebar */}
        <div className="h-full min-h-screen p-[28px] lg:w-3/12 lg:max-w-[400px]">
          <StudentCourseDetailSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="min-h-full p-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">
            <div className="rounded-3xl bg-[#F7F7F7] px-4 py-5">
              <div className="flex items-center justify-between">
                <Heading
                  className={'!text-xl font-semibold'}
                  firstText={'Lesson -3 : Shortcut Keys in Tally Prime'}
                />
                <div className="flex items-center gap-4">
                  {classTest ? (
                    <>
                      <Button
                        className={'rounded-[10px] !py-2 px-5 !text-sm'}
                        transparentBtn={'Go To Lesson'}
                        onClick={() => setClassTest(false)}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        className={'rounded-[10px] !py-2 px-5 !text-sm'}
                        transparentBtn={'Class Test'}
                        onClick={() => setClassTest(true)}
                      />

                      <Button
                        className={'rounded-[10px] !py-2 px-5 !text-sm'}
                        bgBtn={'Study Material'}
                      />
                    </>
                  )}
                </div>
              </div>
              {classTest ? (
                <>
                  <StudentTestAgree />
                </>
              ) : (
                <>
                  <StudentCourseDetailVideo />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrolledCourseDetail
