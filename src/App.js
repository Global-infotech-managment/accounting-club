import './App.css'
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import {
  ABOUT_ROUTE,
  ADD_VIDEO_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_LOGIN_ROUTE,
  CONTACT_ROUTE,
  UPDATE_COURSE,
  COURSES_DETAIL_ROUTE,
  COURSES_ROUTE,
  EMPLOYER_LOGIN_ROUTE,
  EMPLOYER_REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  JOBS_DETAIL_ROUTE,
  PAYMENT_METHOD_ROUTE,
  POST_RESUME_ROUTE,
  SEARCH_ACCOUNTING_JOBS_ROUTE,
  SEARCH_WORK_FROM_HOME_JOBS_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_SIGNUP_ROUTE,
} from './utils/constant'
import CoursesPage from './components/pages/CoursesPage'
import StudentSignUp from './components/pages/student/StudentSignUp'
import StudentLogin from './components/pages/student/StudentLogin'
import EmployerLogin from './components/pages/employer/EmployerLogin'
import EmployerSignUp from './components/pages/employer/EmployerSignUp'
import ForgetPassword from './components/pages/ForgetPassword'
import CoursesInfo from './components/CoursesInfo'
import Dashboard from './components/pages/student/dashboard/Dashboard'
import EnrolledCourseDetail from './components/pages/student/dashboard/EnrolledCourseDetail'
import PostResume from './components/pages/student/PostResume'
import SearchAccountingJob from './components/pages/student/SearchAccountingJob'
import PaymentMethod from './components/common/PaymentMethod'
import JobList from './components/JobList'
import JobDetail from './components/pages/JobDetail'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'
import AdminMain from './components/pages/AdminMain'
import AdminLogin from './components/AdminLogin'
import useAuth from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateCourse from './components/pages/admin/UpdateCourse'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={true}
          visibleToasts={3}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'inherit',
              fontSize: '14px',
            },
          }}
        />
      </QueryClientProvider>
    </Provider>
  )
}

function AppContent() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="mx-auto max-w-[1920px]">
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={ABOUT_ROUTE} element={<AboutUs />} />
        <Route path={CONTACT_ROUTE} element={<ContactUs />} />
        <Route path={COURSES_ROUTE} element={<CoursesPage />} />
        <Route path={STUDENT_SIGNUP_ROUTE} element={<StudentSignUp />} />
        <Route path={STUDENT_LOGIN_ROUTE} element={<StudentLogin />} />
        <Route path={EMPLOYER_LOGIN_ROUTE} element={<EmployerLogin />} />
        <Route path={EMPLOYER_REGISTER_ROUTE} element={<EmployerSignUp />} />
        <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgetPassword />} />
        <Route path={COURSES_DETAIL_ROUTE} element={<CoursesInfo />} />
        <Route path={JOBS_DETAIL_ROUTE} element={<JobDetail />} />
        <Route
          path={STUDENT_DASHBOARD_ROUTE}
          element={isAuthenticated ? <Dashboard /> : <StudentLogin />}
        />
        <Route path={POST_RESUME_ROUTE} element={<PostResume />} />
        <Route path={PAYMENT_METHOD_ROUTE} element={<PaymentMethod />} />
        <Route path={SEARCH_WORK_FROM_HOME_JOBS_ROUTE} element={<JobList />} />
        <Route path={ADMIN_LOGIN_ROUTE} element={<AdminLogin />} />
        <Route path={UPDATE_COURSE} element={<UpdateCourse />} />
        {/* <Route
          path={ADMIN_DASHBOARD_ROUTE}
          element={isAuthenticated ? <AdminMain /> : <AdminLogin />}
        /> */}
        <Route
          path={ADMIN_DASHBOARD_ROUTE}
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminMain />
            </ProtectedRoute>
          }
        />
        <Route
          path={SEARCH_ACCOUNTING_JOBS_ROUTE}
          element={<SearchAccountingJob />}
        />
        <Route
          path={`${STUDENT_DASHBOARD_ROUTE}/:slug`}
          element={<EnrolledCourseDetail />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
