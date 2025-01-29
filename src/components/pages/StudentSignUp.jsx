import React, { useState } from 'react'
import Input from '../common/Input'
import { Dropdown } from '../common/Dropdown'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'

const StudentSignUp = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const nameValue = (e) => {
    setInputValue(e.target.value)
  }

  const handleDropdownChange = (value) => {
    setSelectedOption(value)
  }
  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="shadow-register mt-16 p-12 rounded-3xl">
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
          <div>
            <Input
              placeholder={'Name'}
              type={'text'}
              value={inputValue}
              onChange={nameValue}
            />
          </div>
          <div>
            <Dropdown
              label="Select Course"
              options={[
                { label: 'Web Development', value: 'web-dev' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Cyber Security', value: 'cyber-security' },
              ]}
              onChange={handleDropdownChange}
            />
          </div>
          <div>
            <Input
              placeholder={'Name'}
              type={'text'}
              value={inputValue}
              onChange={nameValue}
            />
          </div>
          <div>
            <Dropdown
              label="Select Course"
              options={[
                { label: 'Web Development', value: 'web-dev' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Cyber Security', value: 'cyber-security' },
              ]}
              onChange={handleDropdownChange}
            />
          </div>
          <div>
            <Input
              placeholder={'Name'}
              type={'text'}
              value={inputValue}
              onChange={nameValue}
            />
          </div>
          <div>
            <Dropdown
              label="Select Course"
              options={[
                { label: 'Web Development', value: 'web-dev' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Cyber Security', value: 'cyber-security' },
              ]}
              onChange={handleDropdownChange}
            />
          </div>
          <div>
            <Input
              placeholder={'Name'}
              type={'text'}
              value={inputValue}
              onChange={nameValue}
            />
          </div>
          <div>
            <Dropdown
              label="Select Course"
              options={[
                { label: 'Web Development', value: 'web-dev' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Cyber Security', value: 'cyber-security' },
              ]}
              onChange={handleDropdownChange}
            />
          </div>
          <div>
            <Input
              placeholder={'Name'}
              type={'text'}
              value={inputValue}
              onChange={nameValue}
            />
          </div>
          <div>
            <Dropdown
              label="Select Course"
              options={[
                { label: 'Web Development', value: 'web-dev' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Cyber Security', value: 'cyber-security' },
              ]}
              onChange={handleDropdownChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSignUp
