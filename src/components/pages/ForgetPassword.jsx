import React, { useState } from 'react'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Input from '../common/Input'
import Button from '../common/Button'
import { Link } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE } from '../../utils/constant'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (errors.email) {
      if (value && validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: '' }))
      }
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
    }
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-5 shadow-register xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Recover </span>{' '}
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
              <p className="absolute text-sm text-orange-red">{errors.email}</p>
            )}
          </div>

          <Button className={'rounded-xl'} type="submit" bgBtn="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
