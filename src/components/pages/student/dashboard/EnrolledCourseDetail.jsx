import React from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import DashboardNav from '../../../common/DashboardNav'
import StudentCourseDetailSidebar from './StudentCourseDetailSidebar'
import StudentCourseDetailVideo from './StudentCourseDetailVideo'

const EnrolledCourseDetail = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'

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
            <StudentCourseDetailVideo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrolledCourseDetail
