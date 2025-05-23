// src/hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/authSlice'
import { loginUser } from '../services/auth/auth.service'
import {
  addLessonTest,
  deleteLessonTest,
  deleteLessonTestById,
} from '../services/lessonTest/lessonTest.services'
import {
  getStudentProfile,
  createStudentProfile,
  updateStudentProfile,
} from '../services/student/student.services'
import { deleteLessonById } from '../services/section/section.services'
import { addquestion } from '../services/questions/questions.service'

// Main authentication hook
export default function useAuth() {
  const { token, role, userId } = useSelector((state) => state.auth)

  return {
    isAuthenticated: !!token,
    isAdmin: role === 'Admin',
    isStudent: role === 'Student',
    userRole: role,
    userId,
  }
}

// Authentication operations
export const useLogin = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data))
    },
    onError: (error) => {
      console.error(
        'Login Failed:',
        error.response?.data?.message || error.message
      )
    },
  })
}

// Student profile operations
export const useStudentProfile = (studentId) => {
  return useQuery({
    queryKey: ['studentProfile', studentId],
    queryFn: () => getStudentProfile(studentId),
    enabled: !!studentId,
  })
}

export const useCreateStudentProfile = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: createStudentProfile,
    onSuccess: (data) => {
      dispatch(setUser({ user: data }))
    },
    onError: (error) => {
      console.error(
        'Create Profile Failed:',
        error.response?.data?.message || error.message
      )
    },
  })
}

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (data, variables) => {
      // Update the cache with new data
      queryClient.setQueryData(['studentProfile', variables.userId], data)
      return data
    },
    onError: (error) => {
      console.error(
        'Update Profile Failed:',
        error.response?.data?.message || error.message
      )
      throw error
    },
  })
}

// Test operations
export const useCreateTest = () => {
  return useMutation({
    mutationFn: addLessonTest,
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error('Error creating test:', error)
      throw error
    },
  })
}

// question operations
export const useCreatequestion = () => {
  return useMutation({
    mutationFn: addquestion,
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error('Error creating test:', error)
      throw error
    },
  })
}

// delete lesson

export const useDeleteLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLessonById,
    onSuccess: (data, variables) => {
      // Invalidate the sections query to refresh the list
      queryClient.invalidateQueries(['sections'])
      return data
    },
    onError: (error) => {
      console.error(
        'Delete Lesson Failed:',
        error.response?.data?.message || error.message
      )
      throw error
    },
  })
}

export const useDeleteLessonTest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteLessonTestById(id),
    onSuccess: (data, variables) => {
      // Invalidate the sections query to refresh the list
      queryClient.invalidateQueries(['sections'])
      return data
    },
    onError: (error) => {
      console.error(
        'Delete Lesson Test Failed:',
        error.response?.data?.message || error.message
      )
      throw error
    },
  })
}
