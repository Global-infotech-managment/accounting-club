import React from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import DashboardNav from '../common/DashboardNav'
import EnrolledCourseDetail from './student/dashboard/EnrolledCourseDetail'
import { adminSidebarOptions } from '../../utils/helper'
import AdminSidebar from './admin/AdminSidebar'
import AdminDashboardUi from './admin/AdminDashboardUi'
import AllStudent from './admin/AllStudent'
import AllEmployers from './admin/AllEmployers'
import AllCourses from './admin/AllCourses'
import AdminCoursesAdd from './admin/AdminCoursesAdd'
import AddSection from './admin/AddSection'
import AddVideo from './admin/AddVideo'
import AddTest from './admin/AddTest'
import CreateTest from './admin/CreateTest'
import UpdateCourse from './admin/UpdateCourse'
import UpdateSection from './admin/UpdateSection'
import UpdateVideo from './admin/UpdateVideo'
import UpdateTest from './admin/UpdateTest'
import UpdateLesson from './admin/UpdateLesson'
import StudentOverview from './admin/StudentOverview'
import StudentLessonProgress from './admin/StudentLessonProgress'
import AllTest from './admin/AllTest'
import AddQuestion from './admin/AddQuestion'
import AllChapter from './admin/AllChapter'

const AdminMain = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'

  // Normalize sidebar key
  activeSidebar = activeSidebar.replace(/~/g, '-')

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-auto">
        {/* Sidebar */}
        <div className="h-full lg:w-3/12 lg:max-w-[250px] bg-[#fa7f7f10]">
          <AdminSidebar sidebarOptions={adminSidebarOptions} />
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="min-h-full p-2 sm:p-4 md:p-6 lg:px-6 lg:py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {activeSidebar === 'dashboard' && <AdminDashboardUi />}
                    {activeSidebar === 'add-section' && <AddSection />}
                    {activeSidebar === 'add-courses' && <AdminCoursesAdd />}
                    {activeSidebar === 'add-video' && <AddVideo />}
                    {activeSidebar === 'add-test' && <AddTest />}
                    {activeSidebar === 'add-question' && <AddQuestion/>}
                    {activeSidebar === 'create-test' && <CreateTest />}
                    {activeSidebar === 'all-students' && <AllStudent />}
                    {activeSidebar === 'all-chapters' && <AllChapter />}
                    {activeSidebar === 'all-employers-' && <AllEmployers />}
                    {activeSidebar === 'all-courses' && <AllCourses />}
                    {activeSidebar === 'update-course' && <UpdateCourse />}
                    {activeSidebar === 'update-section' && <UpdateSection />}
                    {activeSidebar === 'update-video' && <UpdateVideo />}
                    {activeSidebar === 'update-test' && <UpdateTest />}
                    {activeSidebar === 'update-lesson' && <UpdateLesson />}
                    {activeSidebar === 'all-test' && <AllTest />}
                    {activeSidebar === 'student-overview' && <StudentOverview />}
                    {activeSidebar === 'student-progress' && <StudentLessonProgress />}
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

export default AdminMain
