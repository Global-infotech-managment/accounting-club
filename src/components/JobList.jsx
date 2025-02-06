// import React, { useState } from 'react'

// const jobData = [
//   {
//     id: 1,
//     title: 'Chartered Accountant (CA)',
//     company: 'Accountants Club',
//     workMode: 'Work from Home',
//     experience: '2 Years',
//     salary: '1-2 lakhs',
//     posted: '2 days ago',
//   },
//   {
//     id: 2,
//     title: 'Senior Accountant',
//     company: 'Accountants Club',
//     workMode: 'Work from Home',
//     experience: '2 Years',
//     salary: '1-2 lakhs',
//     posted: '5 days ago',
//   },
// ]

// const JobList = () => {
//   const [filters, setFilters] = useState({
//     workMode: 'Work from Home',
//     experience: '2 Years',
//     salary: '1-2 lakhs',
//   })

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value })
//   }

//   const filteredJobs = jobData.filter(
//     (job) =>
//       job.workMode === filters.workMode &&
//       job.experience === filters.experience &&
//       job.salary === filters.salary
//   )

//   return (
//     <div className="p-4">
//       <div className="mb-4 flex space-x-4">
//         <select
//           name="workMode"
//           value={filters.workMode}
//           onChange={handleFilterChange}
//           className="rounded border p-2"
//         >
//           <option value="Work from Home">Work from Home</option>
//           <option value="Work from Office">Work from Office</option>
//         </select>
//         <select
//           name="experience"
//           value={filters.experience}

//           onChange={handleFilterChange}
//           className="rounded border p-2"
//         >
//           <option value="1 Year">1 Year</option>
//           <option value="2 Years">2 Years</option>
//           <option value="3+ years">3+ years</option>
//         </select>
//         <select
//           name="salary"
//           value={filters.salary}
//           onChange={handleFilterChange}
//           className="rounded border p-2"
//         >
//           <option value="0-1 lakh">0-1 lakh</option>
//           <option value="1-2 lakhs">1-2 lakhs</option>
//           <option value="2-5 lakhs">2-5 lakhs</option>
//         </select>
//       </div>
//       <div>
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map((job) => (
//             <div key={job.id} className="mb-2 rounded border p-4">
//               <h2 className="font-bold">{job.title}</h2>
//               <p>{job.company}</p>
//               <p>{job.workMode}</p>
//               <p>{job.experience}</p>
//               <p>{job.salary}</p>
//               <p>{job.posted}</p>
//             </div>
//           ))
//         ) : (
//           <p>No jobs found.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default JobList
import React, { useState } from 'react'
import Input from './common/Input'
import { ChevronDown } from 'lucide-react'
import JobsContentCard from './JobsContentCard'

const JobList = () => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedModes, setSelectedModes] = useState(['Work from Home'])

  const workModes = [
    { label: 'Work from Office', count: 1254 },
    { label: 'Part Time', count: 254 },
    { label: 'Work from Home', count: 1854 },
  ]

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown))
  }
  const handleViewAll = () => {
    setOpenDropdown('all') // Expands all dropdowns
  }

  const handleClearAll = () => {
    setSelectedModes([]) // Clears selected filters
  }
  const handleCheckboxChange = (mode) => {
    setSelectedModes((prev) =>
      prev.includes(mode)
        ? prev.filter((item) => item !== mode)
        : [...prev, mode]
    )
  }

  const renderDropdown = (name, items) => (
    <div
      className={`shadow-lg z-10 mt-2 w-full overflow-hidden rounded-lg bg-white transition-all duration-300 ease-in-out ${
        openDropdown === name || openDropdown === 'all'
          ? 'h-[138px]'
          : 'h-0 overflow-hidden'
      }`}
    >
      {items.map((item) => (
        <label
          key={item.label}
          className="hover:bg-gray-100 flex cursor-pointer items-center justify-between rounded px-3 py-2"
        >
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedModes.includes(item.label)}
            onChange={() => handleCheckboxChange(item.label)}
          />
          <span className="flex-1">{item.label}</span>
          <span className="text-gray-500">({item.count})</span>
        </label>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto mt-10 flex gap-10 px-3 lg:max-w-[1184px]">
      <div className="w-full max-w-[320px] rounded-3xl border border-[#0000001A] p-5">
        <div className="mb-3 flex items-center justify-between border-b border-[#0000001A] pb-[10px]">
          <p className="text-base font-medium text-black">All Filters</p>
          <p className="text-sm font-medium text-primary">Applied (1)</p>
        </div>
        <Input type="text" placeholder="Profile" mainClassName={'mb-4'} />
        <Input type="text" placeholder="Location" mainClassName={'mb-4'} />

        {/* Work Mode Dropdown */}
        <button
          onClick={() => toggleDropdown('workMode')}
          className="shadow-md flex w-full items-center justify-between rounded-lg bg-white"
        >
          <span>Work Mode</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${openDropdown === 'workMode' ? 'rotate-180' : ''}`}
          />
        </button>
        {renderDropdown('workMode', workModes)}
        <div className="mb-3 h-[1px] w-full bg-[#0000001A]"></div>

        {/* Experience Dropdown */}
        <button
          onClick={() => toggleDropdown('experience')}
          className="shadow-md flex w-full items-center justify-between rounded-lg bg-white"
        >
          <span>Experience</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${openDropdown === 'experience' ? 'rotate-180' : ''}`}
          />
        </button>
        {renderDropdown('experience', workModes)}
        <div className="h-[1px] w-full bg-[#0000001A]"></div>

        {/* Salary Dropdown */}
        <button
          onClick={() => toggleDropdown('salary')}
          className="shadow-md mt-2 flex w-full items-center justify-between rounded-lg bg-white"
        >
          <span>Salary</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${openDropdown === 'salary' ? 'rotate-180' : ''}`}
          />
        </button>
        {renderDropdown('salary', workModes)}
        <div className="h-[1px] w-full bg-[#0000001A]"></div>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={handleViewAll} className="border-0">
            View all
          </button>
          <button onClick={handleClearAll} className="border-0">
            Clear all
          </button>
        </div>
      </div>
      <JobsContentCard />
    </div>
  )
}

export default JobList
