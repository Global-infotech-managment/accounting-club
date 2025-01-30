import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import {
  COURSES_ROUTE,
  EMPLOYER_LOGIN_ROUTE,
  EMPLOYER_REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_SIGNUP_ROUTE,
} from './utils/constant'
import CoursesPage from './components/pages/CoursesPage'
import StudentSignUp from './components/pages/student/StudentSignUp'
import StudentLogin from './components/pages/student/StudentLogin'
import EmployerLogin from './components/pages/employer/EmployerLogin'
import EmployerSignUp from './components/pages/employer/EmployerSignUp'
import ForgetPassword from './components/pages/ForgetPassword'
function App() {
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
