import React, { useState } from 'react'
import Input from '../common/Input'
import { Dropdown } from '../common/Dropdown'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Button from '../common/Button'

const StudentSignUp = () => {
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

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="shadow-register mt-16 rounded-3xl p-12">
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

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Name*"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Age*"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            placeholder="Qualification*"
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
          <Dropdown
            label="Experience if any*"
            options={[
              { label: 'Fresher', value: 'fresher' },
              { label: '1-2 years', value: '1-2' },
              { label: '3-5 years', value: '3-5' },
              { label: '5+ years', value: '5+' },
            ]}
            onChange={setExperience}
            value={experience}
          />
          <Input
            placeholder="Email Id*"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Mobile Number*"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Input
            placeholder="Postal Address* [For study Material] Line 1"
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <Input
            placeholder="Line 2"
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
          <Input
            placeholder="City*"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="State*"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Dropdown
            label="Country*"
            options={[
              { label: 'America', value: 'america' },
              { label: 'India', value: 'india' },
              { label: 'UK', value: 'uk' },
            ]}
            onChange={setCountry}
            value={country}
          />
          <Input
            placeholder="Pin Code*"
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <Input
            placeholder="Password*"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Retype Password*"
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />

          <div className="col-span-2 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2">
              By creating an account, you agree to the{' '}
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
              .
            </label>
          </div>

          <Button
            className="mt-4 md:mt-6 lg:mt-10"
            transparentBtn="Read more"
          />
        </div>
      </div>
    </div>
  )
}

export default StudentSignUp
