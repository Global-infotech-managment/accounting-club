import React, { useState } from 'react'
import Input from '../common/Input'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import { Link } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE } from '../../utils/constant'
import Button from '../common/Button'

const StudentLogin = () => {
  const [inputValue, setInputValue] = useState('')

  const nameValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mx-auto mt-16 max-w-[806px] rounded-3xl p-12 shadow-register">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Welcome</span>{' '}
              <span className="text-red-500">Back!</span>
            </>
          }
        />

        <Paragraph
          className="mx-auto mb-6 max-w-[590px] text-center text-black"
          text="Sign in now to access your account and continue your experience."
        />
        <div className="flex w-full flex-col gap-5">
          <Input
            placeholder={'Email Id'}
            type={'email'}
            value={inputValue}
            onChange={nameValue}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            value={inputValue}
            onChange={nameValue}
          />
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm text-black">
                Remember my login
              </label>
            </div>
            <Link to={FORGOT_PASSWORD_ROUTE} className="text-sm text-primary">
              Forgot Password?
            </Link>
          </div>
          <Button bgBtn="Get Started" />
        </div>
      </div>
    </div>
  )
}

export default StudentLogin
