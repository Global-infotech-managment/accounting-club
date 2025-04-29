// import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import Button from '../../common/Button'
// import Input from '../../common/Input'
// import popupImage from '../../../assets/images/webp/popup-icon.webp'
// import {
//   deleteStudent,
//   fetchStudents,
// } from '../../../services/auth/auth.service'
// import { useNavigate } from 'react-router-dom'

// const itemsPerPage = 6

// const InactiveModal = ({ onConfirm, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="shadow-lg max-w-sm rounded-lg border border-[#253466] bg-white p-6 text-center">
//       <div className="flex justify-center">
//         <img height={100} width={100} src={popupImage} alt="popup img" />
//       </div>
//       <h2 className="text-lg text-red-600 mb-2 font-semibold text-orange-red">
//         Confirm Account Inactive
//       </h2>
//       <p className="text-gray-700 mb-4 text-sm">
//         Your account is currently inactive. Please confirm your action to
//         proceed further.
//       </p>
//       <div className="flex justify-center gap-4">
//         <button
//           onClick={onConfirm}
//           className="bg-blue-700 rounded bg-[#253466] px-4 py-2 text-white"
//         >
//           Inactive
//         </button>
//         <button
//           onClick={onClose}
//           className="border-gray-300 hover:bg-gray-100 rounded border px-4 py-2"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )

// const AllStudent = () => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedStudent, setSelectedStudent] = useState(null)
//   const [showInactivePopup, setShowInactivePopup] = useState(false)
//   const navigate = useNavigate()

//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ['students', currentPage, searchTerm],
//     queryFn: () =>
//       fetchStudents({
//         search: searchTerm || undefined,
//         page: currentPage.toString(),
//         limit: itemsPerPage.toString(),
//       }),
//     keepPreviousData: true,
//   })

//   useEffect(() => {
//     refetch()
//   }, [currentPage, searchTerm, refetch])

//   const handleDelete = async (id) => {
//     try {
//       await deleteStudent(id)
//       refetch()
//     } catch (error) {
//       console.error('Error deleting student:', error)
//     }
//   }

//   const students = data?.data || []
//   const totalCount = data?.total || 0
//   const totalPages = Math.ceil(totalCount / itemsPerPage)

//   return (
//     <div className="overflow-x-auto md:p-4">
//       <Input
//         value={searchTerm}
//         placeholder="Search by name or email"
//         // label="none"
//         mainClassName="mb-5"
//         onChange={(e) => {
//           setSearchTerm(e.target.value)
//           setCurrentPage(1)
//         }}
//       />

