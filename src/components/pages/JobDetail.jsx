import React from 'react'
import { useParams } from 'react-router-dom'
import { jobListArray } from '../../utils/helper'

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

  return (
    <div>
      <h1>{job.positionName}</h1>
      <p>{job.companyName}</p>
      <p>Status: {job.status}</p>
      <p>Work Type: {job.workType || 'Not Specified'}</p>
      <p>Salary: {job.salary ? `₹ ${job.salary}` : 'Not Disclosed'}</p>
    </div>
  )
}

export default JobDetail
