import React, { useState } from 'react'
import Button from '../../common/Button'
import Input from '../../common/Input'
import { onlineCoursesData } from '../../../utils/helper'

const itemsPerPage = 6



const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState(onlineCoursesData)

  const filteredCourses = courses.filter((course) =>
    course.heading.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleDelete = (title) => {
    setCourses(courses.filter((course) => course.heading !== title))
  }

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <hr className=' w-full bg-black opacity-10 mb-4' />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentData.map((course, index) => (
          <div key={index} className="shadow-md rounded-lg bg-white p-4">
            <img
              src={course.image}
              alt={course.heading}
              className="h-40 w-full rounded-md object-cover"
            />
            <h3 className="text-lg mt-3 font-semibold">{course.heading}</h3>
            <p className="text-sm text-gray-600 font-medium">
              {course.category}
            </p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{course.description}</p>
            <div className="mt-4 flex justify-between">
              <Button bgBtn={'Edit'} />
              <Button
                className="hover:!text-orange-red  !border-orange-red bg-white !text-orange-red transition-all duration-300 hover:bg-orange-red "
                bgBtn={'Delete'}
                onClick={() => handleDelete(course.heading)}
              />
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-4">
          <Button
            disabled={currentPage === 1}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <p className="text-sm text-gray-600">
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
