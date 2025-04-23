import React from 'react'
import { Routes, Route, useLocation, useParams, Link } from 'react-router-dom'
import DashboardNav from '../../../common/DashboardNav'
import StudentSidebar from '../StudentSidebar'
import { studentSidebarItems } from '../../../../utils/helper'
import Input from '../../../common/Input'
import { Dropdown } from '../../../common/Dropdown'
import Button from '../../../common/Button'
import profile from "../../../../assets/images/png/profile-photo.png"
import updateIcon from "../../../../assets/images/png/update-icon.png"

const EditProfile = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard'
  
  // Check if current route is update-profile
  const isEditProfileRoute = location.pathname.includes('update-profile')

  // Normalize sidebar key
  activeSidebar = activeSidebar.replace(/~/g, '-')

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-auto">
        {/* Sidebar */}
        <div className="h-full lg:w-3/12 lg:max-w-[250px] bg-[#fa7f7f0c]">
          <StudentSidebar sidebarOptions={studentSidebarItems} />
        </div>

      <div className='bg-[#F7F7F7] mt-4 sm:mt-7 mx-4 sm:mx-7 w-full p-4 rounded-xl'>
      <p className="mb-2 w-full border-b   border-[#DFDFDF] pb-2 text-center text-[16px] font-semibold text-black sm:mb-5 sm:text-start md:text-[18px]">
      Account Information
      </p>
      <div className='flex gap-5 items-center'>
      <Link to="/student-dashboard/update-profile">
          <Button
            type="Edit Profile"
            bgBtn="Edit Profile"
            className={isEditProfileRoute ? "bg-blue-500 text-white" : "bg-transparent"}
          />
      </Link>
      <Link to="/student-dashboard/update-password">
          <Button
            type="Change Password"
            bgBtn="Change Password"
            className={!isEditProfileRoute ? "bg-blue-500 text-white" : "bg-transparent"}
          />
      </Link>
      </div>
      <form action="">
      <div className='py-5 relative inline-block'>
        <img height={73} width={73} src={profile} alt="profile img" />
        <img className='absolute h-[18px] w-[18px] bottom-[20%] cursor-pointer end-0' src={updateIcon} alt="update icon" />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Input name="First Name* " label="First Name* " placeholder="First Name* " />
          <Input name="Last Name* " label="Last Name* " placeholder="Last Name* " />
          <Input name="Email Address*" label=" Email Address* " placeholder="abc@gmail.com" />
          <Input name=" Phone Number* " label=" Phone Number* " placeholder="+91 00000 00000 " />
          <Input name=" Date of Birth* " label=" Date of Birth* " placeholder="01/01/2001" />
          
                  <Dropdown
                    label="Country* "
                    options={[
                      { value: "India", label: 'India' },
                      { value: "Pakistan", label: 'Pakistan' },
                    ]}
                    defaultValue="Active"
          
                  />
                  <Dropdown
                    label="State*"
                    options={[
                      { value: "Haryana", label: 'Haryana' },
                      { value: "Punjab", label: 'Punjab' },
                    ]}
                    defaultValue="Active"
          
                  />
                  <Dropdown
                    label="Zip Code*"
                    options={[
                      { value: 125033, label: '125033' },
                      { value: 125001, label: '125001' },
                    ]}
                    defaultValue="Active"
          
                  />
      </div>
              <Button
                type="submit"
                className="mt-5 md:mt-10 w-full"
                bgBtn="Save Change "
              />
      </form>
      </div>
      </div>
    </div>
  )
}

export default EditProfile