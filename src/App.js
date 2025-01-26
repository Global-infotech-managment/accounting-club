import './App.css'
import Navbar from './components/common/Navbar'
import Hero from './components/Hero'
import CompanyRank from './components/CompanyRank'
import AboutUs from './components/AboutUs'
import OnlineCourse from './components/OnlineCourse'
import StudentSay from './components/StudentSay'
import JourneyStart from './components/JourneyStart'
import Footer from './components/common/Footer'
import ChooseUs from './components/ChooseUs'

function App() {
  return (
    <div className="mx-auto max-w-[1920px]">
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyRank />
      </div>
      <AboutUs />
      <OnlineCourse />
      <ChooseUs />
      <StudentSay />
      <div className="relative">
        <JourneyStart />
        <Footer />
      </div>
    </div>
  )
}

export default App
