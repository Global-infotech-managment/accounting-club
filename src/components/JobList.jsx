import React, { useState } from 'react'
import Input from './common/Input'
import { ChevronDown } from 'lucide-react'
import JobsContentCard from './JobsContentCard'
import { jobListArray } from '../utils/helper'

const JobList = () => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedModes, setSelectedModes] = useState([])
  const [selectedExperience, setSelectedExperience] = useState([])
  const [selectedSalary, setSelectedSalary] = useState([])

  const workModes = ['Work from Office', 'Part Time', 'Work from Home']
  const experiences = ['1 Year', '2 Years', '3+ Years']
  const salaries = ['0-1 lakh', '1-2 lakhs', '2-5 lakhs']

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown))
  }

  const handleSelection = (value, setter, selected) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    )
  }

  const filteredJobs = jobListArray.filter(
    (job) =>
      (selectedModes.length === 0 || selectedModes.includes(job.workType)) &&
      (selectedExperience.length === 0 ||
        selectedExperience.includes(job.workExperience)) &&
      (selectedSalary.length === 0 || selectedSalary.includes(job.salary))
  )

  return (
    <div className="container mx-auto mt-10 flex gap-10 px-3 lg:max-w-[1184px]">
      <div className="border-gray-200 w-full max-w-[320px] rounded-3xl border p-5">
        <div className="border-gray-200 mb-3 flex items-center justify-between border-b pb-[10px]">
          <p className="text-base font-medium text-black">All Filters</p>
          <p className="text-sm font-medium text-primary">
            Applied ({filteredJobs.length})
          </p>
        </div>
        <Input type="text" placeholder="Profile" mainClassName={'mb-4'} />
        <Input type="text" placeholder="Location" mainClassName={'mb-4'} />

        {[
          ['Work Mode', workModes, selectedModes, setSelectedModes],
          [
            'Experience',
            experiences,
            selectedExperience,
            setSelectedExperience,
          ],
          ['Salary', salaries, selectedSalary, setSelectedSalary],
        ].map(([title, options, selected, setter]) => (
          <div key={title}>
            <button
              onClick={() => toggleDropdown(title)}
              className="shadow-md flex w-full items-center justify-between rounded-lg bg-white p-2"
            >
              <span>{title}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${openDropdown === title ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === title && (
              <div className="shadow-lg z-10 mt-2 w-full rounded-lg bg-white">
                {options.map((option) => (
                  <label
                    key={option}
                    className="hover:bg-gray-100 flex cursor-pointer items-center justify-between rounded px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selected.includes(option)}
                      onChange={() => handleSelection(option, setter, selected)}
                    />
                    <span className="flex-1">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setOpenDropdown('all')}
            className="text-blue-500"
          >
            View all
          </button>
          <button
            onClick={() => {
              setSelectedModes([])
              setSelectedExperience([])
              setSelectedSalary([])
            }}
            className="text-red-500"
          >
            Clear all
          </button>
        </div>
      </div>

      <JobsContentCard filteredJobs={filteredJobs} />
    </div>
  )
}

export default JobList
