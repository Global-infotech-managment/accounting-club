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
  const [showTotalScore, setShowTotalScore] = useState(false)

  return (
    <div className="flex flex-col xl:h-screen">
      <DashboardNav />
      <div className="flex flex-grow flex-col xl:min-h-screen xl:flex-row xl:overflow-auto">
        {/* Sidebar */}
        <div className="h-full p-2 sm:p-4 md:p-[18px] overflow-y-scroll xl:h-screen xl:w-5/12 xl:max-w-[400px]">
          <StudentCourseDetailSidebar />
        </div>

        {/* Main Content */}
        <div className="mb-20 w-full overflow-auto">
          <div className="min-h-full p-2 sm:p-4 ">
            <div className="rounded-3xl bg-[#F7F7F7] px-4 py-5">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <Heading
                  className={'!text-[18px] font-semibold lg:!text-[20px]'}
                  firstText={
                    showTotalScore
                      ? 'My Test Score'
                      : 'Lesson -3 : Shortcut Keys in Tally Primes'
                  }
                />
                {showTotalScore === false && (
                  <div className="mt-3 flex items-center gap-4 md:mt-0">
                    {classTest ? (
                      <>
                        <Button
                          className={'rounded-[10px] !py-2 px-5 !text-[14px]'}
                          transparentBtn={'Go To Lesson'}
                          onClick={() => setClassTest(false)}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          className={'rounded-[10px] !py-2 px-5 !text-[14px]'}
                          transparentBtn={'Class Test'}
                          onClick={() => setClassTest(true)}
                        />

                        <Button
                          className={'!text-sm rounded-[10px] !py-2 px-5'}
                          bgBtn={'Study Material'}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
              {classTest ? (
                <>
                  <StudentTestAgree
                    setShowTotalScore={setShowTotalScore}
                    showTotalScore={showTotalScore}
                  />
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
