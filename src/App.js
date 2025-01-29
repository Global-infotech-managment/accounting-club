import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import StudentSignUp from './components/pages/StudentSignUp'
import NotFound from './components/pages/NotFound'
import StudentLogin from './components/pages/StudentLogin'
import {
  COURSES_ROUTE,
  HOME_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_SIGNUP_ROUTE,
} from './utils/constant'
import CoursesPage from './components/pages/CoursesPage'
function App() {
  return (
    <div className="mx-auto max-w-[1920px]">
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={COURSES_ROUTE} element={<CoursesPage />} />
        <Route path={STUDENT_SIGNUP_ROUTE} element={<StudentSignUp />} />
        <Route path={STUDENT_LOGIN_ROUTE} element={<StudentLogin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
