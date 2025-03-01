import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import FooterEllipse from '../assets/images/png/footer-ellipse.png'
import { STUDENT_SIGNUP_ROUTE } from '../utils/constant'
import star from '../assets/images/svg/star.svg'
const JourneyStart = () => {
  return (
    <div
      className="relative z-0 my-[50px] sm:my-16 lg:my-[110px]"
      id="admission"
    >
      <div className="container px-3 lg:max-w-[1184px]">
        <div className="max-sm:rounded-4 relative rounded-xl bg-secondary p-6 sm:bg-[length:100%_100%] sm:p-8 lg:p-16">
          <img src={star} alt="star" className="w-full absolute bottom-0 start-0 pointer-events-none -z-0 opacity-70" />
          <div className="mx-auto w-full max-w-[746px] relative z-10">
            <Heading
              className="text-center !text-white"
              middleText="Start Your Journey"
            />
            <Paragraph
              className="mt-2 text-center !text-white md:mt-4"
              text="Accountants Club transformed my career with practical training. The expert guidance and unique techniques made learning accounting effortless and enjoyable!"
            />
            <div className="mt-3 flex items-center justify-center gap-2 max-sm:flex-wrap sm:mt-4 sm:gap-3 md:mt-6 md:gap-5 lg:mt-10">
              <Button
                className="!border-[transparent] max-sm:w-full"
                path={STUDENT_SIGNUP_ROUTE}
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
