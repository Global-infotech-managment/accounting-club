import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { ADMIN_DASHBOARD_ROUTE, FORGOT_PASSWORD_ROUTE } from '../utils/constant'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Input from './common/Input'
import Button from './common/Button'
import { loginUser } from '../services/auth/auth.service'
import { setUser } from '../features/authSlice'
import { toast } from 'sonner'
import { showToast } from '../services/toast/toast.service'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser, // Required in v5
    onSuccess: (data) => {
      dispatch(setUser(data))
      showToast.success('Login Successfully')
      navigate(ADMIN_DASHBOARD_ROUTE)
    },
    onError: (error) => {
      setErrors({ api: error.response?.data?.message || 'Login failed' })
    },
  })
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) {
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
      mutate({ email, password })
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
          {errors.api && (
            <p className="text-center text-sm text-orange-red">{errors.api}</p>
          )}
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

          <Button
            className={'rounded-xl'}
            type="submit"
            bgBtn="Get Started"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
