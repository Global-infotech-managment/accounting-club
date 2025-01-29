import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import StudentSignUp from './components/pages/StudentSignUp'
function App() {
  return (
    <div className="mx-auto max-w-[1920px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentSignUp" element={<StudentSignUp />} />
      </Routes>
    </div>
  )
}

export default App
