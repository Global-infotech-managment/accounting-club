import { useState, useEffect, useRef, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  fetchCourses,
  deleteCourse,
  toggleCourseStatus,
} from '../../../services/course/course.service'
import { toast } from 'sonner'
import CourseCard from './CourseCard'
import { showToast } from '../../../services/toast/toast.service'

const AllCourses = () => {
  const [visibleCount, setVisibleCount] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCourses(),
    keepPreviousData: true,
  })

  const filteredCourses = useMemo(() => {
    const allCourses = data?.data?.courses || data?.data || []

    if (!searchTerm.trim()) return allCourses

    return allCourses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  const { mutate: deleteCourseMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success(`Course deleted successfully!`)
      refetch()
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete course'
      )
    },
  })

  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: ({ id, status }) => toggleCourseStatus(id, status),
    onSuccess: (_, variables) => {
      const action = variables.status === 'Enable' ? 'enabled' : 'disabled'
      toast.success(`Course ${action} successfully!`)
      refetch()
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update course status'
      )
    },
  })

  const handleDelete = (course) => {
    const courseId = course.id ?? course._id
    console.log('Deleting course:', courseId)

    if (!courseId) {
      return showToast.error('Invalid course ID. Cannot delete.')
    }

    if (window.confirm(`Are you sure you want to delete "${course.name}"?`)) {
      deleteCourseMutation(courseId)
    }
  }

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable'
    toggleStatusMutation({ id, status: newStatus })
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setVisibleCount(6)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setVisibleCount(6)
    if (searchInputRef.current) searchInputRef.current.focus()
  }

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading...</div>
  }

  if (isError) {
    return (
      <div className="text-red-500 flex justify-center py-10">
        Error loading courses
      </div>
    )
  }

  const totalCourses = filteredCourses.length
  const coursesToShow = filteredCourses.slice(0, visibleCount)

  return (
    <div className="rounded-xl border border-black border-opacity-[0.03] bg-black bg-opacity-[0.03] p-4">
      {/* Search and Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
          All Courses
        </p>
        <div className="flex items-center gap-2">
          <input
            ref={searchInputRef}
            value={searchTerm}
            placeholder="Search courses by name"
            className="max-w-[200px] rounded border px-2 py-1 sm:max-w-[300px]"
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="bg-gray-200 rounded px-2 py-1 text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />

      {/* Course List */}
      {coursesToShow.length === 0 ? (
        <div className="flex justify-center py-10">
          {searchTerm
            ? 'No courses found matching your search'
            : 'No courses found'}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesToShow.map((course) => (
              <CourseCard
                course={course}
                handleToggleStatus={handleToggleStatus}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
              />
            ))}
          </div>

          {/* Show More / Show Less */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {visibleCount < totalCourses && (
              <button
                className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                onClick={() =>
                  setVisibleCount((prev) => Math.min(prev + 6, totalCourses))
                }
              >
                Show More
              </button>
            )}
            {visibleCount > 6 && (
              <button
                className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                onClick={() => setVisibleCount((prev) => Math.max(prev - 6, 6))}
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AllCourses
