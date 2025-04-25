import React, { useState, useRef, useEffect } from 'react'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Input from '../common/Input'
import Button from '../common/Button'
import OtpPopup from './OtpPopup'

const UpdateNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [errors, setErrors] = useState({})
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false)

  const popupRef = useRef(null)

  // Manage body overflow when OTP popup is visible
  useEffect(() => {
    if (isOtpPopupVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOtpPopupVisible])

  // Detect click outside of the OTP popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOtpPopupVisible &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setIsOtpPopupVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOtpPopupVisible])

  const validatePassword = (password) => {
    // Add your password validation rules here
    return password.length >= 8 // Example: minimum 8 characters
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newErrors = {}

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Submit the form or show OTP popup
      setIsOtpPopupVisible(true)
    }
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-5 shadow-register xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Set New </span>
              <span className="text-red-500">Password!</span>
            </>
          }
        />
        <Paragraph
          className="mx-auto mb-6 max-w-[590px] text-center text-black"
          text="Your new password must be different from any previously used passwords for security reasons."
        />
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="relative">
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="New Password"
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onClick={() => toggleShowPassword('newPassword')}
                >
                  {showPassword.newPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 mt-1 text-sm">{errors.newPassword}</p>
              )}
            </div>

            <div className="relative">
              <Input
                placeholder="Confirm New Password"
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                onClick={() => toggleShowPassword('confirmPassword')}
              >
                {showPassword.confirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <Button className={'rounded-xl'} type="submit" bgBtn="Reset Password" />
          <div className='text-center text-[14px]'>Go Back To <a className='font-semibold' href="/student-login">Log In</a></div>
        </form>

       
      </div>
    </div>
  )
}

export default UpdateNewPassword