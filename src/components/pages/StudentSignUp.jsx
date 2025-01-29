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
                { label: '1 year', value: '1' },
                { label: '2 year', value: '2' },
                { label: '3 year', value: '3' },
                { label: '4 year', value: '4' },
                { label: '5 year+', value: '5' },
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
                { label: 'America', value: 'America' },
                { label: 'Afghanistan', value: 'Afghanistan' },
                { label: 'Albania', value: 'Albania' },
                { label: 'Andorra', value: 'Andorra' },
                { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
                { label: 'Argentina', value: 'Argentina' },
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
                <a href="#" className="text-blue-500 underline">
                  Terms & Conditions
                </a>
                .
              </label>
            </div>
          </div>
          <Button
            className="mt-4 w-full md:mt-6 lg:mt-10"
            transparentBtn="Read more"
          />
          <div className="col-span-2 justify-center flex items-center pt-7">
            <label htmlFor="terms" className="ml-2">
              Already have an account?
              <a href="#" className="text-blue-500 font-semibold ps-1">
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
