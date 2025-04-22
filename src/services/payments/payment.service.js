import API from '../../api/authApi'

async function createOrder(data) {
  const response = await API.post('payments/create-order', data)
  console.log('response ', response)
  return response.data
}
