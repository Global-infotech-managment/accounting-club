import API from '../../api/authApi'

export const createRazorpayOrder = async (amount, courseId) => {
  try {
    const response = await API.post('/payments/create-order', {
      amount,
      currency: 'INR',
      courseId,
    })
    return response.data
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export const verifyPayment = async (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  userId,
  courseId,
  amount
) => {
  try {
    const response = await API.post('/payments/verify', {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
      userId,
      courseId,
      amount,
      currency: 'INR',
    })
    return response.data
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error)
    throw error
  }
}
