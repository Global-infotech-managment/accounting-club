import React, { useContext } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown, Dropdown3 } from '../../common/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchAllCourses } from '../../../services/course/course.service'
import { addSection } from '../../../services/section/section.services'
import { showToast } from '../../../services/toast/toast.service'

const AddSection = () => {
  const { courseData, updateCourseData } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
    onSuccess: (data) => {
      console.log('Courses fetched successfully')
    },
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

  const handleDropdownChange = (name, value) => {
    updateCourseData({ [name]: value })

    if (name === 'courseId') {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('courseId', value)
      navigate(`?${searchParams.toString()}`, { replace: true })
    }
  }

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...(courses?.map((course) => ({
      value: course.id,
      label: course.name,
    })) || [])
  ]

  const formSubmit = (e) => {
    e.preventDefault()

    const moveNext = courseData.isMandatory === 'Yes' ? true : false
    const statusAsBoolean =
      courseData.status === 'true' || courseData.status === true

    console.log('course data ', courseData)

    createSection.mutate({
      courseId: courseData.courseId,
      name: courseData.addLesson,
      link: courseData.link,
      isMandatory: moveNext,
      status: statusAsBoolean,
    })
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
              <p className="mb-2 w-full text-center text-base font-semibold sm:mb-0 sm:text-left md:text-lg">
                  Add Section
              </p>
              <Link to="/admin-dashboard?activeSidebar=add-test">
                <button className="rounded text-nowrap bg-[#252466] px-3 py-1.5 text-sm text-white">
                  Add test
                </button>
              </Link>
            </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4">
        <Dropdown
          name="courseId"
          label="Select Course"
          options={courseOptions}
          value={courseData.courseId}
          onChange={handleDropdownChange}
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
          name="Description"
          type={'text'}
          placeholder="Description"
          value={courseData.link}
          onChange={handleInputChange}
        />
        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
          value={courseData.isMandatory}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="status"
          label="Status"
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Disable' },
          ]}
          value={courseData.status}
          onChange={handleDropdownChange}
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