//       <table className="border-gray-200 shadow-md min-w-full overflow-hidden rounded-xl border bg-white">
//         <thead className="bg-gray-100">
//           <tr>
//             {[
//               'Sr. No',
//               'Date',
//               'Name',
//               'Email',
//               'State',
//               'PinCode',
//               'My Review',
//               'Status',
//             ].map((header, index) => (
//               <th
//                 key={index}
//                 className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-[#F7F7F7]">
//           {students.length > 0 ? (
//             students.map((item, index) => (
//               <tr
//                 key={item._id}
//                 className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
//               >
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   {((currentPage - 1) * itemsPerPage + index + 1)
//                     .toString()
//                     .padStart(2, '0')}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   {item?.profile?.name || 'N/A'}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2 text-left">
//                   {item?.email || 'N/A'}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2 capitalize">
//                   {item?.profile?.state || 'N/A'}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   {item?.profile?.pinCode || 'N/A'}
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   {/* <a href="/admin-dashboard?activeSidebar=student-overview">
//                     {item?.profile?.view || 'View'}
//                   </a> */}
//                   <button
//                     onClick={() => {
//                       navigate(
//                         `/admin-dashboard?activeSidebar=student-overview&studentId=${item.id}`
//                       )
//                     }}
//                     className="text-blue-500 underline"
//                   >
//                     {item?.profile?.view || 'View'}
//                   </button>
//                 </td>
//                 <td className="border border-[#D7D7D7] px-4 py-2">
//                   <button
//                     onClick={() => {
//                       if (!item?.status) {
//                         setSelectedStudent(item)
//                         setShowInactivePopup(true)
//                       }
//                     }}
//                     className={`${
//                       item?.profile?.Active
//                         ? 'text-green-600'
//                         : 'text-red-500 cursor-pointer underline'
//                     }`}
//                   >
//                     {item?.status ? 'Active' : 'Inactive'}
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="py-4 text-center">
//                 Student not found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//         <div className="relative mt-4 flex min-w-[500px] items-center justify-center gap-4">
//           <Button
//             disabled={currentPage === 1 || isLoading}
//             transparentBtn="Prev Page"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           />
//           <Button
//             disabled={currentPage === totalPages || isLoading}
//             transparentBtn="Next Page"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//           />
//           <p className="text-sm text-[#000000CC]">
//             Page{' '}
//             <span className="mx-2 rounded-[10px] border border-[#00000033] px-5 py-2">
//               {currentPage.toString().padStart(2, '0')}
//             </span>{' '}
//             of {totalPages.toString().padStart(2, '0')}
//           </p>
//         </div>
//       )}

//       {showInactivePopup && (
//         <InactiveModal
//           onConfirm={() => {
//             // Optional logic on confirming inactive
//             console.log('Confirmed for student:', selectedStudent)
//             setShowInactivePopup(false)
//             setSelectedStudent(null)
//           }}
//           onClose={() => {
//             setShowInactivePopup(false)
//             setSelectedStudent(null)
//           }}
//         />
//       )}
//     </div>
//   )
// }

// export default AllStudent

import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Button from '../../common/Button'
import Input from '../../common/Input'
import popupImage from '../../../assets/images/webp/popup-icon.webp'

import {
  deleteStudent,
  fetchStudents,
  updateStatus,
} from '../../../services/auth/auth.service'
import { toast } from 'react-toastify'

const itemsPerPage = 6

const InactiveModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="shadow-lg max-w-sm rounded-lg border border-[#253466] bg-white p-6 text-center">
      <div className="flex justify-center">
        <img height={100} width={100} src={popupImage} alt="popup img" />
      </div>
      <h2 className="text-lg text-red-600 mb-2 font-semibold text-orange-red">
        Confirm Account Inactive
      </h2>
      <p className="text-gray-700 mb-4 text-sm">
        Your account is currently inactive. Please confirm your action to
        proceed further.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-blue-700 rounded bg-[#253466] px-4 py-2 text-white"
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

const AllStudent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showInactivePopup, setShowInactivePopup] = useState(false)
  const navigate = useNavigate()

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

  const { mutate: changeStatus, isLoading: isUpdating } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      refetch()
      setShowInactivePopup(false)
      setSelectedStudent(null)
      toast.success('Status Updated')
    },
    onError: (error) => {
      console.error('Status update failed:', error)
    },
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

  const students = data?.data || []
  const totalCount = data?.total || 0
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="overflow-x-auto md:p-4">
      <Input
        value={searchTerm}
        placeholder="Search by name or email"
        mainClassName="mb-5"
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
              'My Review',
              'Status',
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
          {students.length > 0 ? (
            students.map((item, index) => (
              <tr
                key={item._id}
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
                  {item?.profile?.name || 'N/A'}
                </td>
                <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                  {item?.email || 'N/A'}
                </td>
                <td className="border border-[#D7D7D7] px-4 py-2 capitalize">
                  {item?.profile?.state || 'N/A'}
                </td>
                <td className="border border-[#D7D7D7] px-4 py-2">
                  {item?.profile?.pinCode || 'N/A'}
                </td>
                <td className="border border-[#D7D7D7] px-4 py-2">
                  <button
                    onClick={() => {
                      navigate(
                        `/admin-dashboard?activeSidebar=student-overview&studentId=${item.id}`
                      )
                    }}
                    className="text-blue-500 underline"
                  >
                    {item?.profile?.view || 'View'}
                  </button>
                </td>
                <td className="border border-[#D7D7D7] px-4 py-2">
                  <button
                    onClick={() => {
                      if (!item.status) {
                        setSelectedStudent(item)
                        setShowInactivePopup(true)
                      } else {
                        changeStatus({ id: item.id, status: false })
                      }
                    }}
                    className={`${
                      item?.status
                        ? 'text-green-600 cursor-pointer underline'
                        : 'text-red-500 cursor-pointer underline'
                    }`}
                  >
                    {item?.status ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center">
                Student not found
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button
            disabled={currentPage === totalPages || isLoading}
            transparentBtn="Next Page"
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

      {showInactivePopup && selectedStudent && (
        <InactiveModal
          onConfirm={() => {
            changeStatus({ id: selectedStudent.id, status: true })
          }}
          onClose={() => {
            setShowInactivePopup(false)
            setSelectedStudent(null)
          }}
        />
      )}
    </div>
  )
}

export default AllStudent
