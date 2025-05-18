import React, { useContext } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown, Dropdown3 } from '../../common/Dropdown'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchAllCourses } from '../../../services/course/course.service'
import { addSection } from '../../../services/section/section.services'
import { showToast } from '../../../services/toast/toast.service'

const AddSection = () => {
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  })

  const createSection = useMutation({
    mutationFn: addSection,
    onSuccess: () => {
      showToast.success('Section created successfully')
      navigate('/admin-dashboard?activeSidebar=add-video')
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || 'Failed to create section'
      )
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const handleDropdownChange = (field) => (selectedOption) => {
    updateCourseData({ [field]: selectedOption.value })

    if (field === 'courseId') {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('courseId', selectedOption.value)
      navigate(`?${searchParams.toString()}`, { replace: true })
    }
  }

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((course) => ({
      value: course.id,
      label: course.name,
    })),
  ]

  const isMandatoryOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]

  const statusOptions = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Disable' },
  ]

  const formSubmit = (e) => {
    e.preventDefault()

    const moveNext = courseData.isMandatory === 'Yes'
    const statusAsBoolean =
      courseData.status === 'true' || courseData.status === true

    createSection.mutate({
      courseId: courseData.courseId,
      name: courseData.addLesson,
      link: courseData.link,
      isMandatory: moveNext,
      status: statusAsBoolean,
    })
  }

  const selectedCourse =
    courseOptions.find((opt) => opt.value === courseData.courseId) || courseOptions[0]

  const selectedMandatory =
    isMandatoryOptions.find((opt) => opt.value === courseData.isMandatory) || isMandatoryOptions[0]

  const selectedStatus =
    statusOptions.find((opt) => opt.value === courseData.status) || statusOptions[0]

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <p className="mb-4 text-[16px] font-semibold text-black lg:text-[18px]">
        Add Section
      </p>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <Dropdown
          name="courseId"
          label="Select Course"
          options={courseOptions}
          value={selectedCourse}
          onChange={handleDropdownChange('courseId')}
          isLoading={isLoading}
          isError={isError}
        />
        <Input
          label="Chapter Name"
          name="addLesson"
          placeholder="Chapter Name"
          value={courseData.addLesson}
          onChange={handleInputChange}
        />
        <Input
          label="Description"
          name="link"
          type="text"
          placeholder="Description"
          value={courseData.link}
          onChange={handleInputChange}
        />
        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={isMandatoryOptions}
          value={selectedMandatory}
          onChange={handleDropdownChange('isMandatory')}
        />
        <Dropdown3
          name="status"
          label="Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={handleDropdownChange('status')}
        />
        <Button
          onClick={formSubmit}
          className="mt-5 md:mt-10"
          bgBtn="Next"
          disabled={createSection.isPending}
        />
      </form>
    </div>
  )
}

export default AddSection
