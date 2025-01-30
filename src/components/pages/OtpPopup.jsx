import React, { useRef, useState } from 'react'
import Heading from '../common/Heading'
import Paragraph from '../common/Paragraph'
import Button from '../common/Button'

const OtpPopup = ({ onClose }) => {
  const inputRefs = useRef([])
  const [error, setError] = useState(false)

  const handleChange = (e, index) => {
    const value = e.target.value

    // Allow only numeric input and ensure only 1 digit is entered
    if (!/^\d{1}$/.test(value) && e.key !== 'Backspace') {
      e.target.value = ''
      return
    }

    // Move to next input after entering a digit
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }

    // Move to previous input if backspace is pressed and the field is empty
    if (e.key === 'Backspace' && value === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus()
      }
    }
  }

  const handleSubmit = () => {
    const otpValues = inputRefs.current.map((input) => input.value)

    // Check if any field is empty
    if (otpValues.includes('')) {
      setError(true)
      return
    }

    // Clear error, reset fields, and close popup
    setError(false)
    inputRefs.current.forEach((input) => (input.value = ''))
    onClose()
  }

  return (
    <div className="fixed left-[50%] top-[50%] z-[999] w-full max-w-[660px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-white py-16 shadow-register">
      <Heading className="mb-3 text-center !text-4xl" middleText={'Verify'} />
      <Paragraph
        className="mx-auto mb-[22px] text-center text-base text-black"
        text="Your code was sent to your email"
      />

      <div className="flex items-center justify-center gap-5">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            className={`${error && 'border-orange-red'} flex h-10 w-[40px] items-center justify-center rounded border border-black text-center opacity-40`}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleChange(e, index)}
          />
        ))}
      </div>

      <Button
        className={'mx-auto mt-10 rounded-xl'}
        type="button"
        bgBtn="Submit"
        onClick={handleSubmit}
      />
      <div className='px-3 flex items-center justify-center mt-5'>
        <label htmlFor="terms" className="mx-auto text-center">
          Already have an account?
          <a href="#" className="mx-auto ps-1 text-orange-red">
            Request again
          </a>
        </label>
      </div>
    </div>
  )
}

export default OtpPopup
