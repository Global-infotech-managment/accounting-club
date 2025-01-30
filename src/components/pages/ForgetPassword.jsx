import React, { useState, useRef, useEffect } from 'react'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Input from '../common/Input'
import Button from '../common/Button'
import OtpPopup from './OtpPopup'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (errors.email && value && validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Enter a valid email'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setEmail('')
      setIsOtpPopupVisible(true) // Show OTP popup on successful form submission
    }
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-5 shadow-register xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Recover </span>
              <span className="text-red-500">Password!</span>
            </>
          }
        />
        <Paragraph
          className="mx-auto mb-6 max-w-[590px] text-center text-black"
          text="Enter your email address, and we’ll help you reset your password."
        />
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="relative">
            <Input
              placeholder="Email Id"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
            )}
          </div>
          <Button className={'rounded-xl'} type="submit" bgBtn="Submit" />
        </form>

        {/* OTP Popup */}
        {isOtpPopupVisible && (
          <div
            ref={popupRef}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
          >
            <OtpPopup onClose={() => setIsOtpPopupVisible(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgetPassword
