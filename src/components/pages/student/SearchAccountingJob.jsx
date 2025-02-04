import React, { useState } from 'react'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import Heading from '../../common/Heading'
import Paragraph from '../../common/Paragraph'
import Button from '../../common/Button'
import { TERM_AND_CONDITION_ROUTE } from '../../../utils/constant'
import { CountryList } from '../../../utils/helper'
import Book from '../../../assets/images/png/book.png'
const SearchAccountingJob = () => {
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')

  const [salary, setSalary] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')

  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !qualification ||
      !experience ||
      !salary ||
      !city ||
      !state ||
      !country
    ) {
      return alert('Please fill all the fields including the resume upload')
    }

    if (!termsAccepted) {
      return alert('Please accept the terms and conditions')
    }

    setSalary('')

    setCity('')

    setCountry('')
    setExperience('')

    setQualification('')
    setState('')
    setTermsAccepted(false)
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
                  <span className="text-black">Search Accounting</span>{' '}
                  <span className="text-red-500">Job</span>
                </>
              }
            />
            <Paragraph
              className="mx-auto mb-6 max-w-[590px] text-center text-black"
              text="Find top accounting jobs, apply easily, and advance your finance career with leading companies today!"
            />
            <div className="flex flex-wrap">
              <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
                <Dropdown
                  label="Select Post"
                  options={[
                    { label: '--select', value: '--select' },
                    { label: '10+2 Commerce', value: '10+2 Commerce' },
                    { label: '10+2 Others', value: '10+2 Others' },
                  ]}
                  value={qualification}
                  onChange={setQualification}
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
                  label="Salary Range"
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
                  value={salary}
                  onChange={setQualification} // Incorrect handler
                />
              </div>
              <div className="w-full px-0 py-3 sm:w-6/12 sm:px-2">
                <Dropdown
                  label="Experience"
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
  )
}

export default SearchAccountingJob
