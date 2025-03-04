import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'

const AddVideo = () => {
  const [selectCourse, setSelectCourse] = useState('')
  const [selectChapter, setSelectChapter] = useState('')
  const [lessonNumber, setLessonNumber] = useState('')
  const [description, setDescription] = useState('')
  const [isMandatory, setIsMandatory] = useState('Yes')
  const [videoCode, setVideoCode] = useState('')
  const [videoRelease, setVideoRelease] = useState('')
  const [uploadDate, setUploadDate] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [videoEmbedCode, setVideoEmbedCode] = useState('')
  const [classTest, setClassTest] = useState('')
  const [studyMaterial, setStudyMaterial] = useState('')
  const [status, setStatus] = useState('Active')

  const navigate = useNavigate()

  const formSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    if (
      !selectCourse ||
      !selectChapter ||
      !lessonNumber ||
      !description ||
      !videoCode ||
      !videoRelease ||
      !uploadDate ||
      !videoDescription ||
      !videoEmbedCode ||
      !classTest ||
      !studyMaterial
    ) {
      alert('Please fill all the fields')
      return
    }

    console.log('Form Submitted:', {
      selectCourse,
      selectChapter,
      lessonNumber,
      description,
      isMandatory,
      videoCode,
      videoRelease,
      uploadDate,
      videoDescription,
      videoEmbedCode,
      classTest,
      studyMaterial,
      status,
    })

    // Reset form
    setSelectCourse('')
    setSelectChapter('')
    setLessonNumber('')
    setDescription('')
    setIsMandatory('Yes')
    setVideoCode('')
    setVideoRelease('')
    setUploadDate('')
    setVideoDescription('')
    setVideoEmbedCode('')
    setClassTest('')
    setStudyMaterial('')
    setStatus('Active')

    navigate('/admin-dashboard?activeSidebar=create-test')
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
            value={lessonNumber}
            onChange={(e) => setLessonNumber(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
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

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Video Code"
            type="number"
            value={videoCode}
            onChange={(e) => setVideoCode(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:pe-[10px]">
          <Input
            placeholder="Video Release"
            value={videoRelease}
            onChange={(e) => setVideoRelease(e.target.value)}
          />
        </div>

        <div className="w-full md:w-6/12 md:ps-[10px]">
          <Input
            placeholder="Upload Date"
            type="date"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
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

        <div className="w-6/12 pe-[10px]">
          <Input
            placeholder="Class Test"
            value={classTest}
            onChange={(e) => setClassTest(e.target.value)}
          />
        </div>

        <div className="w-full md:ps-[10px] md:w-6/12">
          <Input
            placeholder="Study Material"
            value={studyMaterial}
            onChange={(e) => setStudyMaterial(e.target.value)}
          />
        </div>

        <div className="w-full">
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
