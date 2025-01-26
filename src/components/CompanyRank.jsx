import React from 'react'

const CompanyRank = () => {
    return (
        <section className='lg:max-w-[1200px] container px-3' id='features'>
            <div className='mt-14 bg-company-rank sm:bg-[length:100%_100%] rounded-4 bg-no-repeat bg-center flex justify-evenly sm:justify-between gap-2 sm:gap-5 md:gap-7 items-center px-3 sm:px-12 md:px-16 lg:px-20 py-3 sm:py-7 md:py-9'>
                <div>
                    <h2 className='leading-132 text-2xl sm:text-3xl md:text-4xl max-sm:text-center lg:text-[44px] text-white font-bold'>900+</h2>
                    <p className='text-light-white max-sm:text-xs font-normal max-sm:text-center'>Students Passed out</p>
                </div>
                <div className='sm:max-w-[250px] md:max-w-[300px] lg:max-w-[385px] sm:w-full border-l border-r border-white flex justify-center'>
                    <div className='w-fit px-4 sm:px-5 md:px-7'>
                        <h2 className='leading-132 text-2xl sm:text-3xl md:text-4xl max-sm:text-center lg:text-[44px] text-white font-bold'>600+</h2>
                        <p className='text-light-white max-sm:text-xs font-normal max-sm:text-center'>Student Ranks</p>
                    </div>
                </div>
                <div>
                    <h2 className='leading-132 text-2xl sm:text-3xl md:text-4xl max-sm:text-center lg:text-[44px] text-white font-bold'>10+</h2>
                    <p className='text-light-white max-sm:text-xs font-normal max-sm:text-center'>International Faculties</p>
                </div>
            </div>
        </section>
    )
}

export default CompanyRank