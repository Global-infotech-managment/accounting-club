import React, { useState } from 'react'
// import 'react-toastify/dist/ReactToastify.css'
import { useQuery, useMutation } from '@tanstack/react-query'
import Button from '../../common/Button'

import {
  fetchCourses,
  deleteCourse,
  toggleCourseStatus,
} from '../../../services/course/course.service'
// import { toast } from 'react-toastify'

const itemsPerPage = 4

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch courses with pagination
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses', currentPage, searchTerm],
    queryFn: () =>
      fetchCourses({
        search: searchTerm || undefined,
        page: currentPage,
        limit: itemsPerPage,
      }),
    keepPreviousData: true,
  })

  // Delete course mutation
  const { mutate: deleteCourseMutation } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success('Course deleted successfully!')
      refetch()
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete course')
    },
  })

  // Toggle status mutation
  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: ({ id, status }) => toggleCourseStatus(id, status),
    onSuccess: (_, variables) => {
      const action = variables.status === 'Enable' ? 'enabled' : 'disabled'
      toast.success(`Course ${action} successfully!`)
      refetch()
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to update course status'
      )
    },
  })

  const handleDelete = (id) => {
    deleteCourseMutation(id)
  }

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable'
    toggleStatusMutation({ id, status: newStatus })
  }

  if (isLoading)
    return <div className="flex justify-center py-10">Loading...</div>
  if (isError)
    return (
      <div className="text-red-500 flex justify-center py-10">
        Error loading courses
      </div>
    )

  const courses = data?.data || []
  const totalCount = data?.total || 0
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="rounded-xl border border-black border-opacity-[0.03] bg-black bg-opacity-[0.03] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="w-full text-[16px] font-semibold text-black md:text-[18px]">
          All Courses
        </p>
        <input
          value={searchTerm}
          placeholder="Search courses"
          className="max-w-[300px] rounded border px-2 py-1"
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset page when searching
          }}
        />
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="shadow-md flex flex-col justify-between rounded-lg bg-white p-4"
          >
            <div>
              <img
                src={course?.file?.url}
                alt={course.heading}
                className="h-40 w-full rounded-md object-cover"
              />
              <div className="flex items-center justify-between pt-2.5">
                <h3 className="text-lg mt-3 font-semibold">{course.heading}</h3>
                <button
                  className={`!h-[30px] rounded-2xl px-2.5 text-[12px] transition-all duration-300 ease-in-out ${
                    course.status === 'Enable'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                  onClick={() => handleToggleStatus(course.id, course.status)}
                >
                  {course.status}
                </button>
              </div>
              <p className="text-gray-600 text-sm font-medium">
                {course.category}
              </p>
              <p className="text-gray-500 mt-2 line-clamp-3 text-sm">
                {course.description}
              </p>
            </div>
            <div className="mt-4 flex gap-5">
              <a
                href={`/admin-dashboard?activeSidebar=update-course&id=${course.id}`}
              >
                <Button bgBtn="Edit" />
              </a>
              <Button
                className="!border-orange-red bg-white !text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                bgBtn="Delete"
                onClick={() => handleDelete(course.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Fully Fixed Pagination */}
      {totalPages <= 1 && (
        <div className="mt-6 flex items-center justify-center space-x-2">
          {/* Previous Button */}
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            transparentBtn="Prev"
          />

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`rounded px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <Button
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            transparentBtn="Next"
          />
        </div>
      )}
    </div>
  )
}

export default AllCourses
