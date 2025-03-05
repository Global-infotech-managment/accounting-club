import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import Icons from '../../common/Icons'

const AddVideo = () => {
  const [selectCourse, setSelectCourse] = useState('')
  const [selectChapter, setSelectChapter] = useState('')
  const [lessonNumber, setLessonNumber] = useState('')
  const [isMandatory, setIsMandatory] = useState('Yes')
  const [videoDescription, setVideoDescription] = useState('')
  const [videoEmbedCode, setVideoEmbedCode] = useState('')
  const [studyMaterial, setStudyMaterial] = useState(null) // File state
  const [status, setStatus] = useState('Active')

  const navigate = useNavigate()

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setStudyMaterial(e.target.files[0]) // Store file object
    }
  }
  const formSubmit = (e) => {
    e.preventDefault()
    // Validate all fields
    if (
      !selectCourse ||
      !selectChapter ||
      !lessonNumber ||
      !videoDescription ||
      !videoEmbedCode
    ) {
      console.log('Form Submitted:', {
        selectCourse,
        selectChapter,
        lessonNumber,
        isMandatory,
        videoDescription,
        videoEmbedCode,
        studyMaterial, // Store file name
        status,
      })
      alert('Please fill all the fields')
      return
    }
    console.log('Form Submitted:', {
      selectCourse,
      selectChapter,
      lessonNumber,
      isMandatory,
      videoDescription,
      videoEmbedCode,
      studyMaterial, // Store file name
      status,
    })
    // Reset form
    setSelectCourse('')
    setSelectChapter('')
    setLessonNumber('')
    setIsMandatory('Yes')
    setVideoDescription('')
    setVideoEmbedCode('')
    setStudyMaterial(null) // Reset file state
    setStatus('Active')
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
            value={selectCourse}
            onChange={(e) => setSelectCourse(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Select Chapter"
            value={selectChapter}
            onChange={(e) => setSelectChapter(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Lesson Number"
            type="number"
            value={lessonNumber}
            onChange={(e) => setLessonNumber(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Dropdown
            label="Is mandatory to move next"
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
            ]}
            value={isMandatory}
            onChange={(value) => setIsMandatory(value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Video Description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Video Embed Code"
            value={videoEmbedCode}
            onChange={(e) => setVideoEmbedCode(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <label className="text-sm mb-[2px] text-black">
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
                {studyMaterial ? studyMaterial.name : 'Upload from file'}
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
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </div>

        <Button type="submit" className="mt-5 md:mt-10" bgBtn="Next" />
      </form>
    </div>
  )
}

export default AddVideo
