import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import JourneyStart from './components/JourneyStart'

const root = ReactDOM.createRoot(document.getElementById('root'))
const locationPath = window.location.pathname
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {!locationPath.includes('dashboard') && <Navbar />}
      <App />
      <div
        className={`relative ${locationPath.includes('dashboard') && 'hidden'}`}
      >
        <JourneyStart />
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
