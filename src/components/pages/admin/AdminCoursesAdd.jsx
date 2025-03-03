import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'

const AdminCoursesAdd = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0])
    }
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Course
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />

      <form className="flex flex-col gap-4">
        <Input placeholder="Course Name" />
        <Input placeholder="Description" />
        <Input placeholder="Price" />
        <Input placeholder="Validity" />

        {/* Drag & Drop File Upload */}
        <div
          className={`bg-blue-100 flex h-[150px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
            dragActive ? 'border-orange-red' : 'border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-800 text-center">
            Drag & Drop files or{' '}
            <label
              htmlFor="fileInput"
              className="text-orange-red cursor-pointer font-semibold"
            >
              Select files
            </label>{' '}
            to upload
          </p>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {selectedFile && (
          <p className="text-gray-700 mt-2">
            Uploaded File: {selectedFile.name}
          </p>
        )}

        <Dropdown
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Disable', label: 'Disable' },
          ]}
          defaultValue="Active"
        />

        <Button className="mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AdminCoursesAdd
