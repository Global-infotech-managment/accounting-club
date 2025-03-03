import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Paragraph from '../../common/Paragraph'
import Icons from '../../common/Icons'

const AdminSidebar = ({ sidebarOptions }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const activeSidebar = queryParams.get('activeSidebar') || 'dashboard'

  return (
    <div className="h-full border-r border-black border-opacity-5 p-2 sm:p-4 md:p-8 lg:p-10">
      {sidebarOptions.map((item, index) => {
        const isActive =
          activeSidebar ===
          item.text.replaceAll('&', '-').replaceAll(' ', '~').toLowerCase()
        return (
          <Link
            key={index}
            to={`/admin-dashboard?activeSidebar=${item.text.replaceAll('&', '-').replaceAll(' ', '~').toLowerCase()}`}
            className={`group mt-4 flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-primary sm:px-6 sm:py-4 ${
              isActive ? 'active_sidebar_link bg-primary text-white' : ''
            }`}
          >
            <Icons
              iconName={item.icon}
              className={`size-4 min-h-5 min-w-5 transition-all duration-300 ${
                isActive ? 'text-white' : 'text-primary'
              }`}
            />
            <Paragraph
              className={`!text-lg hidden text-nowrap transition-all duration-300 lg:block ${
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

export default AdminSidebar
