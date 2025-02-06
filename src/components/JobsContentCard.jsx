import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import JobCard from './JobCard'

const JobsContentCard = ({ filteredJobs = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Date')

  const options = ['Date', 'Name', 'Relevance']

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm font-normal">
          1 - 20 of {filteredJobs.length} Work from Home Jobs
        </p>
        <div className="relative inline-block">
          <button
            className="shadow-sm hover:bg-gray-100 flex items-center rounded-lg border bg-white px-4 py-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            Sort by: {selected}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          {isOpen && (
            <div className="shadow-lg absolute left-0 mt-2 w-40 rounded-lg border bg-white">
              {options.map((option) => (
                <div
                  key={option}
                  className="hover:bg-gray-100 cursor-pointer px-4 py-2"
                  onClick={() => {
                    setSelected(option)
                    setIsOpen(false)
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {filteredJobs.map((obj, index) => (
        <JobCard key={index} {...obj} />
      ))}
    </div>
  )
}

export default JobsContentCard
