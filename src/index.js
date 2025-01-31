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
    <>
      {showNavbar && <Navbar />}
      <App />
      <div className={`relative ${!showNavbar && 'hidden'}`}>
        <JourneyStart />
        <Footer />
      </div>
    </>
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
