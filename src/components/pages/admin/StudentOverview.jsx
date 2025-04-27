// import React, { useState } from 'react';
// import arrow from "../../../assets/images/svg/arrow-black.svg"
// import courses from '../../../assets/images/svg/courses.svg'

// const StudentOverview = () => {
//      const [currentPage, setCurrentPage] = useState(1)
//      const [searchTerm, setSearchTerm] = useState('')
//      const [selectedLesson, setSelectedLesson] = useState(null)
//      const [showDeletePopup, setShowDeletePopup] = useState(false)
//      const itemsPerPage = 6

//      // Expanded dummy data with 20 lessons
//      const [lessons, setLessons] = useState([
//        { id: 1, releaseDate: '2023-01-15', name: 'Introduction to React', courseStatus: 'Complete' ,status:"view"},
//        { id: 2, releaseDate: '2023-01-20', name: 'React Components', courseStatus: 'Complete' ,status:"view"},
//        { id: 3, releaseDate: '2023-02-05', name: 'State and Props', courseStatus: 'Complete' ,status:"view"},
//        { id: 4, releaseDate: '2023-02-18', name: 'React Hooks Basics', courseStatus: 'Complete' ,status:"view"},
//        { id: 5, releaseDate: '2023-03-02', name: 'Context API', courseStatus: 'Complete' ,status:"view"},
//        { id: 6, releaseDate: '2023-03-15', name: 'React Router', courseStatus: 'Complete' ,status:"view"},
//        { id: 7, releaseDate: '2023-04-01', name: 'Forms in React', courseStatus: 'Complete' ,status:"view"},
//        { id: 8, releaseDate: '2023-04-12', name: 'Advanced Hooks', courseStatus: 'Complete' ,status:"view"},
//        { id: 9, releaseDate: '2023-05-03', name: 'Performance Optimization', courseStatus: 'Complete' ,status:"view"},
//        { id: 10, releaseDate: '2023-05-20', name: 'Testing React Apps', courseStatus: 'InComplete' ,status:"view"},
//        { id: 11, releaseDate: '2023-06-07', name: 'Redux Fundamentals', courseStatus: 'Complete' ,status:"view"},
//        { id: 12, releaseDate: '2023-06-18', name: 'Redux Toolkit', courseStatus: 'Complete' ,status:"view"},
//        { id: 13, releaseDate: '2023-07-05', name: 'Server-Side Rendering', courseStatus: 'InComplete' ,status:"view"},
//        { id: 14, releaseDate: '2023-07-22', name: 'Static Site Generation', courseStatus: 'Complete' ,status:"view"},
//        { id: 15, releaseDate: '2023-08-10', name: 'Authentication in React', courseStatus: 'Complete' ,status:"view"},
//        { id: 16, releaseDate: '2023-08-25', name: 'GraphQL with React', courseStatus: 'Complete' ,status:"view"},
//        { id: 17, releaseDate: '2023-09-12', name: 'React Native Basics', courseStatus: 'InComplete' ,status:"view"},
//        { id: 18, releaseDate: '2023-09-28', name: 'Animations in React', courseStatus: 'Complete' ,status:"view"},
//        { id: 19, releaseDate: '2023-10-15', name: 'WebSockets with React', courseStatus: 'Complete' ,status:"view"},
//        { id: 20, releaseDate: '2023-10-30', name: 'React Security Best Practices', courseStatus: 'Complete' ,status:"view"},
//      ])

//      // Filter lessons based on search term
//      const filteredLessons = lessons.filter(lesson =>
//        lesson.name.toLowerCase().includes(searchTerm.toLowerCase()))

//      // Pagination logic
//      const totalCount = filteredLessons.length
//      const totalPages = Math.ceil(totalCount / itemsPerPage)
//      const startIndex = (currentPage - 1) * itemsPerPage
//      const paginatedLessons = filteredLessons.slice(startIndex, startIndex + itemsPerPage)

//      const handleDelete = (id) => {
//        setLessons(lessons.filter(lesson => lesson.id !== id))
//        setShowDeletePopup(false)
//        // Reset to first page if the last item on current page is deleted
//        if (paginatedLessons.length === 1 && currentPage > 1) {
//          setCurrentPage(currentPage - 1)
//        }
//      }

//     // Handle page change
//     const handlePageChange = (page) => {
//       setCurrentPage(page)
//     }

