import React, { useState } from 'react'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import Button from '../../common/Button'
import {
  EMPLOYER_LOGIN_ROUTE,
  TERM_AND_CONDITION_ROUTE,
} from '../../../utils/constant'
import { CountryList } from '../../../utils/helper'

const EmployerSignUp = () => {
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
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

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mt-16 rounded-3xl p-12 shadow-register">
        <div>
          <Heading
            className="mb-3 text-center xl:mb-4"
            middleText={
              <>
                <span className="text-black">Company</span>{' '}
                <span className="text-red-500">Registration</span>
              </>
            }
          />
          <Paragraph
            className="mx-auto mb-6 max-w-[590px] text-center text-black"
            text="Register today to create your company profile and start posting jobs instantly. Connect with top talent anytime, anywhere with ease!"
          />
          <div className="flex flex-wrap">
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Company Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Email Id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Postal Address* [For study Material] Line 1"
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Line 2"
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Dropdown
                label="Country"
                options={CountryList}
                onChange={setCountry}
                value={country}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Pin Code"
                type="number"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full px-2 py-3 sm:w-6/12">
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
            className="mt-4 w-full md:mt-6 lg:mt-10"
            transparentBtn="Sign Up"
          />
          <div className="col-span-2 flex items-center justify-center pt-7">
            <label htmlFor="terms" className="ml-2">
              Already have an account?
              <a
                href={EMPLOYER_LOGIN_ROUTE}
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

export default EmployerSignUp
