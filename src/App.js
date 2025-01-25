import './App.css'
import Navbar from './components/common/Navbar'
import Hero from './components/Hero'
import CompanyRank from './components/CompanyRank'
import AboutUs from './components/AboutUs'
import OnlineCourse from './components/OnlineCourse'

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
    </>
  )
}

export default App