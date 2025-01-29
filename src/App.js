import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import StudentSignUp from './components/pages/StudentSignUp'
import NotFound from './components/pages/NotFound'
function App() {
  return (
    <div className="mx-auto max-w-[1920px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentSignUp" element={<StudentSignUp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
