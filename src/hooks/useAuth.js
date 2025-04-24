// hooks/useAuth.js
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/authSlice'
import { loginUser } from '../services/auth/auth.service'
import { addLessonTest } from '../services/lessonTest/lessonTest.services'

export default function useAuth() {
  const { token, role } = useSelector((state) => state.auth)

  return {
    isAuthenticated: !!token, // Token hai to true, nahi to false
    isAdmin: role === 'Admin',
    userRole: role,
  }
}

// export const useLogin = () => {
//   const dispatch = useDispatch()
//   return useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       dispatch(setUser(data))
//     },
//     onError: (error) => {
//       console.error(
//         'Login Failed:',
//         error.response?.data?.message || error.message
//       )
//     },
//   })
// }

export const useCreateTest = () => {
  return useMutation({
    mutationFn: addLessonTest,
    onSuccess: () => {
      // You can add success handling here
    },
    onError: (error) => {
      // You can add error handling here
      console.error('Error creating test:', error);
    },
  });
};
