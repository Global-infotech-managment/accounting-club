import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import Icons from '../../common/Icons'

const AddVideo = () => {
  const [formData, setFormData] = useState({
    selectCourse: '',
    selectChapter: '',
    lessonNumber: '',
    isMandatory: 'Yes',
    videoDescription: '',
    videoEmbedCode: '',
    studyMaterial: null, // File state
    status: 'Active',
  })

  const navigate = useNavigate()

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        studyMaterial: e.target.files[0], // Store file object
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const formSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    const {
      selectCourse,
      selectChapter,
      lessonNumber,
      videoDescription,
      videoEmbedCode,
    } = formData
    if (
      !selectCourse ||
      !selectChapter ||
      !lessonNumber ||
      !videoDescription ||
      !videoEmbedCode
    ) {
      alert('Please fill all the fields')
      return
    }
    console.log(formData, 'add video')
    // Reset form
    setFormData({
      selectCourse: '',
      selectChapter: '',
      lessonNumber: '',
      isMandatory: 'Yes',
      videoDescription: '',
      videoEmbedCode: '',
      studyMaterial: null, // Reset file state
      status: 'Active',
    })

    navigate('/admin-dashboard?activeSidebar=add-test')
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Video + Test + Study Material
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-wrap gap-y-4" onSubmit={formSubmit}>
        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Select Course"
            name="selectCourse"
            value={formData.selectCourse}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Select Chapter"
            name="selectChapter"
            value={formData.selectChapter}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Lesson Number"
            type="number"
            name="lessonNumber"
            value={formData.lessonNumber}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Dropdown
            label="Is mandatory to move next"
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
            ]}
            value={formData.isMandatory}
            onChange={(value) => handleDropdownChange('isMandatory', value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Video Description"
            name="videoDescription"
            value={formData.videoDescription}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Video Embed Code"
            name="videoEmbedCode"
            value={formData.videoEmbedCode}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <label className="mb-[2px] text-sm text-black">
            Study Material <span className="text-orange-red">*</span>
          </label>
          <div className="relative mt-1">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="text-xs flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 px-4 py-2 text-black focus:ring-2 focus-visible:outline-[1px] focus-visible:outline-orange-red"
            >
              <span className="text-black opacity-50">
                {formData.studyMaterial
                  ? formData.studyMaterial.name
                  : 'Upload from file'}
              </span>
              <Icons iconName="upload" />
            </label>
          </div>
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Dropdown
            label="Status"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Disable', label: 'Disable' },
            ]}
            value={formData.status}
            onChange={(value) => handleDropdownChange('status', value)}
          />
        </div>

        <Button type="submit" className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AddVideo
