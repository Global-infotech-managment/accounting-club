import React, { useState } from 'react'
import Input from '../../common/Input'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
import {
  FORGOT_PASSWORD_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
} from '../../../utils/constant'
import Button from '../../common/Button'

const StudentLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
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

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)

    if (errors.password && value) {
      setErrors((prev) => ({ ...prev, password: '' }))
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

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setEmail('')
      setPassword('')
      navigate(STUDENT_DASHBOARD_ROUTE)
    }
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-5 shadow-register xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Welcome</span>{' '}
              <span className="text-red-500">Back!</span>
            </>
          }
        />

        <Paragraph
          className="mx-auto mb-6 max-w-[590px] text-center text-black"
          text="Sign in now to access your account and continue your experience."
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

          <div className="relative">
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="absolute text-sm text-orange-red">
                {errors.password}
              </p>
            )}
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm text-black">
                Remember my login
              </label>
            </div>
            <Link to={FORGOT_PASSWORD_ROUTE} className="text-sm text-primary">
              Forgot Password?
            </Link>
          </div>

          <Button className={'rounded-xl'} type="submit" bgBtn="Get Started" />
        </form>
      </div>
    </div>
  )
}

export default StudentLogin
