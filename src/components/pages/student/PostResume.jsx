import React, { useState } from 'react'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import Button from '../../common/Button'
import { TERM_AND_CONDITION_ROUTE } from '../../../utils/constant'
import { CountryList } from '../../../utils/helper'
import Book from '../../../assets/images/png/book.png'
const PostResume = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [salary, setSalary] = useState('')
  const [appliedFor, setAppliedFor] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [resumeFile, setResumeFile] = useState(null)

  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setResumeFile(selectedFile)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      setResumeFile(droppedFile)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !age ||
      !qualification ||
      !experience ||
      !email ||
      !mobile ||
      !salary ||
      !city ||
      !state ||
      !country ||
      !resumeFile
    ) {
      return alert('Please fill all the fields including the resume upload')
    }

    if (!termsAccepted) {
      return alert('Please accept the terms and conditions')
    }

    setSalary('')
    setAge('')
    setCity('')
    setName('')
    setCountry('')
    setExperience('')
    setMobile('')
    setQualification('')
    setState('')
    setTermsAccepted(false)
    setEmail('')
    setResumeFile(null)
  }

  return (
    <div className="relative">
      <img
        className="pointer-events-none absolute -top-5 left-0 z-0"
        src={Book}
        alt="book ellipse"
      />
      <div className="container relative px-3 lg:max-w-[1184px]">
        <div className="mt-16 rounded-3xl p-5 shadow-register xl:p-12">
          <div>
            <Heading
              className="mb-3 text-center xl:mb-4"
              middleText={
                <>
                  <span className="text-black">Post Your </span>{' '}
                  <span className="text-red-500">Resume</span>
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
                  placeholder="Applied For"
                  type="text"
                  value={appliedFor}
                  onChange={(e) => setAppliedFor(e.target.value)}
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
                  placeholder="Expected Salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
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
              <div
                className="mb-4 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-[#4E4E4E1A] bg-[#FBFBFB80]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {' '}
                <label
                  htmlFor="resumeUpload"
                  className="mb-[2px] text-sm text-black"
                >
                  Drag & Drop or Choose file to upload
                </label>
                <input
                  type="file"
                  id="resumeUpload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {resumeFile && (
                  <div className="text-gray-700 mt-2 text-sm">
                    Selected File: <strong>{resumeFile.name}</strong>
                  </div>
                )}
              </div>
              <div className="flex w-full items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-2 text-sm">
                  By submitting your resume, you agree to our
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
              transparentBtn="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostResume
