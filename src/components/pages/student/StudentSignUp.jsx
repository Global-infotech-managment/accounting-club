import React, { useState } from 'react'
import Input from '../../common/Input'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import Button from '../../common/Button'
import {
  STUDENT_LOGIN_ROUTE,
  TERM_AND_CONDITION_ROUTE,
} from '../../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../../services/auth/auth.service' // Import your API function
import { toast } from 'sonner'

const StudentSignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !mobile || !email || !name) {
      return alert('Please fill all the fields')
    }

    if (!termsAccepted) {
      return alert('Please accept the terms and conditions')
    }

    setIsLoading(true) // Start loading

    try {
      const userData = {
        name,
        email,
        password,
        phone: mobile,
      }

      // Call the API function directly
      const response = await registerUser(userData)

      if (response.user) {
        toast.success('Registration successful!')
        navigate(STUDENT_LOGIN_ROUTE)
        resetForm()
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false) // Stop loading regardless of success/error
    }
  }

  const resetForm = () => {
    setTermsAccepted(false)
    setMobile('')
    setPassword('')
    setName('')
    setEmail('')
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mt-16 rounded-3xl p-5 shadow-register xl:p-12">
        <div>
          <Heading
            className="mb-3 text-center xl:mb-4"
            middleText={
              <>
                <span className="text-black">Student</span>{' '}
                <span className="text-red-500">Registration</span>
              </>
            }
          />
          <Paragraph
            className="mx-auto mb-6 max-w-[590px] text-center text-black"
            text="Register today to access your free CA course and start learning anytime, anywhere with expert guidance!"
          />
          <div className="flex flex-wrap">
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Email Id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Mobile Number"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Password*"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center sm:w-6/12 sm:ps-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2">
                By creating an account, you agree to the{' '}
                <a
                  href={TERM_AND_CONDITION_ROUTE}
                  className="text-orange-red underline"
                >
                  Terms & Conditions.
                </a>
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="mt-4 w-full md:mt-6 lg:mt-10"
            transparentBtn={isLoading ? 'Processing...' : 'Sign Up'}
            disabled={isLoading}
          />
          <div className="col-span-2 flex items-center justify-center pt-7">
            <label htmlFor="terms" className="ml-2">
              Already have an account?
              <a
                href={STUDENT_LOGIN_ROUTE}
                className="text-blue-500 ps-1 font-semibold"
              >
                Sign In
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSignUp
