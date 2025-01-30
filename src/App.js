import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import {
  COURSES_DETAIL_ROUTE,
  COURSES_ROUTE,
  EMPLOYER_LOGIN_ROUTE,
  EMPLOYER_REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
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
import { useEffect } from 'react'
function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="mx-auto max-w-[1920px]">
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={COURSES_ROUTE} element={<CoursesPage />} />
        <Route path={STUDENT_SIGNUP_ROUTE} element={<StudentSignUp />} />
        <Route path={STUDENT_LOGIN_ROUTE} element={<StudentLogin />} />
        <Route path={EMPLOYER_LOGIN_ROUTE} element={<EmployerLogin />} />
        <Route path={EMPLOYER_REGISTER_ROUTE} element={<EmployerSignUp />} />
        <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgetPassword />} />
        <Route path={COURSES_DETAIL_ROUTE} element={<CoursesInfo />} />
        <Route path={STUDENT_DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
