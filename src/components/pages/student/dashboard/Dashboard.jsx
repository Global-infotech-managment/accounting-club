import React from 'react'
import DashboardNav from '../../../common/DashboardNav'
import StudentSidebar from '../StudentSidebar'

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="h-full lg:w-3/12 lg:max-w-[400px]">
          <div className="h-full overflow-auto">
            <StudentSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="min-h-full px-10 py-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nobis nulla sed repudiandae, debitis corrupti, amet quis quas sunt
            sequi cupiditate consequatur, magni reiciendis veniam ab nostrum
            accusamus odit fugit. Lorem ipsum dolor sit amet consectetur...
            lorem10000
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
