import React, { useContext, useEffect, useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Dropdown } from '../../common/Dropdown'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../../../utils/AppContext'
import { useMutation } from '@tanstack/react-query'
import {
  findCourseById,
  updateCourse,
} from '../../../services/course/course.service'
import { showToast } from '../../../services/toast/toast.service'
import { uploadFile } from '../../../services/uploads/upload.service'

const UpdateCourse = () => {
  const [fileId, setFileId] = useState(null)
  const { courseData, updateCourseData } = useContext(AppContext)
  const [dataFetched, setDataFetched] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('id')

  useEffect(() => {
    if (courseId && !dataFetched) {
      setDataFetched(true)
      findCourseById(courseId)
        .then((data) => {
          updateCourseData({
            name: data.name,
            description: data.description,
            price: data.price,
            validity: data.validity,
            status: String(data.status), // ✅ boolean to string
            fileId: data.file?.id,
            courseId: data.id,
          })
          setFileId(data.file?.id || null)
        })
        .catch((error) => {
          console.error('Error fetching course data:', error)
          showToast.error('Failed to fetch course data')
        })
    }
  }, [courseId, dataFetched, updateCourseData])

  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      showToast.success('Course updated successfully')
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || 'Failed to update course'
      )
    },
  })

  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'courses'),
    onSuccess: (response) => {
      showToast.success('File uploaded successfully')
      const uploadedFileId = response.id || response
      setFileId(uploadedFileId)
      updateCourseData({ fileId: uploadedFileId })
    },
    onError: () => {
      showToast.error('File upload failed')
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateCourseData({ [name]: value })
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        updateCourseData({ selectedFile: file })
        setIsDisabled(true)
        await uploadFileMutation.mutateAsync(file)
      } catch {
        // Handled in onError
      } finally {
        setIsDisabled(false)
      }
    }
  }

  const handleDropdownChange = (name, value) => {
    updateCourseData({ [name]: value }) // keep string: 'true' or 'false'
  }

  const formSubmit = async (e) => {
    e.preventDefault()

    const coursePayload = {
      courseId: courseId,
      ...(courseData.name && { name: courseData.name }),
      ...(courseData.description && { description: courseData.description }),
      ...(courseData.price !== undefined && {
        price: Number(courseData.price),
      }),
      ...(courseData.validity !== undefined && {
        validity: Number(courseData.validity),
      }),
      ...(courseData.status !== undefined && {
        status: courseData.status === 'true', // ✅ convert back to boolean
      }),
      ...(fileId && { fileId }),
    }

    try {
      await updateCourseMutation.mutateAsync(coursePayload)
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="flex flex-col items-center justify-between pb-3 sm:flex-row">
        <p className="text-[16px] font-semibold text-black lg:text-[18px]">
          Edit Course
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`/admin-dashboard?activeSidebar=update-lesson&courseId=${courseId}`}
          >
            <Button
              type="button"
              className="col-span-2 mt-4 !px-3 !py-2 sm:px-5"
              bgBtn="Update Section"
              disabled={
                updateCourseMutation.isLoading || uploadFileMutation.isLoading
              }
            />
          </a>
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        <div>
          <span className="text-sm">Course Name* </span>
          <Input
            name="name"
            placeholder="Basics of Business Accounting"
            value={courseData?.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span className="text-sm">Description* </span>
          <Input
            name="description"
            placeholder="This is a basic course for Accountants"
            value={courseData?.description || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span className="text-sm">Price* </span>
          <Input
            name="price"
            placeholder="4900/-"
            type="text"
            value={courseData?.price || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span className="text-sm">Validity* </span>
          <Input
            name="validity"
            placeholder="180 Days"
            type="text"
            value={courseData?.validity || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <span className="text-sm">Status*</span>
          <Dropdown
            name="status"
            value={courseData?.status || 'false'}
            options={[
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ]}
            onChange={handleDropdownChange}
          />
        </div>

        <div className="flex flex-col items-start">
          <span>Thumbnail* </span>
          <Input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            placeholder="Upload from file"
          />
        </div>

        <Button
          type="submit"
          className="col-span-2 mt-4 w-full"
          bgBtn={
            uploadFileMutation.isLoading
              ? 'Uploading...'
              : updateCourseMutation.isLoading
              ? 'Updating...'
              : 'Update'
          }
          disabled={isDisabled || uploadFileMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default UpdateCourse
