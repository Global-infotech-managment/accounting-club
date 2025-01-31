import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Paragraph from '../../common/Paragraph'
import Icons from '../../common/Icons'
import { studentSidebarItems } from '../../../utils/helper'

const StudentSidebar = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const activeSidebar = queryParams.get('activeSidebar') || 'dashboard' // Default to 'dashboard'

  return (
    <div className="h-full border-r border-black border-opacity-5 lg:px-10 px-4 md:py-8 py-4">
      {studentSidebarItems.map((item, index) => {
        const isActive = activeSidebar === item.text
        return (
          <Link
            key={index}
            to={`/student-dashboard?activeSidebar=${item.text}`} // Ensure text is used
            className={`group mt-4 flex items-center gap-3 rounded-xl sm:px-6 p-2 sm:py-4 transition-all duration-300 hover:bg-primary ${
              isActive ? 'active_sidebar_link bg-primary text-white' : ''
            }`}
          >
            <Icons
              iconName={item.icon}
              className={`size-4 transition-all duration-300 ${
                isActive ? 'text-white' : 'text-primary'
              }`}
            />
            <Paragraph
              className={`text-nowrap !text-lg lg:block hidden transition-all duration-300 ${
                isActive ? 'text-white' : 'text-primary group-hover:text-white'
              }`}
              text={item.text}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default StudentSidebar
