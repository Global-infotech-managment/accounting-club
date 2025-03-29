import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from '../../common/Button'
import Input from '../../common/Input'
import {
  deleteStudent,
  fetchStudents,
} from '../../../services/auth/auth.service'

const itemsPerPage = 6

const AllStudent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['students', currentPage, searchTerm],
    queryFn: () =>
      fetchStudents({
        search: searchTerm || undefined,
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [currentPage, searchTerm, refetch])

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id)
      refetch()
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  if (isLoading)
    return <div className="flex justify-center py-10">Loading...</div>
  if (isError)
    return (
      <div className="text-red-500 flex justify-center py-10">
        Error loading data
      </div>
    )

  const students = data?.data || []
  const totalCount = data?.total || 0
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="overflow-x-auto md:p-4">
      <Input
        value={searchTerm}
        placeholder={'Search by name or email'}
        label={'none'}
        mainClassName={'mb-5'}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
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
                className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#F7F7F7]">
          {students.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
            >
              <td className="border border-[#D7D7D7] px-4 py-2">
                {((currentPage - 1) * itemsPerPage + index + 1)
                  .toString()
                  .padStart(2, '0')}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.profile?.name || 'N/A'}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                {item.email}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2 capitalize">
                {item.profile?.state || 'N/A'}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.profile?.pinCode || 'N/A'}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                <Button
                  bgBtn={'Delete'}
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="relative mt-4 flex min-w-[500px] items-center justify-center gap-4">
          <Button
            disabled={currentPage === 1 || isLoading}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button
            disabled={currentPage === totalPages || isLoading}
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
