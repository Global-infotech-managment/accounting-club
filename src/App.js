import './App.css'
import Navbar from './components/common/Navbar'
import Hero from './components/Hero'
import CompanyRank from './components/CompanyRank'
import AboutUs from './components/AboutUs'
import OnlineCourse from './components/OnlineCourse'
import StudentSay from './components/StudentSay'
import JourneyStart from './components/JourneyStart'

function App() {
  return (
    <>
      <div className='overflow-hidden'>
        <Navbar />
        <Hero />
        <CompanyRank />
      </div>
      <AboutUs />
      <OnlineCourse />
      <StudentSay />
      <JourneyStart />
    </>
  )
}

export default App