import React from 'react'
import Button from './Button'
import { CONTACT_ROUTE } from '../../utils/constant'
import { bestFacilities } from '../../utils/helper'

const BestFacilities = () => {
  return (
    <div className="bg-best-facility bg-cover bg-no-repeat py-[50px] sm:py-16 lg:mb-10 lg:py-[110px]">
      <div className="container w-full px-3 lg:max-w-[1184px]">
        <div className="flex flex-col flex-wrap items-center lg:flex-row">
          <div className="mb-10 flex w-full flex-col items-start justify-normal lg:mb-0 lg:w-5/12">
            <p className="mb-4 text-[28px] font-bold leading-tight text-black sm:text-[35px] md:text-[40px] lg:text-[48px]">
              Our Best <span className="text-gradient">Facilities</span> Provide
              You.
            </p>
            <p className="mb-5 max-w-[516px] text-[14px] font-normal text-black md:mb-10 md:text-[16px]">
              Our Best Facilities Provide You With Expert-Led Courses, Online
              Consultations, Flexible Learning, Certification, Secure Purchases,
              and 24/7 Support for a Seamless Learning Experience.
            </p>
            <Button bgWhite={'Contact Us'} path={CONTACT_ROUTE} />
          </div>
          <div className="flex w-full flex-wrap gap-y-4 md:gap-y-[32px] lg:w-7/12">
            {bestFacilities.map((items, index) => {
              return (
                <div key={index} className="w-6/12 px-2 md:w-4/12 md:px-[13px]">
                  <div className="shadow-facility-bo bg-size-100 flex min-h-[172px] w-full flex-col items-center justify-center rounded-xl bg-facility-box bg-no-repeat">
                    <img
                      src={items.img}
                      alt="courses"
                      className="mb-6 max-h-[30px] w-full max-w-[30px] md:max-h-[50px] md:max-w-[50px]"
                    />
                    <p className="text-[14px] font-medium text-dark-black md:text-[16px]">
                      {items.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestFacilities
