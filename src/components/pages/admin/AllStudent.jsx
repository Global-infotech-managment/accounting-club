import React, { useState } from 'react'
import Button from '../../common/Button'
import { studentList as initialStudentList } from '../../../utils/helper'
import Input from '../../common/Input'

const itemsPerPage = 6

const AllStudent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState(initialStudentList) // Local state for students

  // Sort students by latest date
  const sortedStudentList = [...students].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  // Filter students based on search term (name or email)
  const filteredStudentList = sortedStudentList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredStudentList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = filteredStudentList.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // Delete Student Function
  const handleDelete = (email) => {
    setStudents(students.filter((student) => student.email !== email))
  }

  return (
    <div className="overflow-x-auto md:p-4">
      <Input
        value={searchTerm}
        placeholder={'Search by name or email'}
        label={'none'}
        mainClassName={'mb-5'}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="border-gray-200 shadow-md min-w-full overflow-hidden rounded-xl border bg-white">
        <thead className="bg-gray-100">
          <tr>
            {[
              'Sr. No',
              'Date',
              'Name',
              'Email',
              'State',
              'PinCode',
              'Delete',
            ].map((header, index) => (
              <th
                key={index}
                className="text-sm text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#F7F7F7]">
          {currentData.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
            >
              <td className="border border-[#D7D7D7] px-4 py-2">
                {(startIndex + index + 1).toString().padStart(2, '0')}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">{item.date}</td>
              <td className="border border-[#D7D7D7] px-4 py-2">{item.name}</td>
              <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                {item.email}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2 capitalize">
                {item.state}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.pincode}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                <Button
                  bgBtn={'Delete'}
                  onClick={() => handleDelete(item.email)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage !== filteredStudentList.length && (
        <div className="relative mt-4 flex min-w-[500px] items-center justify-center gap-4">
          <Button
            disabled={currentPage === 1}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button
            disabled={currentPage === totalPages}
            transparentBtn={'Next Page'}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />

          <p className="text-sm text-[#000000CC]">
            Page{' '}
            <span className="mx-2 rounded-[10px] border border-[#00000033] px-5 py-2">
              {currentPage.toString().padStart(2, '0')}
            </span>{' '}
            of {totalPages.toString().padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  )
}

export default AllStudent
