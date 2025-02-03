import React from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import DashboardNav from '../../../common/DashboardNav'
import StudentSidebar from '../StudentSidebar'
import DashboardUi from './DashboardUi'
import MyCoursesUi from './MyCoursesUi'
import MyCertificateUi from './MyCertificateUi'
import JobPlacement from './JobPlacement'
import JobWork from './JobWork'
import Support from './Support'
import NewsAndBlogs from './NewsAndBlogs'
import EnrolledCourseDetail from './EnrolledCourseDetail'

const Dashboard = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'

  // Normalize sidebar key
  activeSidebar = activeSidebar.replace(/~/g, '-')

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="h-full lg:w-3/12 lg:max-w-[400px]">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="min-h-full p-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {activeSidebar === 'dashboard' && <DashboardUi />}
                    {activeSidebar === 'my-course' && <MyCoursesUi />}
                    {activeSidebar === 'my-certificate' && <MyCertificateUi />}
                    {activeSidebar === 'job-placement' && <JobPlacement />}
                    {activeSidebar === 'job-work' && <JobWork />}
                    {activeSidebar === 'support' && <Support />}
                    {activeSidebar === 'news---blog' && <NewsAndBlogs />}
                  </>
                }
              />
              <Route path=":slug" element={<EnrolledCourseDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
