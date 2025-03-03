import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'

const AddSection = () => {
  const [selectCourse, setSelectCourse] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [description, setDescription] = useState('')
  const [validity, setValidity] = useState('')

  const navigate = useNavigate()

  const formSubmit = (e) => {
    e.preventDefault()
    if (!selectCourse || !sectionName || !description || !validity) {
      alert('Please fill all the fields')
      return
    }
    setSelectCourse('')
    setSectionName('')
    setDescription('')
    setValidity('')
    navigate('/admin-dashboard?activeSidebar=add-section')
  }
  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Section
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4">
        <Input
          placeholder="Select Course"
          value={selectCourse}
          onChange={(e) => setSelectCourse(e.target.value)}
        />
        <Input
          placeholder="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <Input
          type={'text'}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type={'number'}
          placeholder="Validity"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />

        <Dropdown
          label="Is mandatory to move next"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          defaultValue="Active"
        />
        <Dropdown
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Disable', label: 'Disable' },
          ]}
          defaultValue="Active"
        />

        <Button onClick={formSubmit} className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AddSection
