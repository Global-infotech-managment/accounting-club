import React, { useState } from 'react'
import Input from '../../common/Input'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
import {
  useMutation
} from '@tanstack/react-query'
import {
  ADMIN_DASHBOARD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
} from '../../../utils/constant'
import Button from '../../common/Button'
import { loginUser } from '../../../services/auth/auth.service'
import { setUser } from '../../../features/authSlice' 
import { useDispatch } from 'react-redux'
import { showToast } from '../../../services/toast/toast.service'

const StudentLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data))
      showToast.success('Login Successfully')
      navigate(STUDENT_DASHBOARD_ROUTE)
    },
    onError: (error) => {
      setErrors({ api: error.response?.data?.message || 'Login failed' })
    },
  })

  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  const handleLoginInputChange = (e) => {
    const value = e.target.value
    setLoginInput(value)

    // Reset errors when the user changes the input
    if (errors.loginInput) {
      setErrors((prev) => ({ ...prev, loginInput: '' }))
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

    if (!loginInput) {
      newErrors.loginInput = 'Email or Phone Number is required'
    } else if (!validateEmail(loginInput) && !validatePhoneNumber(loginInput)) {
      newErrors.loginInput = 'Enter a valid email or phone number'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Call the mutation instead of navigating directly
      mutate({ loginInput, password })
    }
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-5 shadow-register xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Welcome</span>
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
              placeholder="Email or Phone Number"
              type="text"
              value={loginInput}
              onChange={handleLoginInputChange}
            />
            {errors.loginInput && (
              <p className="absolute text-sm text-orange-red">
                {errors.loginInput}
              </p>
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

          {errors.api && (
            <p className="text-sm text-orange-red">{errors.api}</p>
          )}

          <Button className={'rounded-xl'} type="submit" bgBtn="Get Started" />
        </form>
      </div>
    </div>
  )
}

export default StudentLogin