'use client'
import React, { useEffect, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchCourseById,
  updateSection,
} from '../../../services/section/section.services'
import { showToast } from '../../../services/toast/toast.service'

const UpdateSection = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    link: '',
    status: 'true',
    isMandatory: 'true',
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sectionId = searchParams.get('lessonId')

  const { data: sectionData, isLoading: isSectionLoading } = useQuery({
    queryKey: ['section', sectionId],
    queryFn: () => fetchCourseById(sectionId),
    enabled: !!sectionId,
  })
  console.log('section Data ', sectionData)

  useEffect(() => {
    if (sectionData) {
      setCourseData({
        addLesson: sectionData.name || '',
        link: sectionData.link || '',
        isMandatory: sectionData.isMandatory ? 'true' : 'false',
        status: sectionData.status ? 'true' : 'false',
      })
    }
  }, [sectionData])

  const updateSectionMutation = useMutation({
    mutationFn: (data) => updateSection(sectionId, data),
    onSuccess: () => {
      showToast.success('Section updated successfully')
      // navigate('/admin-dashboard?activeSidebar=section')
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || 'Failed to update section'
      )
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDropdownChange = (name, value) => {
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const formSubmit = (e) => {
    e.preventDefault()

    updateSectionMutation.mutate({
      name: courseData.addLesson,
      link: courseData.link,
      isMandatory: courseData.isMandatory === 'true',
      status: courseData.status === 'true',
    })
  }

  if (isSectionLoading) {
    return <div className="p-4 text-center">Loading section data...</div>
  }

  if (!sectionId) {
    return (
      <div className="text-red-500 p-4 text-center">
        Section ID not provided
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="flex items-center justify-between pb-3">
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">
          Edit Section
        </p>
        <div className="flex items-center gap-4">
          {/* <a
            href={`/admin-dashboard?activeSidebar=update-video&id=${sectionId}`}
          >
            <Button
              type="button"
              className="col-span-2 mt-4 w-[149px] text-nowrap"
              bgBtn="Update Video"
            />
          </a> */}
          <a
            href={`/admin-dashboard?activeSidebar=all-test&lessonId=${sectionId}`}
          >
            <Button
              type="button"
              className="!bg-transparent col-span-2 mt-4 !py-2 px-5"
              bgBtn="All Test"
            />
          </a>
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-4">
        <Input
          name="addLesson"
          placeholder="Section Name"
          value={courseData.addLesson || ''}
          onChange={handleInputChange}
        />
        <Input
          name="link"
          type={'text'}
          placeholder="Link"
          value={courseData.link || ''}
          onChange={handleInputChange}
        />
        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
          value={courseData.isMandatory || 'false'}
          onChange={handleDropdownChange}
        />
        <Dropdown
          name="status"
          label="Status"
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Disable' },
          ]}
          value={courseData.status || 'true'}
          onChange={handleDropdownChange}
        />

        <Button
          onClick={formSubmit}
          className="col-span-2 mt-4 w-full"
          bgBtn="Update Section"
          disabled={updateSectionMutation.isPending}
        />
      </form>
    </div>
  )
}

export default UpdateSection
