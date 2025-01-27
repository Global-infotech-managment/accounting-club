import React from 'react'

const CompanyRank = () => {
  return (
    <section className="container px-3 lg:max-w-[1184px]" id="features">
      <div className="mt-14 flex items-center justify-evenly gap-2 rounded-4 bg-company-rank bg-center bg-no-repeat px-3 py-3 sm:justify-between sm:gap-5 sm:bg-[length:100%_100%] sm:px-12 sm:py-7 md:gap-7 md:px-16 md:py-9 lg:px-20">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-132 text-white max-sm:text-center sm:text-3xl md:text-4xl lg:text-[44px]">
            900+
          </h2>
          <p className="font-normal text-light-white max-sm:text-center max-sm:text-xs">
            Students Passed out
          </p>
        </div>
        <div className="md:flex md:justify-center md:border-l md:border-r md:border-white md:w-full md:max-w-[203px] lg:max-w-[385px]">
          <div className="md:w-fit md:px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-132 text-white max-sm:text-center sm:text-3xl md:text-4xl lg:text-[44px]">
              600+
            </h2>
            <p className="font-normal text-light-white max-sm:text-center max-sm:text-xs">
              Student Ranks
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-132 text-white max-sm:text-center sm:text-3xl md:text-4xl lg:text-[44px]">
            10+
          </h2>
          <p className="font-normal text-light-white max-sm:text-center max-sm:text-xs">
            International Faculties
          </p>
        </div>
      </div>
    </section>
  )
}

export default CompanyRank
