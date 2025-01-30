import React from 'react'
import { Link } from 'react-router-dom'
import Paragraph from '../../common/Paragraph'
import Icons from '../../common/Icons'
import { studentSidebarItems } from '../../../utils/helper'
const StudentSidebar = () => {
  return (
    <div className="border-r border-black border-opacity-5 px-10 py-8 h-full">
      {studentSidebarItems.map((item, index) => (
        <Link
          key={index}
          className="group mt-4 flex items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 hover:bg-primary"
          to={item.path}
        >
          <Icons iconName={item.icon} className="size-4 text-primary" />
          <Paragraph
            className="!text-lg text-primary transition-all duration-300 group-hover:text-white"
            text={item.text}
          />
        </Link>
      ))}
    </div>
  )
}

export default StudentSidebar
