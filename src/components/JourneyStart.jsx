import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import FooterEllipse from '../assets/images/png/footer-ellipse.png'

const JourneyStart = () => {
  return (
    <div className="relative w-full pt-16 md:pt-24 lg:pt-[120px]" id="admission">
      <div className="container relative z-20 px-3 lg:max-w-[1184px]">
        <div className="bg-journey bg-center bg-no-repeat p-6 max-sm:rounded-4 sm:bg-[length:100%_100%] sm:p-8  lg:p-16">
          <div className="mx-auto w-full max-w-[746px]">
            <Heading
              className="text-center !text-white"
              middleText="Start Your Journey"/>
            <Paragraph
              className="mt-2 text-center !text-white md:mt-4"
              text="Accountants Club transformed my career with practical training. The expert guidance and unique techniques made learning accounting effortless and enjoyable!"
            />
            <div className="mt-3 flex items-center justify-center gap-2 max-sm:flex-wrap sm:mt-4 sm:gap-3 md:mt-6 md:gap-5 lg:mt-10">
              <Button
                className="!bg-white !text-primary hover:!border-white hover:!bg-[transparent] hover:!text-white max-sm:w-full"
                bgBtn="Get Started"
              />
              <Button
                className="!border-white !bg-primary bg-[transparent] text-white hover:!bg-white hover:!text-primary max-sm:w-full"
                transparentBtn="Register For Free"
              />
            </div>
          </div>
        </div>
      </div>
      <img
        className="pointer-events-none absolute right-0 top-0 z-0 max-xl:hidden"
        src={FooterEllipse}
        alt="footer ellipse"
      />
    </div>
  )
}

export default JourneyStart
