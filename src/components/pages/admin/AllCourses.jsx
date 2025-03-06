import React, { useState } from 'react'
import Button from '../../common/Button'
import Input from '../../common/Input'

const itemsPerPage = 6

const initialCourses = [
  {
    title: 'Financial Accounting',
    category: 'Accounting Basics',
    description:
      'Master the fundamentals of financial accounting, including journal entries & financial statements.',
    image: '/path/to/financial-accounting.jpg',
  },
  {
    title: 'Cost Accounting',
    category: 'Managerial Accounting',
    description:
      'Learn cost analysis, budgeting, and expense tracking to improve financial decision-making and cost control.',
    image: '/path/to/cost-accounting.jpg',
  },
  {
    title: 'Taxation Basics',
    category: 'Accounting Basics',
    description:
      'Understand tax regulations, filing procedures, deductions, & compliance with government tax laws.',
    image: '/path/to/taxation-basics.jpg',
  },
  {
    title: 'Payroll Accounting',
    category: 'Financial Management',
    description:
      'Learn payroll processing, salary structures, tax deductions, & employee benefits management.',
    image: '/path/to/payroll-accounting.jpg',
  },
  {
    title: 'Auditing and Compliance',
    category: 'Auditing',
    description:
      'Understand financial auditing principles, risk assessment, fraud detection, & regulatory compliance.',
    image: '/path/to/auditing-compliance.jpg',
  },
  {
    title: 'Financial Analysis',
    category: 'Reporting & Analysis',
    description:
      'Learn how to interpret and analyze balance sheets, income statements, and cash flow reports.',
    image: '/path/to/financial-analysis.jpg',
  },
  {
    title: 'Investment Management',
    category: 'Finance',
    description:
      'Understand portfolio management, risk analysis, and investment strategies.',
    image: '/path/to/investment-management.jpg',
  },
  {
    title: 'Corporate Finance',
    category: 'Finance',
    description:
      'Learn financial planning, capital structure, and corporate financial strategies.',
    image: '/path/to/corporate-finance.jpg',
  },
  {
    title: 'Budgeting Essentials',
    category: 'Financial Planning',
    description: 'Master budgeting techniques and financial goal setting.',
    image: '/path/to/budgeting-essentials.jpg',
  },
  {
    title: 'Risk Management',
    category: 'Finance',
    description: 'Learn risk assessment and mitigation strategies.',
    image: '/path/to/risk-management.jpg',
  },
  {
    title: 'Business Valuation',
    category: 'Finance',
    description:
      'Understand company valuation techniques and financial modeling.',
    image: '/path/to/business-valuation.jpg',
  },
  {
    title: 'International Finance',
    category: 'Finance',
    description:
      'Learn about foreign exchange markets and global financial strategies.',
    image: '/path/to/international-finance.jpg',
  },
  {
    title: 'Mergers & Acquisitions',
    category: 'Finance',
    description:
      'Understand the process of corporate mergers and acquisitions.',
    image: '/path/to/mergers-acquisitions.jpg',
  },
  {
    title: 'Forensic Accounting',
    category: 'Auditing',
    description: 'Learn about fraud detection and forensic investigations.',
    image: '/path/to/forensic-accounting.jpg',
  },
  {
    title: 'Financial Modeling',
    category: 'Finance',
    description: 'Master financial forecasting and decision-making models.',
    image: '/path/to/financial-modeling.jpg',
  },
  {
    title: 'Government Accounting',
    category: 'Accounting',
    description: 'Understand public sector financial reporting.',
    image: '/path/to/government-accounting.jpg',
  },
  {
    title: 'Ethical Accounting',
    category: 'Accounting',
    description: 'Explore ethical considerations in financial reporting.',
    image: '/path/to/ethical-accounting.jpg',
  },
  {
    title: 'Sustainability Accounting',
    category: 'Accounting',
    description: 'Learn about environmental and social impact reporting.',
    image: '/path/to/sustainability-accounting.jpg',
  },
  {
    title: 'Financial Technology',
    category: 'Finance',
    description: 'Explore fintech innovations and digital financial solutions.',
    image: '/path/to/financial-technology.jpg',
  },
  {
    title: 'Entrepreneurial Finance',
    category: 'Finance',
    description:
      'Understand financial strategies for startups and small businesses.',
    image: '/path/to/entrepreneurial-finance.jpg',
  },
]

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState(initialCourses)

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleDelete = (title) => {
    setCourses(courses.filter((course) => course.title !== title))
  }

  return (
    <div className="p-4">
      <Input
        value={searchTerm}
        placeholder={'Search courses'}
        label={'none'}
        mainClassName={'mb-5'}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentData.map((course, index) => (
          <div key={index} className="shadow-md rounded-lg bg-white p-4">
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full rounded-md object-cover"
            />
            <h3 className="text-lg mt-3 font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 font-medium">
              {course.category}
            </p>
            <p className="text-sm text-gray-500 mt-2">{course.description}</p>
            <div className="mt-4 flex justify-between">
              <Button bgBtn={'Edit'} />
              <Button
                bgBtn={'Delete'}
                onClick={() => handleDelete(course.title)}
              />
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-4">
          <Button
            disabled={currentPage === 1}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            disabled={currentPage === totalPages}
            transparentBtn={'Next Page'}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      )}
    </div>
  )
}

export default AllCourses
