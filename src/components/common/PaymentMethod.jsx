// components/PaymentMethod.js
import React, { useState } from 'react'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Button from './Button'
import RadioGroup from './RadioGroup'
import Input from './Input'
import { useNavigate, useParams } from 'react-router-dom'
import { STUDENT_SIGNUP_ROUTE } from '../../utils/constant'
import { useQuery } from '@tanstack/react-query'
import { findCourseById } from '../../services/course/course.service'
import {
  createRazorpayOrder,
  verifyPayment,
} from '../../services/payments/payment.service'

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const navigate = useNavigate()
  const { courseId } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !name ||
      (paymentMethod === 'credit' && (!cardNumber || !expiry || !cvv))
    ) {
      return alert('Please fill all the required fields.')
    }

    try {
      // Create Razorpay Order
      const orderData = await createRazorpayOrder(
        course?.price || 1000,
        courseId
      )

      console.log('Razorpay Order Data:', orderData?.data)
      console.log('Order ID:', orderData?.data?.orderId?.id)

      if (!orderData?.data?.orderId?.id) {
        alert('Order creation failed. Please try again.')
        return
      }

      const options = {
        key: 'rzp_test_4OgH6LvK2UwJ9o', // Use your Razorpay key
        amount: course?.price * 100,
        currency: 'INR',
        name: 'Course Purchase',
        description: 'Pay for your course',
        order_id: orderData?.data?.orderId.id,
        handler: async function (response) {
          console.log('Razorpay Response:', response) // Log payment response
          // Verify Razorpay Payment
          const verifyRes = await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            'test-user-id', // Replace with logged in user's ID
            courseId,
            course?.price
          )
          console.log('verifyRes line 668 ', verifyRes)
          if (verifyRes.success) {
            alert('Payment Successful and Course Access Granted!')
            navigate(STUDENT_SIGNUP_ROUTE)
          } else {
            // alert('Payment Verification Failed')
          }
        },
        prefill: {
          name,
        },
        theme: {
          color: '#F37254',
        },
      }

      // Debugging: Check if rzp object is created correctly
      console.log('Razorpay options:', options)

      const rzp = new window.Razorpay(options)
      rzp.open() // Open Razorpay modal
    } catch (err) {
      console.error('Error during payment flow:', err)
      alert('Payment Failed. Try again later.')
    }
  }

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => findCourseById(courseId),
    enabled: !!courseId,
  })

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
        />
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and fast credit card payments with advanced security and fraud protection."
        />
        {/* Conditional Credit Card Form */}
        {paymentMethod === 'credit' && (
          <div className="mb-6">
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
        />
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and fast PayPal payments with advanced security and reliability."
        />
        <RadioGroup
          options={[{ value: 'bank', label: 'Bank Transfer' }]}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />
        <Paragraph
          className="mb-6 ps-[25px] text-black"
          text="Secure and reliable bank transfers with fast processing and enhanced security."
        />
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
