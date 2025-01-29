import React, { useState } from 'react'
import Input from '../common/Input'
import { Dropdown } from '../common/Dropdown'

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
      <Input
        placeholder={'Name'}
        type={'text'}
        value={inputValue}
        onChange={nameValue}
      />
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
  )
}

export default StudentSignUp
