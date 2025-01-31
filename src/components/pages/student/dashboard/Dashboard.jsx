import { useLocation, useParams } from 'react-router-dom'
import EnrolledCourseDetail from './EnrolledCourseDetail'
import DashboardNav from '../../../common/DashboardNav'
import StudentSidebar from '../StudentSidebar'
import DashboardUi from './DashboardUi'
import MyCoursesUi from './MyCoursesUi'
import MyCertificateUi from './MyCertificateUi'
import JobPlacement from './JobPlacement'
import JobWork from './JobWork'
import Support from './Support'
import NewsAndBlogs from './NewsAndBlogs'

const Dashboard = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { slug } = useParams() // Extract slug dynamically

  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'
  activeSidebar = activeSidebar.replace(/~/g, '-')

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-hidden">
        <div className="h-full lg:w-3/12 lg:max-w-[400px]">
          <StudentSidebar />
        </div>

        <div className="flex-grow overflow-auto">
          <div className="min-h-full p-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">
            {slug ? (
              <EnrolledCourseDetail />
            ) : (
              <>
                {activeSidebar === 'dashboard' && <DashboardUi />}
                {activeSidebar === 'my-course' && <MyCoursesUi />}
                {activeSidebar === 'my-certificate' && <MyCertificateUi />}
                {activeSidebar === 'job-placement' && <JobPlacement />}
                {activeSidebar === 'job-work' && <JobWork />}
                {activeSidebar === 'support' && <Support />}
                {activeSidebar === 'news---blog' && <NewsAndBlogs />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
