import React, { useState } from 'react'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import Button from '../../common/Button'
import {
  STUDENT_LOGIN_ROUTE,
  TERM_AND_CONDITION_ROUTE,
} from '../../../utils/constant'
import { CountryList } from '../../../utils/helper'
import { useNavigate } from 'react-router-dom'

const StudentSignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    if (
      !age ||
      !qualification ||
      !experience ||
      !email ||
      !mobile ||
      !addressLine1 ||
      !addressLine2 ||
      !city ||
      !state ||
      !country ||
      !pinCode ||
      !password ||
      !retypePassword
    ) {
      return alert('Please fill all the fields')
    }
    if (password !== retypePassword) {
      // Handle password mismatch
      return alert('Passwords do not match')
    }
    if (!termsAccepted) {
      // Handle terms not accepted
      return alert('Please accept the terms and conditions')
    }

    // Handle form submission
    navigate(STUDENT_LOGIN_ROUTE)
    setAddressLine1('')
    setAddressLine2('')
    setAge('')
    setCity('')
    setName('')
    setCountry('')
    setExperience('')
    setMobile('')
    setPinCode('')
    setQualification('')
    setState('')
    setTermsAccepted(false)
    setPassword('')
    setRetypePassword('')
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
                placeholder="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Dropdown
                label="Qualification"
                options={[
                  { label: '--select', value: '--select' },
                  { label: '10+2 Commerce', value: '10+2 Commerce' },
                  { label: '10+2 Others', value: '10+2 Others' },
                  { label: 'B.Com', value: 'B.Com' },
                  { label: 'BSc', value: 'BSc' },
                  { label: 'B.A', value: 'B.A' },
                  { label: 'B.Tech', value: 'B.Tech' },
                  { label: 'M.Com', value: 'M.Com' },
                  { label: 'MBA', value: 'MBA' },
                  { label: 'MSc', value: 'MSc' },
                  { label: 'M.A', value: 'M.A' },
                  { label: 'M.Tech', value: 'M.Tech' },
                  { label: 'CA Inter', value: 'CA Inter' },
                  { label: 'CA', value: 'CA' },
                  { label: 'ICWA', value: 'ICWA' },
                  { label: 'CS', value: 'CS' },
                  { label: 'LLb', value: 'LLb' },
                  { label: 'Others', value: 'Others' },
                ]}
                value={qualification}
                onChange={setQualification}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Dropdown
                label="Experience if any"
                options={[
                  { label: 'Fresher', value: 'fresher' },
                  { label: '1 year', value: '1' },
                  { label: '2 years', value: '2' },
                  { label: '3 years', value: '3' },
                  { label: '4 years', value: '4' },
                  { label: '5 years', value: '5' },
                  { label: '6 years', value: '6' },
                  { label: '7 years', value: '7' },
                  { label: '8 years', value: '8' },
                  { label: '9 years', value: '9' },
                  { label: '10 years', value: '10' },
                  { label: '10+ years', value: '10+' },
                  { label: '15+ years', value: '15+' },
                  { label: '20+ years', value: '20+' },
                ]}
                onChange={setExperience}
                value={experience}
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
                placeholder="Postal Address* [For study Material] Line 1"
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Line 2"
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Dropdown
                label="Country"
                options={CountryList}
                onChange={setCountry}
                value={country}
              />
            </div>
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Pin Code"
                type="number"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
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
            <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
              <Input
                placeholder="Retype Password"
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center sm:w-6/12">
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
            transparentBtn="Sign Up"
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
