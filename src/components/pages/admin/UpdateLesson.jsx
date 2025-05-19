import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../common/Button'
import Input from '../../common/Input'
import popupImage from '../../../assets/images/webp/popup-icon.webp'
import { fetchAllCourses } from '../../../services/course/course.service'
import {
  fetchAllSections,
  fetchAllSectionsByCourseId,
} from '../../../services/section/section.services'
import { useDeleteLesson } from '../../../hooks/useAuth'
import { deleteLesson } from '../../../services/lessonTest/lessonTest.services'
import { toast } from 'sonner'

const itemsPerPage = 6

const DeleteModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="shadow-lg max-w-sm rounded-lg border border-[#253466] bg-white p-6 text-center">
      <div className="flex justify-center">
        <img height={100} width={100} src={popupImage} alt="popup img" />
      </div>
      <h2 className="text-lg text-red-600 mb-2 font-semibold">
        Confirm Deletion
      </h2>
      <p className="text-gray-700 mb-4 text-sm">
        Are you sure you want to delete this lesson? This action cannot be
        undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-blue-700 rounded bg-[#253466] px-4 py-2 text-white"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="border-gray-300 hover:bg-gray-100 rounded border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)

const UpdateLesson = () => {
  const { mutate: deleteLessonMutation, isLoading: isDeleting } =
    useDeleteLesson()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  // Fetch courses using React Query
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sections'],
    queryFn: () => fetchAllSectionsByCourseId(courseId),
    enabled: !!courseId,
  })
  console.log('course ', courses)

  // Get lessons from courses data or use dummy data if not available
  const allLessons =
    courses ||
    [
      // {
      //   id: 1,
      //   releaseDate: '2023-01-15',
      //   name: 'Introduction to React',
      //   editTest: 'Edit Test',
      // },
    ]

  // Filter lessons based on search term
  const filteredLessons = allLessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalCount = filteredLessons.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleDelete = (id) => {
    deleteLessonMutation(id, {
      onSuccess: () => {
        setShowDeletePopup(false)
        if (paginatedLessons.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
        toast.success('Lesson Deleted Success Fully')
      },
      onError: (error) => {
        console.error('Error deleting lesson:', error)
        setShowDeletePopup(false)
      },
    })
  }
  const handleEdit = (lessonId) => {
    navigate(
      `/admin-dashboard?activeSidebar=update-section&lessonId=${lessonId}`
    )
  }

  return (
    <div className="md:p-4">
      <div className='flex justify-between items-center border-b pb-4 mb-2 border-[#00000067]'>
        <p className="w-full  text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
          All Lesson
        </p>
         <Link  to="/admin-dashboard?activeSidebar=update-video">
                          <button className="rounded bg-[#252466] text-nowrap px-3 py-1.5 text-sm text-white">
                            Update Video and Study material
                          </button>
                        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="border-gray-200 shadow-md mt-2 w-full min-w-[700px] overflow-hidden rounded-xl border bg-white">
          <thead className="bg-gray-100">
            <tr>
              {[
                'No.',
                'Release Date',
                'Lesson Name',
                'Update section and Test',
                'delete',
              ].map((header, index) => (
                <th
                  key={index}
                  className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#F7F7F7]">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  Loading lessons...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  Error loading lessons
                </td>
              </tr>
            ) : paginatedLessons.length > 0 ? (
              paginatedLessons.map((lesson, index) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
                >
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {startIndex + index + 1}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {lesson.createdAt}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {lesson.name}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <button
                      className="text-blue-600 mr-3 hover:underline"
                      onClick={() => handleEdit(lesson.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setShowDeletePopup(true)
                      }}
                      className="text-orange-red hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination remains the same */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Button
              disabled={currentPage === 1}
              transparentBtn="Previous"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded px-3 py-1 ${
                      currentPage === page
                        ? 'bg-[#253466] text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <Button
              disabled={currentPage === totalPages}
              transparentBtn="Next"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, totalCount)} of {totalCount}{' '}
            lessons
          </p>
        </div>
      )}

      {showDeletePopup && (
        <DeleteModal
          onConfirm={() => handleDelete(selectedLesson.id)}
          onClose={() => {
            setShowDeletePopup(false)
            setSelectedLesson(null)
          }}
        />
      )}
    </div>
  )
}

export default UpdateLesson
