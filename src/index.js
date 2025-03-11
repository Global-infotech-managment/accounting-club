import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import JourneyStart from './components/JourneyStart'

const RootComponent = () => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(
    !location.pathname.includes('dashboard')
  )

  useEffect(() => {
    setShowNavbar(!location.pathname.includes('dashboard'))
  }, [location.pathname])

  return (
    <div className='relative overflow-hidden '>
      {showNavbar &&(
         <div className='h-[61px] md:h-[93px]'>
        <div className='fixed w-full top-0 bg-white z-[999]'>{showNavbar && <Navbar />}</div>
      </div>
      )}
     
      <App />
      <div className={`relative ${!showNavbar && 'hidden'}`}>
        <JourneyStart />
        <Footer />
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
