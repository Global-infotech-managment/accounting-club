import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'

const JourneyStart = () => {
    return (
        <div className='container lg:max-w-[1184px] px-3'>
            <div className="bg-journey sm:bg-[length:100%_100%] bg-[length:124%_92%] bg-no-repeat bg-center my-16 md:my-24 lg:my-[120px] lg:p-16 md:p-12 sm:p-8 p-6">
                <div className='max-w-[746px] w-full mx-auto'>
                    <Heading className="!text-white text-center" middleText="Start Your Journey" />
                    <Paragraph className="mt-2 md:mt-4 !text-white text-center" text="Accountants Club transformed my career with practical training. The expert guidance and unique techniques made learning accounting effortless and enjoyable!" />
                    <div className='flex items-center gap-2 max-sm:flex-wrap sm:gap-3 md:gap-5 justify-center sm:mt-4 mt-3 md:mt-6 lg:mt-10'>
                        <Button className="!bg-white !text-primary hover:!bg-[transparent] hover:!text-white hover:!border-white" bgBtn="Get Started" />
                        <Button className="bg-[transparent] text-white !border-white hover:!text-primary hover:!bg-white" transparentBtn="Register For Free" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JourneyStart