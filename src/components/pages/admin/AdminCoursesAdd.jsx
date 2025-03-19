import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'

const AdminCoursesAdd = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    price: '',
    validity: '',
    selectedFile: null,
    dragActive: false,
    status: 'Active',
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        selectedFile: event.target.files[0],
      }))
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setFormData((prevData) => ({
      ...prevData,
      dragActive: true,
    }))
  }

  const handleDragLeave = () => {
    setFormData((prevData) => ({
      ...prevData,
      dragActive: false,
    }))
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setFormData((prevData) => ({
      ...prevData,
      dragActive: false,
      selectedFile: event.dataTransfer.files[0],
    }))
  }

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      status: selectedOption.value,
    }))
  }

  const formSubmit = (e) => {
    e.preventDefault()
    if (
      !formData.courseName ||
      !formData.description ||
      !formData.price ||
      !formData.validity ||
      !formData.selectedFile
    ) {
      alert('Please fill all the fields')
      return
    }
    console.log(formData, 'form data')
    setFormData({
      courseName: '',
      description: '',
      price: '',
      validity: '',
      selectedFile: null,
      dragActive: false,
      status: 'Active',
    })

    navigate('/admin-dashboard?activeSidebar=add-section')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Course
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <Input
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleInputChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <Input
          name="validity"
          type="number"
          placeholder="Validity"
          value={formData.validity}
          onChange={handleInputChange}
        />

        {/* Drag & Drop File Upload */}
        <div
          className={`flex h-[100px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 md:h-[150px] ${
            formData.dragActive ? 'border-orange-red' : 'border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-800 text-center">
            Drag & Drop files or{' '}
            <label
              htmlFor="fileInput"
              className="cursor-pointer font-semibold text-orange-red"
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

        {formData.selectedFile && (
          <p className="text-gray-700 mt-2">
            Uploaded File: {formData.selectedFile.name}
          </p>
        )}

        <Dropdown
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Disable', label: 'Disable' },
          ]}
          defaultValue="Active"
          onChange={handleDropdownChange} // Ensure the dropdown updates state
        />

        <Button type="submit" className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AdminCoursesAdd
