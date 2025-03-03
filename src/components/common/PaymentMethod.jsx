import React, { useState } from 'react'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Button from './Button'
import RadioGroup from './RadioGroup'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import { STUDENT_SIGNUP_ROUTE } from '../../utils/constant'

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !name ||
      (paymentMethod === 'credit' && (!cardNumber || !expiry || !cvv))
    ) {
      return alert('Please fill all the required fields.')
    }

    alert('Payment Successful!')
    setName('')
    setCardNumber('')
    setExpiry('')
    setCvv('')
    navigate(STUDENT_SIGNUP_ROUTE)
  }

  return (
    <div className="container px-3 lg:max-w-[1184px]">
      <div className="mt-5 rounded-3xl p-5 shadow-register md:mt-10 lg:mt-16 xl:p-12">
        <Heading
          className="mb-3 text-center xl:mb-4"
          middleText={
            <>
              <span className="text-black">Payment </span>
              <span className="text-red-500">Method</span>
            </>
          }
        />
        <Paragraph
          className="mx-auto mb-6 max-w-[590px] text-center text-black"
          text="Secure and hassle-free payment methods for smooth transactions, supporting multiple options for your convenience."
        />
        <div className="mb-[27px] h-[1px] w-full bg-[#0000001A]"></div>
        {/* Custom Radio Group */}
        <RadioGroup
          options={[{ value: 'credit', label: 'Credit Card' }]}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />{' '}
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and fast credit card payments with advanced security and fraud protection."
        />
        {/* Conditional Credit Card Form */}
        {paymentMethod === 'credit' && (
          <div className="mb-6">
            {' '}
            <div className="flex flex-wrap gap-y-4">
              <div className="w-full px-[10px] md:w-1/2">
                <Input
                  type="text"
                  placeholder="Name Of Cardholder"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full px-[10px] md:w-1/2">
                <Input
                  type="number"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="w-full px-[10px] md:w-1/2">
                <Input
                  type="date"
                  placeholder="Expiry Date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </div>
              <div className="w-full px-[10px] md:w-1/2">
                <Input
                  type="number"
                  placeholder="Security Code"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}
        <RadioGroup
          options={[{ value: 'paypal', label: 'PayPal' }]}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />{' '}
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and fast PayPal payments with advanced security and reliability."
        />
        <RadioGroup
          options={[{ value: 'bank', label: 'Bank Transfer' }]}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />{' '}
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and reliable bank transfers with fast processing and enhanced security."
        />
        {/* Pay Now Button */}
        <Button
          onClick={handleSubmit}
          className="mt-4 w-full md:mt-6 lg:mt-10"
          transparentBtn="Pay Now"
        />
      </div>
    </div>
  )
}

export default PaymentMethod