//     return (
//       <div className="overflow-hidden md:p-4">
//         <div className="rounded-xl bg-[#F7F7F7] p-4">
//           <div className="mb-4">
//             <p className="mb-2 w-full pb-2 text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
//               Result Overview
//             </p>
//             <hr className="mb-2 w-full bg-black opacity-10" />
//             <div className="flex flex-wrap gap-4">
//               <div className="text-sm">
//                 Name: <span className="font-medium">Mohit</span>
//               </div>
//               <div className="text-sm">
//                 Email: <span className="font-medium">name@gmail.com</span>
//               </div>
//               <div className="text-sm">
//                 Admission Number: <span className="font-medium">12346666</span>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 pt-4">
//               <div className="rounded-xl border border-[#E8E8E8] bg-[#EFEFEF] p-4 transition-all duration-300 hover:border-[#253466]">
//                 <div className="flex items-center gap-1">
//                   <img src={courses} alt="icon" />
//                   <span>Courses</span>
//                 </div>
//                 <h3 className="pt-3 text-[#606060]">
//                   <span className="text-[20px] font-semibold text-[#253466]">
//                     15 Courses
//                   </span>
//                   /20 Courses
//                 </h3>
//                 <div className="flex gap-1 pt-10">
//                   <span className="text-sm">View Details</span>
//                   <img src={arrow} alt="arrow" />
//                 </div>
//               </div>
//             </div>
//             <p className="mt-5 w-full border-t border-[#00000067] pt-3 text-center text-[16px] font-semibold text-black sm:pt-[22px] sm:text-start md:text-[20px]">
//               Courses
//             </p>
//             <div className="overflow-x-auto">
//               <table className="border-gray-200 shadow-md mt-2 w-full min-w-[700px] overflow-hidden rounded-xl border bg-white">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     {[
//                       'No.',
//                       'Release Date',
//                       'Courses',
//                       'Status',
//                       'Watch Status',
//                     ].map((header, index) => (
//                       <th
//                         key={index}
//                         className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
//                       >
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#EFEFEF]">
//                   {paginatedLessons.length > 0 ? (
//                     paginatedLessons.map((lesson, index) => (
//                       <tr
//                         key={lesson.id}
//                         className="hover:bg-gray-50 text-nowrap border-[2px] border-t border-[#EFEFEF] bg-[#F7F7F7] text-center"
//                       >
//                         <td className="border border-[#D7D7D7] px-4 py-2">
//                           {startIndex + index + 1}
//                         </td>
//                         <td className="border border-[#D7D7D7] px-4 py-2">
//                           {new Date(lesson.releaseDate).toLocaleDateString()}
//                         </td>
//                         <td className="border border-[#D7D7D7] px-4 py-2">
//                           {lesson.name}
//                         </td>
//                         <td className="border border-[#D7D7D7] px-4 py-2">
//                           <a href="/admin-dashboard?activeSidebar=update-test">
//                             {lesson.courseStatus}
//                           </a>
//                         </td>
//                         <td className="border border-[#D7D7D7] px-4 py-2">
//                           <a href="/admin-dashboard?activeSidebar=student-progress">
//                             <button
//                               className="text-blue-600 mr-3 hover:underline"
//                               onClick={() => {
//                                 // Handle edit action
//                                 console.log('Edit lesson:', lesson)
//                               }}
//                             >
//                               View
//                             </button>
//                           </a>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="py-4 text-center">
//                         No Courses found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination controls */}
//             {totalPages > 1 && (
//               <div className="mt-4 flex justify-center">
//                 <nav className="shadow inline-flex rounded-md">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`rounded-l-md border px-3 py-1 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
//                   >
//                     Previous
//                   </button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-3 py-1 hover:bg-[#253466] hover:text-white ${currentPage === page ? 'bg-blue-500 bg-[#253466] text-white' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
//                       >
//                         {page}
//                       </button>
//                     )
//                   )}
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`rounded-r-md border px-3 py-1 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
//                   >
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             )}
//             {/* Display current page info */}
//             <div className="mt-2 text-center text-sm text-[#243466]">
//               Page {currentPage} of {totalPages} | Showing{' '}
//               {paginatedLessons.length} of {totalCount} courses
//             </div>
//           </div>
//         </div>
//       </div>
//     )
// };

// export default StudentOverview;

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import arrow from '../../../assets/images/svg/arrow-black.svg'
import courses from '../../../assets/images/svg/courses.svg'
import { courseEnrollmentForAdmin } from '../../../services/course/course.service'

const StudentOverview = () => {
  const [searchParams] = useSearchParams()
  const studentId = searchParams.get('studentId')

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 6

  // Fetch student data using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['studentEnrollment', studentId],
    queryFn: () => courseEnrollmentForAdmin(studentId),
    enabled: !!studentId, // Only fetch if studentId exists
  })

  // Extract data from API response
  const studentDetails = data?.data?.data?.studentDetails || {}
  const enrollmentData = data?.data?.data?.courses || []
  const totalEnrollments = data?.data?.data?.totalEnrollments || 0
  const totalCourses = data?.data?.data?.totalCourses || 0

  console.log('data line 239 ', data?.data?.data?.courses)

  // Filter lessons based on search term
  const filteredLessons = enrollmentData.filter((lesson) =>
    lesson.course?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalCount = filteredLessons.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (isLoading) return <div className="p-4">Loading...</div>
  // if (isError) return <div className="p-4">Error loading student data</div>
  // if (isError) {
  //   console.error('Error loading student data:', error)
  //   return (
  //     <div className="p-4">Error loading student data: {error.message}</div>
  //   )
  // }
  if (!studentId) return <div className="p-4">No student selected</div>

  return (
    <div className="overflow-hidden md:p-4">
      <div className="rounded-xl bg-[#F7F7F7] p-4">
        <div className="mb-4">
          <p className="mb-2 w-full pb-2 text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
            Result Overview
          </p>
          <hr className="mb-2 w-full bg-black opacity-10" />
          <div className="flex flex-wrap gap-4">
            <div className="text-sm">
              Name:{' '}
              <span className="font-medium">
                {studentDetails?.name || 'N/A'}
              </span>
            </div>
            <div className="text-sm">
              Email:{' '}
              <span className="font-medium">
                {studentDetails.email || 'N/A'}
              </span>
            </div>
            <div className="text-sm">
              Admission Number:{' '}
              <span className="font-medium">{studentDetails.id || 'N/A'}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="rounded-xl border border-[#E8E8E8] bg-[#EFEFEF] p-4 transition-all duration-300 hover:border-[#253466]">
              <div className="flex items-center gap-1">
                <img src={courses} alt="icon" />
                <span>Courses</span>
              </div>
              <h3 className="pt-3 text-[#606060]">
                <span className="text-[20px] font-semibold text-[#253466]">
                  {totalEnrollments} Courses
                </span>
                /{totalCourses} Courses
              </h3>
              <div className="flex gap-1 pt-10">
                <span className="text-sm">View Details</span>
                <img src={arrow} alt="arrow" />
              </div>
            </div>
          </div>
          <p className="mt-5 w-full border-t border-[#00000067] pt-3 text-center text-[16px] font-semibold text-black sm:pt-[22px] sm:text-start md:text-[20px]">
            Courses
          </p>
          <div className="overflow-x-auto">
            <table className="border-gray-200 shadow-md mt-2 w-full min-w-[700px] overflow-hidden rounded-xl border bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    'No.',
                    'Release Date',
                    'Courses',
                    'Status',
                    'Watch Status',
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
              <tbody className="bg-[#EFEFEF]">
                {paginatedLessons.length > 0 ? (
                  paginatedLessons.map((enrollment, index) => (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-gray-50 text-nowrap border-[2px] border-t border-[#EFEFEF] bg-[#F7F7F7] text-center"
                    >
                      <td className="border border-[#D7D7D7] px-4 py-2">
                        {startIndex + index + 1}
                      </td>
                      <td className="border border-[#D7D7D7] px-4 py-2">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-[#D7D7D7] px-4 py-2">
                        {enrollment.course?.name || 'N/A'}
                      </td>
                      <td className="border border-[#D7D7D7] px-4 py-2">
                        {enrollment.completed ? 'Complete' : 'InComplete'}
                      </td>
                      <td className="border border-[#D7D7D7] px-4 py-2">
                        <a
                          href={`/admin-dashboard?activeSidebar=student-progress&courseId=${enrollment.courseId}&studentId=${studentId}`}
                        >
                          <button className="text-blue-600 mr-3 hover:underline">
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      No Courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <nav className="shadow inline-flex rounded-md">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`rounded-l-md border px-3 py-1 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 hover:bg-[#253466] hover:text-white ${currentPage === page ? 'bg-blue-500 bg-[#253466] text-white' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`rounded-r-md border px-3 py-1 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 bg-white'}`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
          {/* Display current page info */}
          <div className="mt-2 text-center text-sm text-[#243466]">
            Page {currentPage} of {totalPages} | Showing{' '}
            {paginatedLessons.length} of {totalCount} courses
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentOverview
