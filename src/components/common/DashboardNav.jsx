import React from 'react'
import logo from '../../assets/images/png/dashboard-logo.png'
import profile from '../../assets/images/png/profile-photo.png'
import Paragraph from './Paragraph'
import Icons from './Icons'
import { Link } from 'react-router-dom'
import { STUDENT_DASHBOARD_ROUTE } from '../../utils/constant'
const DashboardNav = () => {
  return (
    <div className="border-b border-black border-opacity-5">
      <div className="container mx-auto max-w-[1920px] p-2 sm:px-10 sm:py-6">
        <nav className="flex justify-between">
          <Link
            to={STUDENT_DASHBOARD_ROUTE}
            className="flex items-center gap-1"
          >
            <img src={logo} alt="logo" className="max-w-[35px] md:max-w-max" />
            <Paragraph
              className="hidden !text-lg md:block"
              text={
                <>
                  <span className="">Accountants</span>
                  <span className="ps-1 text-orange-red">Club</span>
                </>
              }
            />
          </Link>
          <div className="flex gap-3 sm:gap-5">
            <button className="flex w-[36px] items-center justify-center bg-black bg-opacity-5 sm:h-12 sm:w-12">
              <Icons iconName="notification" className="size-4" />
            </button>
            <button>
              <img
                height={48}
                width={48}
                src={profile}
                className="w-[36px] sm:w-full"
                alt="logo"
              />
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default DashboardNav
