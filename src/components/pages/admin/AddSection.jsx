import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'

const AddSection = () => {
  const [formData, setFormData] = useState({
    selectCourse: '',
    sectionName: '',
    description: '',
    validity: '',
    isMandatory: 'Yes', // assuming default value for dropdown
    status: 'Active', // assuming default value for dropdown
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleDropdownChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const formSubmit = (e) => {
    e.preventDefault()
    if (
      !formData.selectCourse ||
      !formData.sectionName ||
      !formData.description ||
      !formData.validity
    ) {
      alert('Please fill all the fields')
      return
    }
    console.log(formData, 'add section')
    setFormData({
      selectCourse: '',
      sectionName: '',
      description: '',
      validity: '',
      isMandatory: 'Yes',
      status: 'Active',
    })
    navigate('/admin-dashboard?activeSidebar=add-video')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Section
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4">
        <Input
          name="selectCourse"
          placeholder="Select Course"
          value={formData.selectCourse}
          onChange={handleInputChange}
        />
        <Input
          name="sectionName"
          placeholder="Section Name"
          value={formData.sectionName}
          onChange={handleInputChange}
        />
        <Input
          name="description"
          type={'text'}
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Input
          name="validity"
          type={'number'}
          placeholder="Validity"
          value={formData.validity}
          onChange={handleInputChange}
        />

        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          value={formData.isMandatory}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="status"
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Disable', label: 'Disable' },
          ]}
          value={formData.status}
          onChange={handleDropdownChange}
        />

        <Button onClick={formSubmit} className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AddSection
