import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../../common/Button'
import Input from '../../common/Input'
import popupImage from '../../../assets/images/webp/popup-icon.webp'

import {
  deleteStudent,
  fetchStudents,
  updateStatus,
} from '../../../services/auth/auth.service'

const itemsPerPage = 6

/* ──────────────────────────────
   Helper   • Inactive modal
   ────────────────────────────── */
const InactiveModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="shadow-lg max-w-sm rounded-lg border border-[#253466] bg-white p-6 text-center">
      <div className="flex justify-center">
        <img src={popupImage} alt="popup" width={100} height={100} />
      </div>
      <h2 className="text-lg text-red-600 mb-2 font-semibold">
        Confirm Account Inactive
      </h2>
      <p className="text-gray-700 mb-4 text-sm">
        Your account is currently inactive. Please confirm your action to
        proceed further.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="rounded bg-[#253466] px-4 py-2 text-white"
        >
          Inactive
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

/* ──────────────────────────────
   Main component
   ────────────────────────────── */
const AllStudent = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [purchaseFilter, setPurchaseFilter] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showInactivePopup, setShowInactivePopup] = useState(false)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetchStudents(),
  })

  const { mutate: changeStatus, isLoading: isUpdating } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      toast.success('Status updated')
      refetch()
      setShowInactivePopup(false)
      setSelectedStudent(null)
    },
    onError: (err) => console.error('Status update failed', err),
  })

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id)
      refetch()
      toast.success('Student deleted')
    } catch (err) {
      console.error('Delete student failed', err)
    }
  }

  const students = data?.data ?? []

  const filteredStudents = students.filter((student) => {
    const name = student?.profile?.name?.toLowerCase() || ''
    const email = student?.email?.toLowerCase() || ''
    const search = searchTerm.toLowerCase()
    const matchesSearch = name.includes(search) || email.includes(search)
    const purchaseStatus = student?.profile?.view ? 'purchased' : 'unpurchased'
    const matchesPurchase =
      purchaseFilter === 'all' || purchaseStatus === purchaseFilter
    return matchesSearch && matchesPurchase
  })

  const totalCount = filteredStudents.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="overflow-x-auto md:p-4">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end">
        <Input
          value={searchTerm}
          placeholder="Search by name or email"
          mainClassName="w-full md:w-1/2"
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />

        <div className="flex items-center gap-2 md:w-56">
          <label htmlFor="purchaseFilter" className="whitespace-nowrap text-sm">
            Purchase&nbsp;Status
          </label>
          <select
            id="purchaseFilter"
            value={purchaseFilter}
            onChange={(e) => {
              setPurchaseFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="border-gray-300 w-full rounded border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="purchased">Purchased</option>
            <option value="unpurchased">Unpurchased</option>
          </select>
        </div>
      </div>

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
              'Course Purchase',
              'Status',
              'Actions',
            ].map((h) => (
              <th
                key={h}
                className="border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-[#F7F7F7]">
          {paginatedStudents.length ? (
            paginatedStudents.map((item, i) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 border-t text-center"
              >
                <td className="border border-[#D7D7D7] px-4 py-2">
                  {((currentPage - 1) * itemsPerPage + i + 1)
                    .toString()
                    .padStart(2, '0')}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin-dashboard?activeSidebar=student-overview&studentId=${item.id}`
                      )
                    }
                    className="text-blue-500 underline"
                  >
                    {item?.profile?.name || 'N/A'}
                  </button>
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                  {item?.email ?? 'N/A'}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2 capitalize">
                  {item?.profile?.state ?? 'N/A'}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  {item?.profile?.pinCode ?? 'N/A'}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  {item?.profile?.view || 'not purchase'}
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => {
                      if (!item.status) {
                        setSelectedStudent(item)
                        setShowInactivePopup(true)
                      } else {
                        changeStatus({ id: item.id, status: false })
                      }
                    }}
                    className={`underline ${
                      item?.status ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {item?.status ? 'Active' : 'Inactive'}
                  </button>
                </td>

                <td className="border border-[#D7D7D7] px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-600 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="py-4 text-center">
                {isError ? 'Error loading students' : 'Student not found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="relative mt-4 flex min-w-[500px] items-center justify-center gap-4">
          <Button
            disabled={currentPage === 1 || isLoading}
            transparentBtn="Prev Page"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
          <Button
            disabled={currentPage === totalPages || isLoading}
            transparentBtn="Next Page"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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

      {showInactivePopup && selectedStudent && (
        <InactiveModal
          onConfirm={() =>
            changeStatus({ id: selectedStudent.id, status: true })
          }
          onClose={() => {
            setSelectedStudent(null)
            setShowInactivePopup(false)
          }}
        />
      )}
    </div>
  )
}

export default AllStudent
