import React, { useState } from 'react'
import Button from '../../common/Button'
import Input from '../../common/Input'
import popupImage from "../../../assets/images/webp/popup-icon.webp"

const itemsPerPage = 6

const DeleteModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-[#253466] max-w-sm">
      <div className="flex justify-center"><img height={100} width={100} src={popupImage} alt="popup img" /></div>
      <h2 className="text-lg font-semibold mb-2 text-red-600">Confirm Deletion</h2>
      <p className="text-sm mb-4 text-gray-700">
        Are you sure you want to delete this lesson? This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-blue-700 text-white bg-[#253466] px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)

const UpdateLesson = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  
  // Expanded dummy data with 20 lessons
  const [lessons, setLessons] = useState([
    { id: 1, releaseDate: '2023-01-15', name: 'Introduction to React', editTest: 'Edit Test' },
    { id: 2, releaseDate: '2023-01-20', name: 'React Components', editTest: 'Edit Test' },
    { id: 3, releaseDate: '2023-02-05', name: 'State and Props', editTest: 'Edit Test' },
    { id: 4, releaseDate: '2023-02-18', name: 'React Hooks Basics', editTest: 'Edit Test' },
    { id: 5, releaseDate: '2023-03-02', name: 'Context API', editTest: 'Edit Test' },
    { id: 6, releaseDate: '2023-03-15', name: 'React Router', editTest: 'Edit Test' },
    { id: 7, releaseDate: '2023-04-01', name: 'Forms in React', editTest: 'Edit Test' },
    { id: 8, releaseDate: '2023-04-12', name: 'Advanced Hooks', editTest: 'Edit Test' },
    { id: 9, releaseDate: '2023-05-03', name: 'Performance Optimization', editTest: 'Edit Test' },
    { id: 10, releaseDate: '2023-05-20', name: 'Testing React Apps', editTest: 'InEdit Test' },
    { id: 11, releaseDate: '2023-06-07', name: 'Redux Fundamentals', editTest: 'Edit Test' },
    { id: 12, releaseDate: '2023-06-18', name: 'Redux Toolkit', editTest: 'Edit Test' },
    { id: 13, releaseDate: '2023-07-05', name: 'Server-Side Rendering', editTest: 'InEdit Test' },
    { id: 14, releaseDate: '2023-07-22', name: 'Static Site Generation', editTest: 'Edit Test' },
    { id: 15, releaseDate: '2023-08-10', name: 'Authentication in React', editTest: 'Edit Test' },
    { id: 16, releaseDate: '2023-08-25', name: 'GraphQL with React', editTest: 'Edit Test' },
    { id: 17, releaseDate: '2023-09-12', name: 'React Native Basics', editTest: 'InEdit Test' },
    { id: 18, releaseDate: '2023-09-28', name: 'Animations in React', editTest: 'Edit Test' },
    { id: 19, releaseDate: '2023-10-15', name: 'WebSockets with React', editTest: 'Edit Test' },
    { id: 20, releaseDate: '2023-10-30', name: 'React Security Best Practices', editTest: 'Edit Test' },
  ])

  // Filter lessons based on search term
  const filteredLessons = lessons.filter(lesson => 
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalCount = filteredLessons.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id) => {
    setLessons(lessons.filter(lesson => lesson.id !== id))
    setShowDeletePopup(false)
    // Reset to first page if the last item on current page is deleted
    if (paginatedLessons.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="md:p-4">
      <p className="mb-2 w-full border-b border-[#00000067] pb-2 text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
        All Lesson
      </p>

      <div className="overflow-x-auto">
        <table className="border-gray-200 shadow-md mt-2 overflow-hidden min-w-[700px] w-full rounded-xl border bg-white">
          <thead className="bg-gray-100">
            <tr>
              {[
                'No.',
                'Release Date',
                'Lesson Name',
                'Update Test',
                'Edit',
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
            {paginatedLessons.length > 0 ? (
              paginatedLessons.map((lesson, index) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
                >
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {startIndex + index + 1}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {new Date(lesson.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {lesson.name}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <a href="/admin-dashboard?activeSidebar=update-test">
                      {lesson.editTest}
                    </a>
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <a href="/admin-dashboard?activeSidebar=update-section">
                      <button
                        className="text-blue-600 mr-3 hover:underline"
                        onClick={() => {
                          // Handle edit action
                          console.log('Edit lesson:', lesson)
                        }}
                      >
                        Edit
                      </button>
                    </a>
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