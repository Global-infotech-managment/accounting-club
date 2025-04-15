import React, { useState } from 'react';
import arrow from "../../../assets/images/svg/arrow-black.svg"
import courses from '../../../assets/images/svg/courses.svg'

const StudentOverview = () => {
     const [currentPage, setCurrentPage] = useState(1)
     const [searchTerm, setSearchTerm] = useState('')
     const [selectedLesson, setSelectedLesson] = useState(null)
     const [showDeletePopup, setShowDeletePopup] = useState(false)
     const itemsPerPage = 6
     
     // Expanded dummy data with 20 lessons
     const [lessons, setLessons] = useState([
       { id: 1, releaseDate: '2023-01-15', name: 'Introduction to React', courseStatus: 'Complete' ,status:"view"},
       { id: 2, releaseDate: '2023-01-20', name: 'React Components', courseStatus: 'Complete' ,status:"view"},
       { id: 3, releaseDate: '2023-02-05', name: 'State and Props', courseStatus: 'Complete' ,status:"view"},
       { id: 4, releaseDate: '2023-02-18', name: 'React Hooks Basics', courseStatus: 'Complete' ,status:"view"},
       { id: 5, releaseDate: '2023-03-02', name: 'Context API', courseStatus: 'Complete' ,status:"view"},
       { id: 6, releaseDate: '2023-03-15', name: 'React Router', courseStatus: 'Complete' ,status:"view"},
       { id: 7, releaseDate: '2023-04-01', name: 'Forms in React', courseStatus: 'Complete' ,status:"view"},
       { id: 8, releaseDate: '2023-04-12', name: 'Advanced Hooks', courseStatus: 'Complete' ,status:"view"},
       { id: 9, releaseDate: '2023-05-03', name: 'Performance Optimization', courseStatus: 'Complete' ,status:"view"},
       { id: 10, releaseDate: '2023-05-20', name: 'Testing React Apps', courseStatus: 'InComplete' ,status:"view"},
       { id: 11, releaseDate: '2023-06-07', name: 'Redux Fundamentals', courseStatus: 'Complete' ,status:"view"},
       { id: 12, releaseDate: '2023-06-18', name: 'Redux Toolkit', courseStatus: 'Complete' ,status:"view"},
       { id: 13, releaseDate: '2023-07-05', name: 'Server-Side Rendering', courseStatus: 'InComplete' ,status:"view"},
       { id: 14, releaseDate: '2023-07-22', name: 'Static Site Generation', courseStatus: 'Complete' ,status:"view"},
       { id: 15, releaseDate: '2023-08-10', name: 'Authentication in React', courseStatus: 'Complete' ,status:"view"},
       { id: 16, releaseDate: '2023-08-25', name: 'GraphQL with React', courseStatus: 'Complete' ,status:"view"},
       { id: 17, releaseDate: '2023-09-12', name: 'React Native Basics', courseStatus: 'InComplete' ,status:"view"},
       { id: 18, releaseDate: '2023-09-28', name: 'Animations in React', courseStatus: 'Complete' ,status:"view"},
       { id: 19, releaseDate: '2023-10-15', name: 'WebSockets with React', courseStatus: 'Complete' ,status:"view"},
       { id: 20, releaseDate: '2023-10-30', name: 'React Security Best Practices', courseStatus: 'Complete' ,status:"view"},
     ])
   
     // Filter lessons based on search term
     const filteredLessons = lessons.filter(lesson => 
       lesson.name.toLowerCase().includes(searchTerm.toLowerCase()))
   
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

    // Handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page)
    }

    return (
        <div className='bg-[#F7F7F7] p-4 rounded-xl'>
            <div className="mb-4">
                <p className="w-full text-[16px] font-semibold text-black md:text-[18px] text-center sm:text-start mb-2 sm:mb-0 pb-2">
                    Result Overview
                </p>
                <hr className="mb-2 w-full bg-black opacity-10" />
                <div className='flex gap-4 flex-wrap'>
                    <div className='text-sm'>Name: <span className='font-medium'>Mohit</span></div>
                    <div className='text-sm'>Email: <span className='font-medium'>name@gmail.com</span></div>
                    <div className='text-sm'>Admission Number: <span className='font-medium'>12346666</span></div>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4">
                    <div className='bg-[#EFEFEF] p-4 border border-[#E8E8E8] rounded-xl transition-all duration-300 hover:border-[#253466]'>
                        <div className='flex gap-1 items-center'>
                            <img src={courses} alt="icon" />
                            <span>Courses</span>
                        </div>
                        <h3 className='pt-3 text-[#606060]'><span className='text-[20px] text-[#253466] font-semibold'>15 Courses</span>/20 Courses</h3>
                        <div className='flex gap-1 pt-10'>
                            <span className='text-sm'>View Details</span>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                </div>
                <p className="w-full pt-3 sm:pt-[22px] text-[16px] font-semibold text-black md:text-[20px] text-center sm:text-start mt-5  border-[#00000067]  border-t">
                Courses
                </p>
                <div>
                    <table className="border-gray-200 shadow-md min-w-full overflow-hidden rounded-xl border bg-white mt-2">
                        <thead className="bg-gray-100">
                            <tr>
                                {[
                                'No.',
                                'Release Date',
                                'Courses',
                                'Status',
                                'Watch Status'
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
                                paginatedLessons.map((lesson, index) => (
                                <tr
                                    key={lesson.id}
                                    className="hover:bg-gray-50 text-nowrap border-t border-[#EFEFEF] border-[2px] bg-[#F7F7F7] text-center"
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
                                    <a href="/admin-dashboard?activeSidebar=update-test">{lesson.courseStatus}</a>
                                    </td>
                                    <td className="border border-[#D7D7D7] px-4 py-2">
                                    <a href="/admin-dashboard?activeSidebar=update-section">
                                        <button
                                        className="text-blue-600 hover:underline mr-3"
                                        onClick={() => {
                                            // Handle edit action
                                            console.log('Edit lesson:', lesson)
                                        }}
                                        >
                                        View
                                        </button>
                                    </a>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No Courses found
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 border-t border-b hover:bg-[#253466] hover:text-white ${currentPage === page ? 'bg-blue-500 bg-[#253466] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}

                {/* Display current page info */}
                <div className="text-center mt-2 text-sm text-[#243466]">
                    Page {currentPage} of {totalPages} | Showing {paginatedLessons.length} of {totalCount} courses
                </div>
            </div>
        </div>
    );
};

export default StudentOverview;