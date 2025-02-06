import Icons from "./common/Icons"

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
  // Prevent rendering blank cards
  if (!positionName || !companyName) {
    return null
  }

  const initials = positionName
    ? positionName
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    : ''

  return (
    <div className="shadow-job-card mt-5 rounded-3xl p-5" key={index}>
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
        <div className="h-[56px] w-[56px] rounded-[7px] bg-[#FAFAFA] p-2">
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
          <p className="text-sm text-black">{workType || 'Not Specified'}</p>
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
      <div className="flex items-center justify-start">
        <div className="flex items-center justify-center gap-[6px] rounded-[40px] bg-[#0000000A] px-3 py-[7px]">
          <Icons iconName="refresh" />
          <p className="text-[10px] font-normal text-[#000000B2]">
            {postDate || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}
export default JobCard
