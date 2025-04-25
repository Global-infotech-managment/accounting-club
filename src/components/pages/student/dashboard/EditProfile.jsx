import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useStudentProfile } from '../../../../hooks/useAuth';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import { Dropdown } from '../../../common/Dropdown';
import StudentSidebar from '../StudentSidebar';
import DashboardNav from '../../../common/DashboardNav';
import updateIcon from '../../../../assets/images/png/update-icon.png'
import { studentSidebarItems } from '../../../../utils/helper'

const EditProfile = () => {
  const { userId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let activeSidebar = queryParams.get('activeSidebar') || 'dashboard';
  const isEditProfileRoute = location.pathname.includes('update-profile');
  activeSidebar = activeSidebar.replace(/~/g, '-');

  const { profile, isLoading, isError, updateProfile, isUpdating } = useStudentProfile(userId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        age: profile.age || '',
        experience: profile.experience || '',
        address1: profile.address1 || '',
        address2: profile.address2 || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || '',
        pinCode: profile.pinCode || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile</div>;

  return (
    <div className="flex h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-grow overflow-auto">
        <div className="h-full bg-[#fa7f7f0c] lg:w-3/12 lg:max-w-[250px]">
          <StudentSidebar sidebarOptions={studentSidebarItems} />
        </div>

        <div className="mx-4 mt-4 w-full rounded-xl bg-[#F7F7F7] p-4 sm:mx-7 sm:mt-7">
          <p className="mb-2 w-full border-b border-[#DFDFDF] pb-2 text-center text-[16px] font-semibold text-black sm:mb-5 sm:text-start md:text-[18px]">
            Account Information
          </p>
          <div className="flex items-center gap-5">
            <Link to="/student-dashboard/update-profile">
              <Button
                type="Edit Profile"
                bgBtn="Edit Profile"
                className={
                  isEditProfileRoute
                    ? 'bg-blue-500 text-white'
                    : 'bg-transparent'
                }
              />
            </Link>
            <Link to="/student-dashboard/update-password">
              <Button
                type="Change Password"
                bgBtn="Change Password"
                className={
                  !isEditProfileRoute
                    ? 'bg-blue-500 text-white'
                    : 'bg-transparent'
                }
              />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            {updateSuccess && (
              <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
                Profile updated successfully!
              </div>
            )}
            <div className="relative inline-block py-5">
              <img height={73} width={73} src={profile} alt="profile img" />
              <img
                className="absolute bottom-[20%] end-0 h-[18px] w-[18px] cursor-pointer"
                src={updateIcon}
                alt="update icon"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="name"
                label="Name*"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                label="Email Address*"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleChange}
                disabled 
              />
              <Input
                name="phone"
                label="Phone Number*"
                placeholder="+91 00000 00000"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                name="age"
                label="Age*"
                placeholder="22"
                value={formData.age}
                onChange={handleChange}
                type="number"
              />
              <Input
                name="experience"
                label="Experience"
                placeholder="Fresher"
                value={formData.experience}
                onChange={handleChange}
              />
              <Input
                name="address1"
                label="Address Line 1*"
                placeholder="123 Main Street"
                value={formData.address1}
                onChange={handleChange}
              />
              <Input
                name="address2"
                label="Address Line 2"
                placeholder="Apt 4B"
                value={formData.address2}
                onChange={handleChange}
              />
              <Input
                name="city"
                label="City*"
                placeholder="New York"
                value={formData.city}
                onChange={handleChange}
              />
              <Dropdown
                name="country"
                label="Country*"
                options={[
                  { value: 'USA', label: 'USA' },
                  { value: 'India', label: 'India' },
                ]}
                value={formData.country}
                onChange={(value) => handleDropdownChange('country', value)}
              />
              <Dropdown
                name="state"
                label="State*"
                options={[
                  { value: 'NewYork', label: 'New York' },
                  { value: 'California', label: 'California' },
                ]}
                value={formData.state}
                onChange={(value) => handleDropdownChange('state', value)}
              />
              <Input
                name="pinCode"
                label="Zip Code*"
                placeholder="10001"
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="mt-5 w-full md:mt-10"
              bgBtn={isUpdating ? "Saving..." : "Save Changes"}
              disabled={isUpdating}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;