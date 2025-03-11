import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/png/dashboard-logo.png'
import profile from '../../assets/images/png/profile-photo.png'
import Paragraph from './Paragraph'
import Icons from './Icons'
import {
  ADMIN_DASHBOARD_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
} from '../../utils/constant'

const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef(null)
  const navigation = useLocation()
  const path = navigation.pathname
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative border-b border-black border-opacity-5 bg-[#fa7f7f0c]">
      <div className="container mx-auto max-w-[1920px] p-2 sm:px-10 sm:py-4">
        <nav className="flex justify-between">
          <Link
            to={
              path === ADMIN_DASHBOARD_ROUTE
                ? ADMIN_DASHBOARD_ROUTE
                : path === STUDENT_DASHBOARD_ROUTE && STUDENT_DASHBOARD_ROUTE
            }
            className="flex items-center gap-1"
          >
            <img src={logo} alt="logo" className="max-w-[35px] md:max-w-max" />
            <Paragraph
              className="!text-lg hidden md:block"
              text={
                <>
                  <span className="">Accountants</span>
                  <span className="ps-1 text-orange-red">Club</span>
                </>
              }
            />
          </Link>
          <div className="relative flex gap-3 sm:gap-5">
            {/* Notification Button */}
            <button className="flex w-[36px] items-center justify-center rounded-md bg-black bg-opacity-5 sm:h-12 sm:w-12">
              <Icons iconName="notification" className="size-4" />
            </button>

            {/* Profile Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="relative">
              <img
                height={48}
                width={48}
                src={profile}
                className="w-[36px] rounded-xl sm:w-full"
                alt="profile"
              />
            </button>

            {/* Logout Popup */}
            {isOpen && (
              <div
                ref={popupRef}
                className="absolute right-0 top-14 z-50 w-60 rounded-xl bg-white p-4 !pb-0 shadow-job-card"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={profile}
                    className="h-12 w-12 rounded-xl"
                    alt="User"
                  />
                  <p className="mt-2 font-semibold">Yogesh Sharma</p>
                </div>
                <div className="mt-3">
                  <button className="px-4 py-2 text-left text-[14px] text-black opacity-70 transition-all duration-300 ease-in-out hover:text-orange-red md:text-[16px]">
                    Settings
                  </button>
                  <hr className="bg-black opacity-70" />
                  <Link
                    to="/"
                    className="inline-block px-4 py-3 text-left text-[14px] text-black opacity-70 transition-all duration-300 ease-in-out hover:text-orange-red md:text-[16px]"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default DashboardNav
