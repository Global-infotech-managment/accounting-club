import React, { useState } from 'react'
import Input from '../common/Input'

const StudentSignUp = () => {
  const [inputValue, setInputValue] = useState('')
  const nameValue = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <Input
        placeholder={'Name'}
        type={'text'}
        value={inputValue}
        onChange={nameValue}
      />
    </div>
  )
}

export default StudentSignUp
