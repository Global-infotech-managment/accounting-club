import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation } from '@tanstack/react-query'
import Button from '../../common/Button'
// import { toast } from 'sonner'
import Input from '../../common/Input'
import {
  fetchCourses,
  deleteCourse,
  toggleCourseStatus,
} from '../../../services/course/course.service'


const itemsPerPage = 6

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch courses
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses', currentPage, searchTerm],
    queryFn: () =>
      fetchCourses({
        search: searchTerm || undefined,
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
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
        <Input
          value={searchTerm}
          placeholder={'Search courses'}
          label={'none'}
          inputClassName={'w-full'}
          mainClassName={'max-w-[300px]'}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
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
                      ? 'bg-primary text-white'
                      : 'bg-orange-red text-white'
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
              <a href='/admin-dashboard?activeSidebar=update-course' ><Button bgBtn={'Edit'} /></a>
              <Button
                className="!border-orange-red bg-white !text-orange-red transition-all duration-300 hover:bg-orange-red hover:!text-orange-red"
                bgBtn={'Delete'}
                onClick={() => handleDelete(course.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {totalCount > itemsPerPage && (
        <div className="mt-4 flex justify-center gap-4">
          <Button
            disabled={currentPage === 1}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <p className="text-gray-600 text-sm">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            disabled={currentPage === totalPages}
            transparentBtn={'Next Page'}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      )}
    </div>
  )
}

export default AllCourses
