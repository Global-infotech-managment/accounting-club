import React, { useContext } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'

const AddSection = () => {
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value }) // Update courseData directly
  }

  const handleDropdownChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      updateCourseData({ [name]: value });
    } else {
      console.error("Dropdown did not return an event object:", e);
    }
  };
  

  const formSubmit = (e) => {
    e.preventDefault()

    if (
      !courseData.courseName ||
      !courseData.sectionName ||
      !courseData.sectionDescription ||
      !courseData.validity
    ) {
      alert('Please fill all the fields')
      return
    }

    console.log(courseData, 'add section')

    // Reset courseData after submission
    // updateCourseData({
    //   courseName: '',
    //   sectionName: '',
    //   sectionDescription: '',
    //   validity: '',
    //   isMandatory: 'Yes',
    //   status: 'Active',
    // })

    navigate('/admin-dashboard?activeSidebar=add-video')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Section
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4">
         <Dropdown
          name="courseName"
          label="courseName"
          options={[
            { value: 'frontend', label: 'frontend' },
            { value: 'backend', label: 'backend' },
          ]}
          value={courseData.courseName}
          onChange={(e) => handleDropdownChange(e)}

        />
        <Input
          name="sectionName"
          placeholder="Section Name"
          value={courseData.sectionName}
          onChange={handleInputChange}
        />
        <Input
          name="sectionDescription"
          type={'text'}
          placeholder="Section Description"
          value={courseData.sectionDescription}
          onChange={handleInputChange}
        />
        <Input
          name="validity"
          type={'number'}
          placeholder="Validity"
          value={courseData.validity}
          onChange={handleInputChange}
        />

        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          value={courseData.isMandatory}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="status"
          label="Status"
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Disable', label: 'Disable' },
          ]}
          value={courseData.status}
          onChange={handleDropdownChange}
        />

        <Button onClick={formSubmit} className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AddSection
