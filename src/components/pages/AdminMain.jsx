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
        <div className="h-full lg:w-3/12 lg:max-w-[400px]">
          <AdminSidebar sidebarOptions={adminSidebarOptions} />
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="min-h-full p-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {activeSidebar === 'dashboard' && <AdminDashboardUi />}
                    {activeSidebar === 'add-section' && <AddSection />}
                    {activeSidebar === 'add-courses' && <AdminCoursesAdd />}
                    {activeSidebar === 'all-students' && <AllStudent />}
                    {activeSidebar === 'all-employers-' && <AllEmployers />}
                    {activeSidebar === 'all-courses' && <AllCourses />}
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
