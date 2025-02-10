import { Link } from 'react-router-dom'
import Icons from './common/Icons'

const JobCard = ({
  positionName,
  companyName,
  status,
  companyLogo,
  workType,
  salary,
  workExperience,
  postDate,
  index,
}) => {
  if (!positionName || !companyName) return null

  const initials = positionName
    ? positionName
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    : ''

  return (
    <Link
      to={`/jobs/${positionName.replaceAll(' ', '-').toLowerCase()}-${index}`}
      className="mt-5 block rounded-3xl p-5 shadow-job-card"
      key={index}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="mb-[6px] text-lg font-semibold text-black">
            {positionName} ({initials})
          </p>
          <div className="flex items-center gap-1">
            <p className="text-black opacity-70">{companyName}</p>
            <div className="rounded-[40px] border-[0.5px] px-3 py-1 text-primary">
              {status}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 h-[56px] w-[56px] rounded-[7px] p-2">
          {companyLogo ? (
            <img src={companyLogo} alt="logo" />
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
            {workType || 'Not Specified'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icons iconName="experience" />
          <p className="text-sm text-black">
            {workExperience || 'Not Specified'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icons iconName="salary" />
          <p className="text-sm text-black">
            {salary ? `₹ ${salary}` : 'Not Disclosed'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
