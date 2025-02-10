import React from 'react'
import { useParams } from 'react-router-dom'
import { jobListArray } from '../../utils/helper'
import Heading from '../common/Heading'
import Icons from '../common/Icons'
import Button from '../common/Button'

const JobDetail = () => {
  const { slug } = useParams()

  if (!slug) {
    return <div className="text-red-500 text-center">Invalid job URL</div>
  }

  // Extract position name from the slug (remove the trailing index)
  const slugParts = slug.split('-')
  const extractedPositionName = slugParts.slice(0, -1).join(' ') // Remove last part (index) and join remaining

  // Find the job by position name
  const job = jobListArray.find(
    (job) =>
      job.positionName.toLowerCase() ===
      extractedPositionName.replaceAll('-', ' ')
  )

  if (!job) {
    return <div className="text-red-500 text-center">Job not found</div>
  }
  if (!job.positionName || !job.companyName) return null

  const initials = job.positionName
    ? job.positionName
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    : ''

  return (
    <>
      <div className="container mx-auto mt-16 px-3 lg:max-w-[1184px]">
        <Heading
          className={'mb-7 text-center'}
          firstText={'Chartered Accountant'}
        />
        <div className="mx-auto w-full max-w-[900px] rounded-3xl p-8 shadow-job-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-[6px] text-lg font-semibold text-black">
                {job.positionName} ({initials})
              </p>
              <div className="flex items-center gap-1">
                <p className="text-black opacity-70">{job.companyName}</p>
                <div className="rounded-[40px] border-[0.5px] px-3 py-1 text-primary">
                  {job.status}
                </div>
              </div>
            </div>
            <div className="bg-gray-200 h-[56px] w-[56px] rounded-[7px] p-2">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt="logo" />
              ) : (
                <p className="text-gray-400">No Logo</p>
              )}
            </div>
          </div>
          <div className="mb-4 h-[1px] w-full bg-black opacity-10"></div>
          <div className="mb-5 flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Icons iconName="workFromHome" />
              <p className="text-sm capitalize text-black">
                {job.workType || 'Not Specified'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icons iconName="experience" />
              <p className="text-sm text-black">
                {job.workExperience || 'Not Specified'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icons iconName="salary" />
              <p className="text-sm text-black">
                {job.salary ? `₹ ${job.salary}` : 'Not Disclosed'}
              </p>
            </div>
          </div>
          {/* time ago */}
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-[6px] rounded-[40px] bg-[#0000000A] px-3 py-[6px]">
              <Icons iconName={'refresh'} />
              <p className="text-[10px] text-[#000000B2]">2 days ago</p>
            </div>
          </div>
          <div className="my-5 mb-4 h-[1px] w-full bg-black opacity-10"></div>
          <p className="mb-[6px] text-lg font-semibold text-black">About Job</p>
          <p className="text-base font-normal text-black">{job.aboutJob}</p>
          <p className="mb-[6px] mt-[15px] text-lg font-semibold text-black">
            Role Overview
          </p>
          <p className="text-base font-normal text-black">
            <span className="font-medium">Position:</span> {job.positionName} (
            {initials})
          </p>
          <p className="my-2 text-base font-normal text-black">
            <span className="font-medium">Industry:</span> Finance, Accounting &
            Taxation
          </p>
          <p className="text-base font-normal text-black">
            <span className="font-medium">Employment:</span> {job.workType}
          </p>
          <p className="mb-[6px] mt-[15px] text-lg font-semibold text-black">
            Key Responsibilities
          </p>
          <p className="text-base font-normal text-black">
            {job.keyResponsibilities.map((items, index) => {
              return (
                <span key={index}>
                  {items}
                  <br />
                </span>
              )
            })}
          </p>
          <p className="mb-[6px] mt-[15px] text-lg font-semibold text-black">
            Eligibility Criteria
          </p>
          <p className="text-base font-normal text-black">
            {job.eligibilityCriteria.map((items, index) => {
              return (
                <span key={index}>
                  {items}
                  <br />
                </span>
              )
            })}
          </p>
          <p className="mt-[15px] text-base font-normal text-black">
            If you're a dedicated CA fresher ready to grow in taxation and
            finance, this is your chance!
          </p>
          <div className="mt-5 h-[1px] w-full bg-black opacity-10"></div>
          <Button bgBtn={'Apply Now'} className={'mt-5'} />
        </div>
      </div>
    </>
  )
}

export default JobDetail
