import React from 'react'
import Heading from '../../common/Heading'
import { Link } from 'react-router-dom'

const AdminDashboardUi = () => {
  const steps = [
    {
      id: '01',
      title: 'Add Course',
      description: 'Customize your course growth.',
    },
    {
      id: '02',
      title: 'Add Section',
      description: 'Customize your course with sections.',
    },
    {
      id: '03',
      title: 'Add Video + Test + Study Material',
      description:
        'Customize your learning course with video, test, and study material for growth.',
    },
  ]

  return (
    <div>
      <Heading
        className={'mb-[6px] !text-[18px] lg:!text-[24px]'}
        firstText={'Welcome Back, Kamal!'}
      />
      <p className="mb-[50px] text-[14px] text-black opacity-80 lg:text-[16px]">
        We’re thrilled to see you again. Let’s make this experience even better
        together!
      </p>
      <div className="flex w-full max-w-[816px] flex-wrap gap-y-[16px]">
        {steps.map((step, index) => (
          <Link
            to={`/admin-dashboard?activeSidebar=add-courses`}
            key={index}
            className={`sm:ps-[12px] ${index === 2 ? 'w-full' : 'w-full sm:w-6/12'}`}
          >
            <div className="flex w-full items-center rounded-xl border border-black border-opacity-10 p-3">
              <div className="flex h-[48px] w-[48px] min-w-[48px] items-center justify-center rounded-[7px] bg-black bg-opacity-10 text-[20px] text-black lg:text-[22px]">
                0{index + 1}
              </div>
              <div className="ms-[12px]">
                <p className="text-[16px] text-black lg:text-[18px]">
                  {step.title}
                </p>
                <p className="text-[12px] text-black opacity-80 lg:text-[14px]">
                  {step.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboardUi
